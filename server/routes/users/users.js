const router = require("express").Router();
const config = require("config");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

const jwSecret = config.get("jwtSecret");
const { v1: uuidv1 } = require("uuid");

const users = [
  {
    firstName: "Pansy",
    lastName: "Gulgowski",
    email: "Luigi.McGlynn86@gmail.com",
    user_img: "https://s3.amazonaws.com/uifaces/faces/twitter/renbyrd/128.jpg",
    friends: [],
    cover_img: "http://lorempixel.com/640/480",
    photos: [
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
    ],
    lives: "Noahfurt",
    works: "Designer",
    bio: "Voluptatum ut sunt.",
    groups: [],
    videos: [],
    items: [],
    user_id: "Pansy3799",
  },
  {
    firstName: "Brice",
    lastName: "Goodwin",
    email: "Connie.Kemmer@yahoo.com",
    user_img:
      "https://s3.amazonaws.com/uifaces/faces/twitter/osmanince/128.jpg",
    friends: [],
    cover_img: "http://lorempixel.com/640/480",
    photos: [
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
    ],
    lives: "West Evaview",
    works: "Administrator",
    bio: "Voluptatem quae quidem nobis et est.",
    groups: [],
    videos: [],
    items: [],
    user_id: "Brice5930",
  },
  {
    firstName: "Noemi",
    lastName: "Hauck",
    email: "Ismael12@yahoo.com",
    user_img:
      "https://s3.amazonaws.com/uifaces/faces/twitter/jonsgotwood/128.jpg",
    friends: [],
    cover_img: "http://lorempixel.com/640/480",
    photos: [
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
    ],
    lives: "Beckerfort",
    works: "Director",
    bio: "Ut quam suscipit molestias neque.",
    groups: [],
    videos: [],
    items: [],
    user_id: "Noemi4748",
  },
  {
    firstName: "Roy",
    lastName: "Fritsch",
    email: "Fredy.Ullrich73@gmail.com",
    user_img: "https://s3.amazonaws.com/uifaces/faces/twitter/mgonto/128.jpg",
    friends: [],
    cover_img: "http://lorempixel.com/640/480",
    photos: [
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
    ],
    lives: "East Mireilletown",
    works: "Administrator",
    bio: "Itaque ut velit temporibus tenetur cum excepturi quam quod.",
    groups: [],
    videos: [],
    items: [],
    user_id: "Roy6774",
  },
  {
    firstName: "Hiram",
    lastName: "Schamberger",
    email: "Desiree.Beier47@hotmail.com",
    user_img:
      "https://s3.amazonaws.com/uifaces/faces/twitter/sunlandictwin/128.jpg",
    friends: [],
    cover_img: "http://lorempixel.com/640/480",
    photos: [
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
    ],
    lives: "North Carol",
    works: "Representative",
    bio: "Saepe enim rerum.",
    groups: [],
    videos: [],
    items: [],
    user_id: "Hiram2985",
  },
  {
    firstName: "Adelbert",
    lastName: "McKenzie",
    email: "Lysanne85@hotmail.com",
    user_img: "https://s3.amazonaws.com/uifaces/faces/twitter/aaroni/128.jpg",
    friends: [],
    cover_img: "http://lorempixel.com/640/480",
    photos: [
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
    ],
    lives: "New Presley",
    works: "Director",
    bio: "Aut ipsum enim.",
    groups: [],
    videos: [],
    items: [],
    user_id: "Adelbert9686",
  },
  {
    firstName: "Johnson",
    lastName: "Torphy",
    email: "Cyril.Olson@hotmail.com",
    user_img:
      "https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg",
    friends: [],
    cover_img: "http://lorempixel.com/640/480",
    photos: [
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
    ],
    lives: "Port Ervin",
    works: "Developer",
    bio: "Ipsa delectus qui quis sit et ipsa voluptatum.",
    groups: [],
    videos: [],
    items: [],
    user_id: "Johnson2179",
  },
  {
    firstName: "Brianne",
    lastName: "Ryan",
    email: "Waino.Morar@hotmail.com",
    user_img:
      "https://s3.amazonaws.com/uifaces/faces/twitter/jehnglynn/128.jpg",
    friends: [],
    cover_img: "http://lorempixel.com/640/480",
    photos: [
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
    ],
    lives: "Haleyborough",
    works: "Representative",
    bio: "Et et omnis error veniam quae possimus libero numquam.",
    groups: [],
    videos: [],
    items: [],
    user_id: "Brianne8593",
  },
  {
    firstName: "Kennith",
    lastName: "Harvey",
    email: "Abbie.Wolf29@hotmail.com",
    user_img:
      "https://s3.amazonaws.com/uifaces/faces/twitter/reideiredale/128.jpg",
    friends: [],
    cover_img: "http://lorempixel.com/640/480",
    photos: [
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
    ],
    lives: "East Gabe",
    works: "Assistant",
    bio: "Eligendi non odit quas at est quo voluptatibus sed.",
    groups: [],
    videos: [],
    items: [],
    user_id: "Kennith4868",
  },
  {
    firstName: "Corene",
    lastName: "Runolfsson",
    email: "Destiney_Jacobs52@gmail.com",
    user_img:
      "https://s3.amazonaws.com/uifaces/faces/twitter/goddardlewis/128.jpg",
    friends: [],
    cover_img: "http://lorempixel.com/640/480",
    photos: [
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
    ],
    lives: "Port Neomaland",
    works: "Architect",
    bio: "Rerum ut quidem debitis soluta.",
    groups: [],
    videos: [],
    items: [],
    user_id: "Corene8922",
  },
  {
    firstName: "Jaiden",
    lastName: "Hyatt",
    email: "Devin92@gmail.com",
    user_img: "https://s3.amazonaws.com/uifaces/faces/twitter/S0ufi4n3/128.jpg",
    friends: [],
    cover_img: "http://lorempixel.com/640/480",
    photos: [
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
    ],
    lives: "Port Seamuston",
    works: "Technician",
    bio: "Vel molestiae fuga vel veritatis dolores ad qui sint quam.",
    groups: [],
    videos: [],
    items: [],
    user_id: "Jaiden4631",
  },
  {
    firstName: "Damian",
    lastName: "Koss",
    email: "Gaston_Gleichner@gmail.com",
    user_img:
      "https://s3.amazonaws.com/uifaces/faces/twitter/turkutuuli/128.jpg",
    friends: [],
    cover_img: "http://lorempixel.com/640/480",
    photos: [
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
    ],
    lives: "Vernonville",
    works: "Liaison",
    bio: "Repudiandae quasi commodi vitae voluptas ut repellendus sed.",
    groups: [],
    videos: [],
    items: [],
    user_id: "Damian3575",
  },
  {
    firstName: "Karina",
    lastName: "Kertzmann",
    email: "Josefa_Zieme77@gmail.com",
    user_img:
      "https://s3.amazonaws.com/uifaces/faces/twitter/maximsorokin/128.jpg",
    friends: [],
    cover_img: "http://lorempixel.com/640/480",
    photos: [
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
    ],
    lives: "West Roselynburgh",
    works: "Planner",
    bio: "Magni vel magni voluptatem ut qui libero alias.",
    groups: [],
    videos: [],
    items: [],
    user_id: "Karina5144",
  },
  {
    firstName: "Ellis",
    lastName: "Labadie",
    email: "Garry.Brakus31@yahoo.com",
    user_img: "https://s3.amazonaws.com/uifaces/faces/twitter/jnmnrd/128.jpg",
    friends: [],
    cover_img: "http://lorempixel.com/640/480",
    photos: [
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
    ],
    lives: "Jenaberg",
    works: "Officer",
    bio: "Dolor doloribus eligendi odit.",
    groups: [],
    videos: [],
    items: [],
    user_id: "Ellis1718",
  },
  {
    firstName: "Clemmie",
    lastName: "Satterfield",
    email: "Lorenzo74@hotmail.com",
    user_img:
      "https://s3.amazonaws.com/uifaces/faces/twitter/denisepires/128.jpg",
    friends: [],
    cover_img: "http://lorempixel.com/640/480",
    photos: [
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
    ],
    lives: "Vernerfurt",
    works: "Technician",
    bio:
      "Cum est tempore labore voluptatem expedita labore reiciendis odio expedita.",
    groups: [],
    videos: [],
    items: [],
    user_id: "Clemmie4844",
  },
  {
    firstName: "Jackson",
    lastName: "Crooks",
    email: "Zachery.Langosh99@hotmail.com",
    user_img:
      "https://s3.amazonaws.com/uifaces/faces/twitter/roybarberuk/128.jpg",
    friends: [],
    cover_img: "http://lorempixel.com/640/480",
    photos: [
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
    ],
    lives: "Evieview",
    works: "Technician",
    bio: "Quo ut non quis omnis illo et voluptate consequatur.",
    groups: [],
    videos: [],
    items: [],
    user_id: "Jackson3857",
  },
  {
    firstName: "Melany",
    lastName: "Jacobson",
    email: "Modesta_Conroy90@hotmail.com",
    user_img: "https://s3.amazonaws.com/uifaces/faces/twitter/luxe/128.jpg",
    friends: [],
    cover_img: "http://lorempixel.com/640/480",
    photos: [
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
    ],
    lives: "Shirleyland",
    works: "Associate",
    bio: "Vel unde voluptate qui minima pariatur earum dolores voluptates.",
    groups: [],
    videos: [],
    items: [],
    user_id: "Melany1428",
  },
  {
    firstName: "Carol",
    lastName: "Powlowski",
    email: "Erwin13@hotmail.com",
    user_img:
      "https://s3.amazonaws.com/uifaces/faces/twitter/naitanamoreno/128.jpg",
    friends: [],
    cover_img: "http://lorempixel.com/640/480",
    photos: [
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
    ],
    lives: "New Maudemouth",
    works: "Architect",
    bio: "Deleniti suscipit placeat aliquid minima.",
    groups: [],
    videos: [],
    items: [],
    user_id: "Carol260",
  },
  {
    firstName: "Delia",
    lastName: "Eichmann",
    email: "Jesse93@gmail.com",
    user_img:
      "https://s3.amazonaws.com/uifaces/faces/twitter/loganjlambert/128.jpg",
    friends: [],
    cover_img: "http://lorempixel.com/640/480",
    photos: [
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
    ],
    lives: "Delbertstad",
    works: "Executive",
    bio: "Omnis accusantium quasi.",
    groups: [],
    videos: [],
    items: [],
    user_id: "Delia5369",
  },
  {
    firstName: "Brianne",
    lastName: "Schumm",
    email: "Lucious72@yahoo.com",
    user_img: "https://s3.amazonaws.com/uifaces/faces/twitter/samihah/128.jpg",
    friends: [],
    cover_img: "http://lorempixel.com/640/480",
    photos: [
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
      "http://lorempixel.com/640/480",
    ],
    lives: "Heaneyborough",
    works: "Officer",
    bio: "Sit ea molestiae impedit deserunt.",
    groups: [],
    videos: [],
    items: [],
    user_id: "Brianne8072",
  },
];

// for (let i = 0; i < 20; i++) {
//   let user = {
//     firstName: faker.name.firstName(),
//     lastName: faker.name.lastName(),
//     email: faker.internet.email(),
//     user_img: faker.image.avatar(),
//     friends: [],
//     cover_img: faker.image.imageUrl(),
//     photos: [
//       faker.image.imageUrl(),
//       faker.image.imageUrl(),
//       faker.image.imageUrl(),
//       faker.image.imageUrl(),
//       faker.image.imageUrl(),
//       faker.image.imageUrl(),
//       faker.image.imageUrl(),
//       faker.image.imageUrl(),
//       faker.image.imageUrl(),
//       faker.image.imageUrl(),
//     ],
//     lives: faker.address.city(),
//     works: faker.name.jobType(),
//     bio: faker.lorem.sentence(),
//     groups: [],
//     videos: [],
//     items: [],
//   };
//   users.push(user);
// }

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

// @route insert many users from faker
router.post("/many", async (req, res) => {
  try {
    db.collection("users").insertMany(users);
    return res.send("succsess");
  } catch (e) {
    print(e);
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
