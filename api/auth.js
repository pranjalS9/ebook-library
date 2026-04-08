module.exports = function handler(req, res) {
  const clientId = process.env.GITHUB_CLIENT_ID;

  if (!clientId) {
    res.statusCode = 500;
    res.end('GITHUB_CLIENT_ID environment variable is not set');
    return;
  }

  const redirectUri = 'https://ebook-library-rho.vercel.app/api/callback';

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: 'repo,user',
    state: Math.random().toString(36).slice(2),
  });

  const url = `https://github.com/login/oauth/authorize?${params}`;
  res.writeHead(302, { Location: url });
  res.end();
};
