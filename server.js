let auth = require("basic-auth");
const { createServer } = require("http");
const next = require("next");
const dev = (process.env.NODE_ENV || "").startsWith("dev");
const app = next({ dev });
const handle = app.getRequestHandler();
// Basic function to validate credentials for example
function check(name, pass) {
  var valid = true;

  // Simple method to prevent short-circut and use timing-safe compare
  valid = compare(name, "john") && valid;
  valid = compare(pass, "secret") && valid;

  return valid;
}
app.prepare().then(() => {
  createServer(handle).listen(3025, err => {
    let credentials = auth(req);
    if (!credentials || !check(credentials.name, credentials.pass)) {
      res.statusCode = 401;
      res.setHeader("WWW-Authenticate", 'Basic realm="example"');
      res.end("Access denied");
    } else {
      res.end("Access granted");
    }
    if (err) throw err;
    console.log("> Ready on http://localhost:3005");
  });
});
