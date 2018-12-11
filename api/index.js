const micro = require("micro");
const routes = require("./routes");

const PORT = process.env.PORT || 3000;

const server = micro(routes);
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
