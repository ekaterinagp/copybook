const router = require("express").Router();
const config = require("config");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

const jwSecret = config.get("jwtSecret");
const { v1: uuidv1 } = require("uuid");

const random = Math.floor(Math.random() * 10000);

//@router get one user
router.get("/:id", async (req, res) => {
  const userID = req.params.id;
  const user = await db.collection("users").findOne({ user_id: userID });
  return res.send(user);
});

//@route signup

router.post("/signup", async (req, res) => {
  const { email, password, passwordCheck, name, lastName } = req.body;
  if (
    email &&
    password &&
    passwordCheck &&
    name &&
    password === passwordCheck
  ) {
    if (password.length < 8) {
      return res
        .status(403)
        .send({ error: "Password must be minimum 8 characters" });
    } else {
      bcrypt.hash(password, saltRounds, async (error, hashedPassword) => {
        if (error) {
          return res.status(500).send({ message: "error hashing password" });
        }
        try {
          const existingUser = await db
            .collection("users")
            .findOne({ email: email });
          if (existingUser) {
            return res.status(500).send({ error: "User already exists" });
          }

          let user = {
            firstName: name,
            user_id: name + Math.floor(Math.random() * 10000),
            lastName: lastName,
            email: email,
            password: hashedPassword,
            user_img: "",
            friends: [],
            groups: [],
            videos: [],
            items: [],
          };
          db.collection("users").insertOne(user, (err, res) => {
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
      });
    }
  } else if (password !== passwordCheck) {
    return res
      .status(403)
      .send({ error: "Password and repeated password are not the same" });
  } else {
    return res.status(403).send({ error: "All fields are required" });
  }
});

//@route login

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await db.collection("users").findOne({ email: email });
    if (!user) {
      return res
        .status(403)
        .send({ error: "User with this email does not exist" });
    }
    if (email && password) {
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch) return res.status(403).send({ error: "Wrong password" });
        jwt.sign(
          { id: user.user_id },
          config.get("jwtSecret"),
          {
            expiresIn: 3600,
          },
          (err, token) => {
            if (err) throw err;
            res.json({
              token: token,
              user: {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                user_img: user.user_img,
                id: user.user_id,
              },
            });
          }
        );
      });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

//@route valid token?
router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    console.log(token);
    if (!token) return res.json(false);

    const verified = jwt.verify(token, jwSecret);
    console.log(verified.id);
    if (!verified) return res.json(false);

    const user = await User.query().select().where({ id: verified.id });
    if (!user) return res.json(false);

    return res.json(true);
  } catch (error) {
    res.json({ error: error.message });
  }
});

module.exports = router;
