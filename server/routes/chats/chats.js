const { Db } = require("mongodb");

const router = require("express").Router();

//@router get chat
router.get("/chat/:id", async (req, res) => {
  const userID = req.params.id;
  const chat = await db.collection("chats").findOne({
    $or: [{ "user1.user_id": userID }, { "user2.user_id": userID }],
  });
  return res.send(chat);
});

//@route save chat

router.put("/save", async (req, res) => {
  const { chat, chat_id } = req.body;
  console.log(chat);
  if ((chat, chat_id)) {
    try {
      const chatToInsert = {
        chat: [chat],
      };
      const chatToAdd = await db
        .collection("chats")
        .findOneAndUpdate(
          { chat_id: chat_id },
          { $set: { chat: chat } },
          (err, res) => {
            if (err) {
              console.log("can not insert error");
              return;
            }
          }
        );

      return res.send("succsess");
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  } else {
    return res.status(403).send({ error: "All fields are required" });
  }
});

module.exports = router;
