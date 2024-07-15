const morgan = require("morgan");

morgan.token("body", (req) =>
  ["POST", "PUT"].includes(req.method) ? JSON.stringify(req.body) : null,
);

const morganMiddeware = morgan((tokens, req, res) => {
  const body = tokens.body(req, res);
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, "content-length"),
    "-",
    tokens["response-time"](req, res),
    "ms",
    body ? body : "",
  ]
    .join(" ")
    .trim();
});

module.exports = { morganMiddeware };
