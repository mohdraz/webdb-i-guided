const express = require("express");

// database access using knex
const db = require("../data/db-config.js");

const router = express.Router();

// router.get("/", async (req, res) => {
//   //   db("posts")
//   //     .then(posts => console.log(posts))
//   //     .catch(err => console.log("ERR", err));

//   try {
//     const posts = await db("posts");
//     // select * from posts
//     res.json(posts);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to get posts" });
//   }
// });

// knex('users').orderBy('name', 'desc')

router.get("/", async (req, res) => {
  //   db("posts")
  //     .then(posts => console.log(posts))
  //     .catch(err => console.log("ERR", err));

  try {
    const posts = await db("posts").orderBy("id", "desc");
    // select * from posts
    console.log(post);
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Failed to get posts" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    // select * from posts where id = 16
    const [post] = await db("posts").where("id", id);
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: "Failed to get posts" });
  }
});

router.post("/", async (req, res) => {
  const postData = req.body;
  try {
    const post = await db("posts").insert(postData);
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: "Failed to add post" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const rowsUpdated = await db("posts")
      .where("id", id)
      .update(req.body);
    res.status(200).json({ updated: rowsUpdated });
  } catch (err) {
    res.status(500).json({ message: "Failed to update post" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const rowsDeleted = await db("posts")
      .where("id", id)
      .del();
    res.status(200).json({ deletedRecords: rowsDeleted });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete post" });
  }
});

module.exports = router;
