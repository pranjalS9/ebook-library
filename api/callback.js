export default async function handler(req, res) {
  const code = req.query.code;
  const error = req.query.error;

  res.setHeader('Content-Type', 'text/html');
  res.statusCode = 200;

  if (error || !code) {
    res.end(html('error', JSON.stringify({ error: error || 'missing_code' })));
    return;
  }

  try {
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      }),
    });

    const data = await response.json();

    if (data.error || !data.access_token) {
      res.end(html('error', JSON.stringify({ error: data.error_description || data.error || 'no_token' })));
      return;
    }

    res.end(html('success', JSON.stringify({ token: data.access_token, provider: 'github' })));
  } catch (err) {
    res.end(html('error', JSON.stringify({ error: String(err) })));
  }
}

function html(status, payload) {
  const msg = `authorization:github:${status}:${payload}`;
  return `<!DOCTYPE html><html><body><script>
  (function() {
    var msg = ${JSON.stringify(msg)};
    function attempt(n) {
      if (window.opener) {
        window.opener.postMessage(msg, '*');
        setTimeout(function(){ window.close(); }, 500);
      } else if (n < 10) {
        setTimeout(function(){ attempt(n+1); }, 300);
      } else {
        document.body.innerHTML = '<p>Close this window and try again. Make sure popups are allowed.</p>';
      }
    }
    attempt(0);
  })();
  </script></body></html>`;
}
