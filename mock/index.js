const path = require("path");
const jsonServer = require("json-server");
const pause = require("connect-pause");
const fs = require("fs");

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "mock-db.json"));
const middlewares = jsonServer.defaults();
const rewriteRules = JSON.parse(fs.readFileSync("mock/routes.json", "UTF-8"));

server.use(pause(500)); // delay in MS to simulate slower response
server.use(middlewares);
server.use(jsonServer.bodyParser);

server.get("/items", (req, res) => {
  //access mock-db.json like this, this is a lowdb object: https://github.com/typicode/lowdb
  const lowdb = router.db;
  res.send(lowdb.get("items"));
});

server.post("/items", async (req, res) => {
  const lowdb = router.db;
  const wrapper = lowdb.get("items");
  console.log(wrapper);
  console.log(req.body);
  wrapper.get("items").push(req.body);
  await lowdb.write();
  res.status(201).send();
});

server.use(jsonServer.rewriter(rewriteRules));
server.use(router);

const port = 5000;

server.listen(port, () => {
  console.log("JSON Mock Server is running on Port:", port);
});
