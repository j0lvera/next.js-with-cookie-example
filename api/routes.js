const { router, get, post } = require("microrouter");
const { json, send, createError } = require("micro");
const fetch = require("isomorphic-unfetch");

const index = async (req, res) => {
  send(res, 200, "<h1>Hello from Express on Now 2.0!</h2>");
};

const login = async (req, res) => {
  const { username } = await json(req);
  const url = `https://api.github.com/users/${username}`;

  console.log(url);

  try {
    const response = await fetch(url);
    if (response.ok) {
      const js = await response.json();
      return send(res, 200, js);
    } else {
      return send(res, response.status, response.statusText);
    }
  } catch (error) {
    throw createError(error.statusCode, error.statusText);
  }
};

const profile = async (req, res) => {
  if (!("authorization" in req.headers)) {
    throw createError(401, "Authorization header missing");
  }

  const auth = await req.headers.authorization;
  const { token } = JSON.parse(auth);
  const url = `https://api.github.com/user/${token}`;

  console.log(url);

  try {
    const response = await fetch(url);

    if (response.ok) {
      const js = await response.json();
      // Need camelcase in the frontend
      const data = Object.assign({}, { avatarUrl: js.avatar_url }, js);
      return send(res, 200, { data });
    } else {
      return send(res, response.status, response.statusText);
    }
  } catch (error) {
    throw createError(error.statusCode, error.statusText);
  }
};

const routes = router(
  get("/", index),
  get("/profile", profile),
  post("/login", login)
);

module.exports = routes;
