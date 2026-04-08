export default async function handler(req, res) {
  try {
    const url = new URL(req.url, 'https://ebook-library-rho.vercel.app');
    const code = url.searchParams.get('code');
    const error = url.searchParams.get('error');
    const errorDescription = url.searchParams.get('error_description');

    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 200;

    if (error) {
      res.end(makeScript('error', errorDescription || error));
      return;
    }

    if (!code) {
      res.end(makeScript('error', 'Missing code parameter'));
      return;
    }

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

    res.end(makeScript('success', data.access_token));
  } catch (err) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(makeScript('error', String(err.message)));
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
    <p>Authenticating, please wait...</p>
    <script>
      (function() {
        const message = ${JSON.stringify(message)};
        function send() {
          if (window.opener) {
            window.opener.postMessage(message, '*');
            setTimeout(function() { window.close(); }, 500);
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
