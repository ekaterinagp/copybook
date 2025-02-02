const formidable = require("formidable");
const detect = require("detect-file-type");
const { v1: uuidv1 } = require("uuid");
const fs = require("fs");
// const posts = require("../../test");
const path = require("path");
const router = require("express").Router();
const ObjectId = require("mongodb").ObjectId;
const auth = require("../../middleware/auth");

//@route get all posts

router.get("/all", async (req, res) => {
  const allPosts = await db.collection("posts").find().toArray();
  return res.send(allPosts);
});

//@route get all posts by one user

router.get("/:id", async (req, res) => {
  const user_id = req.params.id;
  const posts = await db
    .collection("posts")
    .find({ user_id: user_id })
    .toArray();
  return res.send(posts);
});

//@route add like to post
router.post("/addlike/:id", async (req, res) => {
  const postID = req.params.id;
  const { firstName, lastName, user_id } = req.body;
  if ((firstName, lastName, user_id)) {
    try {
      const newLike = await db.collection("posts").updateOne(
        { post_id: postID },
        {
          $push: {
            likes: {
              firstName: firstName,
              lastName: lastName,
              user_id: user_id,
            },
          },
        }
      );
      return res.send("succsess");
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  } else {
    return res.status(403).send({ error: "all fields are required" });
  }
});

// @route add comment to post
router.post("/addcomment/:id", async (req, res) => {
  const postID = req.params.id;
  const { firstName, lastName, user_id, text, user_img } = req.body;
  if ((text, user_id)) {
    try {
      const newComment = await db.collection("posts").updateOne(
        { post_id: postID },
        {
          $push: {
            comments: {
              comment_id: uuidv1(),
              firstName: firstName,
              lastName: lastName,
              user_id: user_id,
              user_img: user_img,
              text: text,
            },
          },
        }
      );
      return res.send("succsess");
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  } else {
    return res.status(403).send({ error: "all fields are required" });
  }
});

//@route delete comment //ADD auth
router.put("/deletecomment/:id", auth, async (req, res) => {
  const comment_id = req.params.id;

  try {
    const result = db
      .collection("posts")
      .updateOne(
        { "comments.comment_id": comment_id },
        { $pull: { comments: { comment_id: comment_id } } },
        (err, dbResponse) => {
          if (err) {
            return res.status(500).send({ error: err });
          }
          return res.status(200).send({ response: "Comment deleted" });
        }
      );
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

//@route to add post firebase

router.post("/add/:userID", async (req, res) => {
  const userID = req.params.userID;
  const data = req.body;

  // console.log(req.body);
  const post = {
    post_id: uuidv1(),
    firstName: data.firstName,
    lastName: data.lastName,
    user_id: userID,
    feeling: data.feeling,
    text: data.text,
    img: data.img,
    user_img: data.user_img,
    tag: [],
    comments: [],
    likes: [],
  };
  if (data.tag && data.tag.length) {
    data.tag.forEach((tag) => {
      let tagTemp = {
        user_id: tag.user_id,
        firstName: tag.firstName,
        lastName: tag.lastName,
        user_img: tag.user_img,
      };
      post.tag.push(tagTemp);
    });
  }

  if (post.feeling || post.img || post.text || post.tag.length) {
    try {
      db.collection("posts").insertOne(post, (err, dbResponse) => {
        if (err) {
          return res.send("mongo can not add a post");
        }
        return res.send("ok here");
      });
    } catch (ex) {
      return res.status(500).send("System under maintainance");
    }
  }
});

//@route add many posts faker
router.post("/many", async (req, res) => {
  try {
    db.collection("posts").insertMany(posts);
    return res.send("succsess");
  } catch (e) {
    print(e);
  }
});

//@ route add post with formidable
router.post("/add-post/:userID", (req, res) => {
  const userID = req.params.userID;

  const form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    console.log(files);
    console.log(fields);
    if (err) {
      console.log(err);
      return res.send("Error in file");
    }
    console.log(`name: ${fields.name}`);

    console.log(files.img.name);

    detect.fromFile(files.img.path, (err, result) => {
      const allowedImageTypes = ["jpg", "jpeg", "png"];
      if (!allowedImageTypes.includes(result.ext)) {
        return res.send("image not allowed");
      }
      // console.log(result.ext); //image extension
      const pictureName = uuidv1() + "." + result.ext;
      // console.log(pictureName);

      const oldPath = files.img.path;

      const newPath = path.join(__dirname, "..", "..", "images", pictureName);
      fs.rename(oldPath, newPath, (err) => {
        if (err) {
          console.log("error with moving files");
          return;
        }

        const post = {
          name: fields.name,
          user_id: userID,
          feeling: fields.feeling,
          text: fields.text,
          img: pictureName,
          user_img: "",
          tag: [],
          comments: [],
          likes: [],
        };
        try {
          db.collection("posts").insertOne(post, (err, dbResponse) => {
            if (err) {
              return res.send("mongo can not add a post");
            }
            return res.send("ok here");
          });
        } catch (ex) {
          return res.status(500).send("System under maintainance");
        }
      });
    });
  });
});

module.exports = router;
