// code away!
const express = require("express");
const server = express();
const usersRouter = require("./users/userRouter.js");

//middlewares
server.use(express.json());
server.use(logger);

//Routers
server.use("/api/users", usersRouter);

//testing server
server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//logger middleware
function logger(req, res, next) {
  console.log(
    `[timestamp: ${new Date().toISOString()}] method: ${req.method} to url: ${
      req.url
    } 
    )}`
  );

  next();
}

server.listen(8000, () => {
  console.log("\n*** Server Running on http://localhost:8000 ***\n");
});
