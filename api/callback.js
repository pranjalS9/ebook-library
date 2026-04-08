export default async function handler(req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.statusCode = 200;

  // Vercel provides req.query directly
  const code = req.query?.code;
  const error = req.query?.error;
  const errorDescription = req.query?.error_description;

  if (error) {
    res.end(makeScript('error', errorDescription || error));
    return;
  }

  if (!code) {
    // Show debug info so we can diagnose
    res.end(`<pre>No code found.\nreq.url: ${req.url}\nreq.query: ${JSON.stringify(req.query)}</pre>`);
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

    if (data.error) {
      res.end(makeScript('error', data.error_description || data.error));
      return;
    }

    if (!data.access_token) {
      res.end(`<pre>No access_token in response: ${JSON.stringify(data)}</pre>`);
      return;
    }

    res.end(makeScript('success', data.access_token));
  } catch (err) {
    res.end(`<pre>Exception: ${String(err)}</pre>`);
  }
}

function makeScript(status, content) {
  const payload =
    status === 'success'
      ? JSON.stringify({ token: content, provider: 'github' })
      : JSON.stringify({ error: content });

  const message = `authorization:github:${status}:${payload}`;

  return `<!DOCTYPE html>
<html>
  <head><title>Authenticating...</title></head>
  <body>
    <p>Status: ${status}. This window will close shortly...</p>
    <script>
      (function() {
        const message = ${JSON.stringify(message)};
        function send() {
          if (window.opener) {
            window.opener.postMessage(message, '*');
            setTimeout(function() { window.close(); }, 1000);
          } else {
            setTimeout(send, 200);
          }
        }
        send();
      })();
    </script>
  </body>
</html>`;
}
