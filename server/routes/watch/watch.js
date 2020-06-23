const router = require("express").Router();

//@route get saved videos
router.get("/saved/:id", async (req, res) => {
  const userId = req.params.id;
  const user = await db.collection("users").findOne({ user_id: userId });
  return res.send(user.videos);
});

//@route save video
router.post("/save/:id", async (req, res) => {
  const userID = req.params.id;
  const { link } = req.body;
  if (link) {
    try {
      const newLink = await db
        .collection("users")
        .updateOne({ user_id: userID }, { $push: { videos: { link: link } } });
      return res.send(newLink);
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  } else {
    return res.status(403).send({ error: "link is missing" });
  }
});

module.exports = router;
