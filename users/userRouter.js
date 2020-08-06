const express = require("express");
const userDb = require("./userDb.js");
const postDb = require("../posts/postDb");
const router = express.Router();

router.post("/", validateUser("name"), (req, res) => {
  // do your magic!
  userDb
    .insert(req.body)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((error) => {
      console.log("POST/isert - user - catch error:", error);
    });
});

router.post("/:id/posts", validateUserId, validatePost("text"), (req, res) => {
  // do your magic!
  // res.status(200).json({ message: "Hello is working" });
  const userId = req.params.id;
  const postInfo = { text: req.body.text, user_id: userId };
  postDb
    .insert(postInfo)
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((error) => {
      console.log("POST/isert - user - catch error:", error);
      res.status(500).json({ error: "catch error POST /:id/posts" });
    });
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
  const { id } = req.params;
  const user = req.body;
  userDb.getUserPosts(id).then((item) => {
    if (item.id === user.id) {
      res.status(200).json(item);
    } else {
      res.status(500).json({ message: "catch error user getUserPosts" });
    }
  });
});

router.delete("/:id", (req, res) => {
  // do your magic!
  const { id } = req.params;
  // const user = req.body;

  userDb.remove(id).then((item) => {
    if (item == item > 0) {
      res.status(200).json({ message: `The user ${id} has been deleted` });
    } else {
      res.status(500).json({
        message: "Error removing the user",
      });
    }
  });
});

router.put("/:id", (req, res) => {
  // do your magic!
  const { id } = req.params;
  const user = req.body;

  userDb.update(id, user).then((item) => {
    if ((item = id)) {
      res.status(201).json({ ...user });
    } else {
      res.status(500).json({ error: "The post could not be updated" });
    }
  });
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const id = req.params.id;
  userDb.getById(id).then((user) => {
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(500).json({ message: "from middleware:  invalid user id" });
    }
  });
}

function validateUser(prop) {
  return function (req, res, next) {
    // do your magic!
    if (req.body[prop]) {
      next();
    } else {
      res.status(400).json({
        message: `from middleware: Please provide the ${prop}`,
      });
    }
  };
}

function validatePost(prop) {
  // do your magic!
  return function (req, res, next) {
    if (req.body[prop]) {
      next();
    } else {
      res.status(400).json({
        message: `from middleware: Please provide the ${prop}`,
      });
    }
  };
}

module.exports = router;
