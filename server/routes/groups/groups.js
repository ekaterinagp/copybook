const router = require("express").Router();
const config = require("config");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const random = Math.floor(Math.random() * 100000);

//@route get all groups
router.get("/all", async (req, res) => {
  const allGroups = await db.collection("groups").find().toArray();
  return res.send(allGroups);
});

//@router get group by id
router.get("/:id", async (req, res) => {
  const groupID = req.params.id;
  console.log(groupID);
  const group = await db.collection("groups").findOne({ id: groupID });
  console.log(group);
  return res.send(group);
});

//@route create group
router.post("/create", async (req, res) => {
  const { title, short_desc, long_desc, img, contact, location } = req.body;

  if (title && short_desc && long_desc && contact && location) {
    try {
      let group = {
        id: Math.floor(Math.random() * 100000),
        title: title,
        members: [
          {
            user_id: "Benjamin3610",
            first_name: "Benjamin",
            last_name: "B",
            user_img:
              "https://cdn.pixabay.com/photo/2017/02/07/16/47/kingfisher-2046453_960_720.jpg",
          },
          {
            user_id: "Anna1667",
            first_name: "Anna",
            last_name: "A",
            user_img:
              "https://cdn.pixabay.com/photo/2015/10/09/00/55/lotus-978659_960_720.jpg",
          },

          {
            user_id: "Catty3851",
            first_name: "Catty",
            last_name: "C",
            user_img:
              "https://cdn.pixabay.com/photo/2016/12/13/00/13/rabbit-1903016_960_720.jpg",
          },
        ],
        short_desc: short_desc,
        long_desc: long_desc,
        img: img,
        contact: contact,
        location: location,
        public: true,
        visible: true,
      };
      db.collection("groups").insertOne(group, (err, res) => {
        if (err) {
          console.log("can not insert error");
          return;
        }
        console.log(`inserted id : ${res.insertedId}`);
        return;
      });
      return res.send("succsess");
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  } else {
    return res.status(403).send({ error: "All fields are required" });
  }
});

module.exports = router;
