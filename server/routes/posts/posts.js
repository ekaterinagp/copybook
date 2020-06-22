const formidable = require("formidable");
const detect = require("detect-file-type");
const { v1: uuidv1 } = require("uuid"); //npm uuid
const fs = require("fs");
const path = require("path");
const router = require("express").Router();

//@ route add post
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
