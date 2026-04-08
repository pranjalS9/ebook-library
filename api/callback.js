export default async function handler(req, res) {
  // Debug: show exactly what URL and query Vercel receives
  res.setHeader('Content-Type', 'text/plain');
  res.statusCode = 200;
  res.end(
    'req.url: ' + req.url + '\n' +
    'req.query: ' + JSON.stringify(req.query) + '\n' +
    'method: ' + req.method
  );
}
