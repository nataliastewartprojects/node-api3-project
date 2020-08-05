const express = require("express");
const userDb = require("./userDb.js");

const router = express.Router();

router.post("/", (req, res) => {
  // do your magic!
});

router.post("/:id/posts", (req, res) => {
  // do your magic!
});

router.get("/", (req, res) => {
  // do your magic!
  userDb
    .get(req.body)
    .then((users) => {
      res.status(200).json({ headers: req.headers, users });
    })
    .catch((error) => {
      console.log("GET users catch error:", error);
      res.status(500).json({ error: "catch error GET users" });
    });
});

router.get("/:id", validateUserId, (req, res) => {
  // do your magic!
  res.status(200).json(req.user);
});

router.get("/:id/posts", (req, res) => {
  // do your magic!
});

router.delete("/:id", (req, res) => {
  // do your magic!
});

router.put("/:id", (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const { id } = req.params;
  userDb.getById(id).then((user) => {
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(500).json({ message: "from middleware: user not found" });
    }
  });
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
