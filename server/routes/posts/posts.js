const formidable = require("formidable");
const detect = require("detect-file-type");
const { v1: uuidv1 } = require("uuid");
const fs = require("fs");
// const posts = require("../../test");
const path = require("path");
const router = require("express").Router();

const posts = [
  {
    firstName: "Billie",
    lastName: "Turner",
    post_id: "41f413e0-b5e3-11ea-a508-17399a840cb8",
    user_img: "https://s3.amazonaws.com/uifaces/faces/twitter/sovesove/128.jpg",
    img: "http://lorempixel.com/640/480/transport",
    feeling: "Home",
    text: "Computer",
    likes: [],
    comments: [],
    user_id: "Billie7759",
  },
  {
    firstName: "Jayce",
    lastName: "Moen",
    post_id: "41f413e1-b5e3-11ea-a508-17399a840cb8",
    user_img: "https://s3.amazonaws.com/uifaces/faces/twitter/popey/128.jpg",
    img: "http://lorempixel.com/640/480/nightlife",
    feeling: "Investor",
    text: "enterprise",
    likes: [],
    comments: [],
    user_id: "Jayce7739",
  },
  {
    firstName: "Lexi",
    lastName: "Schmitt",
    post_id: "41f43af0-b5e3-11ea-a508-17399a840cb8",
    user_img:
      "https://s3.amazonaws.com/uifaces/faces/twitter/mugukamil/128.jpg",
    img: "http://lorempixel.com/640/480/animals",
    feeling: "extensible",
    text: "markets",
    likes: [],
    comments: [],
    user_id: "Lexi7407",
  },
  {
    firstName: "Randall",
    lastName: "Moen",
    post_id: "41f43af1-b5e3-11ea-a508-17399a840cb8",
    user_img:
      "https://s3.amazonaws.com/uifaces/faces/twitter/sachacorazzi/128.jpg",
    img: "http://lorempixel.com/640/480/technics",
    feeling: "orange",
    text: "Officer XML",
    likes: [],
    comments: [],
    user_id: "Randall6344",
  },
  {
    firstName: "Lemuel",
    lastName: "Rath",
    post_id: "41f43af2-b5e3-11ea-a508-17399a840cb8",
    user_img:
      "https://s3.amazonaws.com/uifaces/faces/twitter/sethlouey/128.jpg",
    img: "http://lorempixel.com/640/480/nature",
    feeling: "interface",
    text: "Profound",
    likes: [],
    comments: [],
    user_id: "Lemuel776",
  },
  {
    firstName: "Junior",
    lastName: "Rippin",
    post_id: "41f43af3-b5e3-11ea-a508-17399a840cb8",
    user_img:
      "https://s3.amazonaws.com/uifaces/faces/twitter/rtgibbons/128.jpg",
    img: "http://lorempixel.com/640/480/nightlife",
    feeling: "architectures",
    text: "Metal Taiwan Metal",
    likes: [],
    comments: [],
    user_id: "Junior3327",
  },
  {
    firstName: "Monroe",
    lastName: "Murazik",
    post_id: "41f43af4-b5e3-11ea-a508-17399a840cb8",
    user_img:
      "https://s3.amazonaws.com/uifaces/faces/twitter/xalionmalik/128.jpg",
    img: "http://lorempixel.com/640/480/fashion",
    feeling: "Functionality",
    text: "Wooden copying",
    likes: [],
    comments: [],
    user_id: "Monroe5614",
  },
  {
    firstName: "Camilla",
    lastName: "Reinger",
    post_id: "41f43af5-b5e3-11ea-a508-17399a840cb8",
    user_img:
      "https://s3.amazonaws.com/uifaces/faces/twitter/nitinhayaran/128.jpg",
    img: "http://lorempixel.com/640/480/transport",
    feeling: "Branding",
    text: "Credit Card Account Chilean Peso Unidades de fomento",
    likes: [],
    comments: [],
    user_id: "Camilla4493",
  },
  {
    firstName: "Jedediah",
    lastName: "Olson",
    post_id: "41f43af6-b5e3-11ea-a508-17399a840cb8",
    user_img:
      "https://s3.amazonaws.com/uifaces/faces/twitter/nilshelmersson/128.jpg",
    img: "http://lorempixel.com/640/480/nightlife",
    feeling: "Directives",
    text: "SMTP SSL",
    likes: [],
    comments: [],
    user_id: "Jedediah9951",
  },
  {
    firstName: "Jaunita",
    lastName: "Robel",
    post_id: "41f46200-b5e3-11ea-a508-17399a840cb8",
    user_img: "https://s3.amazonaws.com/uifaces/faces/twitter/kevinoh/128.jpg",
    img: "http://lorempixel.com/640/480/sports",
    feeling: "Mouse",
    text: "empowering bluetooth",
    likes: [],
    comments: [],
    user_id: "Jaunita8001",
  },
  {
    firstName: "Greta",
    lastName: "Aufderhar",
    post_id: "41f46201-b5e3-11ea-a508-17399a840cb8",
    user_img: "https://s3.amazonaws.com/uifaces/faces/twitter/dorphern/128.jpg",
    img: "http://lorempixel.com/640/480/food",
    feeling: "ROI",
    text: "Checking Account Credit Card Account",
    likes: [],
    comments: [],
    user_id: "Greta1283",
  },
  {
    firstName: "Elyssa",
    lastName: "Nienow",
    post_id: "41f46202-b5e3-11ea-a508-17399a840cb8",
    user_img:
      "https://s3.amazonaws.com/uifaces/faces/twitter/sasha_shestakov/128.jpg",
    img: "http://lorempixel.com/640/480/nature",
    feeling: "Computers",
    text: "Principal",
    likes: [],
    comments: [],
    user_id: "Elyssa5659",
  },
  {
    firstName: "Jackie",
    lastName: "Wolf",
    post_id: "41f46203-b5e3-11ea-a508-17399a840cb8",
    user_img: "https://s3.amazonaws.com/uifaces/faces/twitter/darylws/128.jpg",
    img: "http://lorempixel.com/640/480/technics",
    feeling: "transition",
    text: "Central envisioneer",
    likes: [],
    comments: [],
    user_id: "Jackie1956",
  },
  {
    firstName: "Weldon",
    lastName: "Satterfield",
    post_id: "41f46204-b5e3-11ea-a508-17399a840cb8",
    user_img:
      "https://s3.amazonaws.com/uifaces/faces/twitter/kapaluccio/128.jpg",
    img: "http://lorempixel.com/640/480/food",
    feeling: "withdrawal",
    text: "feed",
    likes: [],
    comments: [],
    user_id: "Weldon7804",
  },
  {
    firstName: "Cristal",
    lastName: "Cummerata",
    post_id: "41f46205-b5e3-11ea-a508-17399a840cb8",
    user_img: "https://s3.amazonaws.com/uifaces/faces/twitter/martip07/128.jpg",
    img: "http://lorempixel.com/640/480/business",
    feeling: "back-end",
    text: "Administrator",
    likes: [],
    comments: [],
    user_id: "Cristal267",
  },
  {
    firstName: "Hilton",
    lastName: "Stehr",
    post_id: "41f46206-b5e3-11ea-a508-17399a840cb8",
    user_img: "https://s3.amazonaws.com/uifaces/faces/twitter/dshster/128.jpg",
    img: "http://lorempixel.com/640/480/people",
    feeling: "intangible",
    text: "FTP Vietnam",
    likes: [],
    comments: [],
    user_id: "Hilton1305",
  },
  {
    firstName: "Janiya",
    lastName: "Weimann",
    post_id: "41f46207-b5e3-11ea-a508-17399a840cb8",
    user_img: "https://s3.amazonaws.com/uifaces/faces/twitter/wtrsld/128.jpg",
    img: "http://lorempixel.com/640/480/nightlife",
    feeling: "monitor",
    text: "Belarus Tennessee",
    likes: [],
    comments: [],
    user_id: "Janiya7601",
  },
  {
    firstName: "Wendell",
    lastName: "Rohan",
    post_id: "41f46208-b5e3-11ea-a508-17399a840cb8",
    user_img:
      "https://s3.amazonaws.com/uifaces/faces/twitter/ceekaytweet/128.jpg",
    img: "http://lorempixel.com/640/480/sports",
    feeling: "intangible",
    text: "card",
    likes: [],
    comments: [],
    user_id: "Wendell3744",
  },
  {
    firstName: "Cathryn",
    lastName: "Prohaska",
    post_id: "41f46209-b5e3-11ea-a508-17399a840cb8",
    user_img:
      "https://s3.amazonaws.com/uifaces/faces/twitter/HenryHoffman/128.jpg",
    img: "http://lorempixel.com/640/480/abstract",
    feeling: "copy",
    text: "Refined Bedfordshire",
    likes: [],
    comments: [],
    user_id: "Cathryn2506",
  },
  {
    firstName: "Verona",
    lastName: "Renner",
    post_id: "41f4620a-b5e3-11ea-a508-17399a840cb8",
    user_img: "https://s3.amazonaws.com/uifaces/faces/twitter/matkins/128.jpg",
    img: "http://lorempixel.com/640/480/abstract",
    feeling: "copy",
    text: "Incredible Barbados 24/7",
    likes: [],
    comments: [],
    user_id: "Verona4300",
  },
  {
    firstName: "Nash",
    lastName: "Fay",
    post_id: "41f4620b-b5e3-11ea-a508-17399a840cb8",
    user_img:
      "https://s3.amazonaws.com/uifaces/faces/twitter/dparrelli/128.jpg",
    img: "http://lorempixel.com/640/480/abstract",
    feeling: "Wooden",
    text: "Coordinator Generic Wooden Ball",
    likes: [],
    comments: [],
    user_id: "Nash952",
  },
  {
    firstName: "Bo",
    lastName: "Langworth",
    post_id: "41f48910-b5e3-11ea-a508-17399a840cb8",
    user_img: "https://s3.amazonaws.com/uifaces/faces/twitter/cemshid/128.jpg",
    img: "http://lorempixel.com/640/480/sports",
    feeling: "Unbranded",
    text: "deposit Cambridgeshire Ergonomic",
    likes: [],
    comments: [],
    user_id: "Bo3046",
  },
  {
    firstName: "Arely",
    lastName: "Davis",
    post_id: "41f48911-b5e3-11ea-a508-17399a840cb8",
    user_img: "https://s3.amazonaws.com/uifaces/faces/twitter/SlaapMe/128.jpg",
    img: "http://lorempixel.com/640/480/animals",
    feeling: "HTTP",
    text: "synergies archive",
    likes: [],
    comments: [],
    user_id: "Arely8412",
  },
  {
    firstName: "Amiya",
    lastName: "Bergstrom",
    post_id: "41f48912-b5e3-11ea-a508-17399a840cb8",
    user_img: "https://s3.amazonaws.com/uifaces/faces/twitter/cybind/128.jpg",
    img: "http://lorempixel.com/640/480/fashion",
    feeling: "Generic",
    text: "enable Borders",
    likes: [],
    comments: [],
    user_id: "Amiya2312",
  },
  {
    firstName: "Edgar",
    lastName: "Yundt",
    post_id: "41f48913-b5e3-11ea-a508-17399a840cb8",
    user_img:
      "https://s3.amazonaws.com/uifaces/faces/twitter/dhooyenga/128.jpg",
    img: "http://lorempixel.com/640/480/city",
    feeling: "data-warehouse",
    text: "Home Sleek Cotton Chicken asynchronous",
    likes: [],
    comments: [],
    user_id: "Edgar3478",
  },
  {
    firstName: "Kali",
    lastName: "Leffler",
    post_id: "41f48914-b5e3-11ea-a508-17399a840cb8",
    user_img: "https://s3.amazonaws.com/uifaces/faces/twitter/kurtinc/128.jpg",
    img: "http://lorempixel.com/640/480/transport",
    feeling: "withdrawal",
    text: "Kentucky Refined",
    likes: [],
    comments: [],
    user_id: "Kali2769",
  },
  {
    firstName: "Amie",
    lastName: "Langworth",
    post_id: "41f48915-b5e3-11ea-a508-17399a840cb8",
    user_img:
      "https://s3.amazonaws.com/uifaces/faces/twitter/salleedesign/128.jpg",
    img: "http://lorempixel.com/640/480/cats",
    feeling: "Stravenue",
    text: "whiteboard",
    likes: [],
    comments: [],
    user_id: "Amie7284",
  },
  {
    firstName: "Pearl",
    lastName: "Barton",
    post_id: "41f48916-b5e3-11ea-a508-17399a840cb8",
    user_img:
      "https://s3.amazonaws.com/uifaces/faces/twitter/saulihirvi/128.jpg",
    img: "http://lorempixel.com/640/480/people",
    feeling: "Movies",
    text: "Ergonomic parsing",
    likes: [],
    comments: [],
    user_id: "Pearl887",
  },
  {
    firstName: "Grayce",
    lastName: "Parisian",
    post_id: "41f48917-b5e3-11ea-a508-17399a840cb8",
    user_img:
      "https://s3.amazonaws.com/uifaces/faces/twitter/richardgarretts/128.jpg",
    img: "http://lorempixel.com/640/480/city",
    feeling: "Stream",
    text: "B2B",
    likes: [],
    comments: [],
    user_id: "Grayce9342",
  },
  {
    firstName: "Elmira",
    lastName: "Beier",
    post_id: "41f48918-b5e3-11ea-a508-17399a840cb8",
    user_img:
      "https://s3.amazonaws.com/uifaces/faces/twitter/stefanozoffoli/128.jpg",
    img: "http://lorempixel.com/640/480/nightlife",
    feeling: "productize",
    text: "THX Surinam Dollar challenge",
    likes: [],
    comments: [],
    user_id: "Elmira3883",
  },
  {
    firstName: "Toney",
    lastName: "Zulauf",
    post_id: "41f48919-b5e3-11ea-a508-17399a840cb8",
    user_img: "https://s3.amazonaws.com/uifaces/faces/twitter/plbabin/128.jpg",
    img: "http://lorempixel.com/640/480/food",
    feeling: "Fantastic Cotton Pizza",
    text: "Public-key Outdoors",
    likes: [],
    comments: [],
    user_id: "Toney1574",
  },
  {
    firstName: "Imani",
    lastName: "Gislason",
    post_id: "41f4891a-b5e3-11ea-a508-17399a840cb8",
    user_img: "https://s3.amazonaws.com/uifaces/faces/twitter/mgonto/128.jpg",
    img: "http://lorempixel.com/640/480/food",
    feeling: "Intelligent Rubber Hat",
    text: "Rubber digital",
    likes: [],
    comments: [],
    user_id: "Imani1196",
  },
  {
    firstName: "Delilah",
    lastName: "Stoltenberg",
    post_id: "41f4891b-b5e3-11ea-a508-17399a840cb8",
    user_img:
      "https://s3.amazonaws.com/uifaces/faces/twitter/enricocicconi/128.jpg",
    img: "http://lorempixel.com/640/480/food",
    feeling: "Cambridgeshire",
    text: "orchestrate Handmade",
    likes: [],
    comments: [],
    user_id: "Delilah2398",
  },
  {
    firstName: "Rasheed",
    lastName: "Hartmann",
    post_id: "41f4891c-b5e3-11ea-a508-17399a840cb8",
    user_img: "https://s3.amazonaws.com/uifaces/faces/twitter/xripunov/128.jpg",
    img: "http://lorempixel.com/640/480/nature",
    feeling: "monitoring",
    text: "driver Uganda Italy",
    likes: [],
    comments: [],
    user_id: "Rasheed8194",
  },
  {
    firstName: "Jillian",
    lastName: "Auer",
    post_id: "41f4b020-b5e3-11ea-a508-17399a840cb8",
    user_img:
      "https://s3.amazonaws.com/uifaces/faces/twitter/sindresorhus/128.jpg",
    img: "http://lorempixel.com/640/480/food",
    feeling: "alliance",
    text: "analyzing",
    likes: [],
    comments: [],
    user_id: "Jillian4041",
  },
  {
    firstName: "Trace",
    lastName: "Crist",
    post_id: "41f4b021-b5e3-11ea-a508-17399a840cb8",
    user_img:
      "https://s3.amazonaws.com/uifaces/faces/twitter/vikasvinfotech/128.jpg",
    img: "http://lorempixel.com/640/480/technics",
    feeling: "Som",
    text: "architect Wooden",
    likes: [],
    comments: [],
    user_id: "Trace9802",
  },
  {
    firstName: "Floy",
    lastName: "Larson",
    post_id: "41f4b022-b5e3-11ea-a508-17399a840cb8",
    user_img: "https://s3.amazonaws.com/uifaces/faces/twitter/mizhgan/128.jpg",
    img: "http://lorempixel.com/640/480/city",
    feeling: "back-end",
    text: "Creek platforms",
    likes: [],
    comments: [],
    user_id: "Floy7870",
  },
  {
    firstName: "Sophie",
    lastName: "Block",
    post_id: "41f4b023-b5e3-11ea-a508-17399a840cb8",
    user_img: "https://s3.amazonaws.com/uifaces/faces/twitter/duivvv/128.jpg",
    img: "http://lorempixel.com/640/480/cats",
    feeling: "HDD",
    text: "Codes specifically reserved for testing purposes",
    likes: [],
    comments: [],
    user_id: "Sophie1225",
  },
  {
    firstName: "Orlo",
    lastName: "Haley",
    post_id: "41f4b024-b5e3-11ea-a508-17399a840cb8",
    user_img:
      "https://s3.amazonaws.com/uifaces/faces/twitter/hai_ninh_nguyen/128.jpg",
    img: "http://lorempixel.com/640/480/animals",
    feeling: "Computers",
    text: "Gloves Illinois",
    likes: [],
    comments: [],
    user_id: "Orlo7240",
  },
  {
    firstName: "Vallie",
    lastName: "Heller",
    post_id: "41f4b025-b5e3-11ea-a508-17399a840cb8",
    user_img: "https://s3.amazonaws.com/uifaces/faces/twitter/baluli/128.jpg",
    img: "http://lorempixel.com/640/480/business",
    feeling: "Corporate",
    text: "brand",
    likes: [],
    comments: [],
    user_id: "Vallie3847",
  },
  {
    firstName: "Kole",
    lastName: "Weissnat",
    post_id: "41f4b026-b5e3-11ea-a508-17399a840cb8",
    user_img: "https://s3.amazonaws.com/uifaces/faces/twitter/dreizle/128.jpg",
    img: "http://lorempixel.com/640/480/abstract",
    feeling: "withdrawal",
    text: "product reinvent system-worthy",
    likes: [],
    comments: [],
    user_id: "Kole9297",
  },
  {
    firstName: "Cleora",
    lastName: "Fisher",
    post_id: "41f4b027-b5e3-11ea-a508-17399a840cb8",
    user_img:
      "https://s3.amazonaws.com/uifaces/faces/twitter/jmillspaysbills/128.jpg",
    img: "http://lorempixel.com/640/480/animals",
    feeling: "Graphic Interface",
    text: "Representative Keyboard Egyptian Pound",
    likes: [],
    comments: [],
    user_id: "Cleora7459",
  },
  {
    firstName: "Hosea",
    lastName: "Wintheiser",
    post_id: "41f4b028-b5e3-11ea-a508-17399a840cb8",
    user_img:
      "https://s3.amazonaws.com/uifaces/faces/twitter/osmanince/128.jpg",
    img: "http://lorempixel.com/640/480/animals",
    feeling: "Kyat",
    text: "Avon",
    likes: [],
    comments: [],
    user_id: "Hosea5247",
  },
  {
    firstName: "Brain",
    lastName: "Becker",
    post_id: "41f4b029-b5e3-11ea-a508-17399a840cb8",
    user_img: "https://s3.amazonaws.com/uifaces/faces/twitter/maz/128.jpg",
    img: "http://lorempixel.com/640/480/nightlife",
    feeling: "Investment Account",
    text: "e-tailers solid state",
    likes: [],
    comments: [],
    user_id: "Brain2753",
  },
  {
    firstName: "Alexzander",
    lastName: "Renner",
    post_id: "41f4b02a-b5e3-11ea-a508-17399a840cb8",
    user_img:
      "https://s3.amazonaws.com/uifaces/faces/twitter/nilshoenson/128.jpg",
    img: "http://lorempixel.com/640/480/food",
    feeling: "Louisiana",
    text: "Dynamic",
    likes: [],
    comments: [],
    user_id: "Alexzander1700",
  },
  {
    firstName: "Theodore",
    lastName: "Flatley",
    post_id: "41f4b02b-b5e3-11ea-a508-17399a840cb8",
    user_img:
      "https://s3.amazonaws.com/uifaces/faces/twitter/psdesignuk/128.jpg",
    img: "http://lorempixel.com/640/480/city",
    feeling: "eyeballs",
    text: "Mission visualize India",
    likes: [],
    comments: [],
    user_id: "Theodore7419",
  },
  {
    firstName: "Lauretta",
    lastName: "Willms",
    post_id: "41f4b02c-b5e3-11ea-a508-17399a840cb8",
    user_img: "https://s3.amazonaws.com/uifaces/faces/twitter/sementiy/128.jpg",
    img: "http://lorempixel.com/640/480/transport",
    feeling: "cross-platform",
    text: "deposit",
    likes: [],
    comments: [],
    user_id: "Lauretta4033",
  },
  {
    firstName: "Lysanne",
    lastName: "Denesik",
    post_id: "41f4b02d-b5e3-11ea-a508-17399a840cb8",
    user_img: "https://s3.amazonaws.com/uifaces/faces/twitter/S0ufi4n3/128.jpg",
    img: "http://lorempixel.com/640/480/animals",
    feeling: "dot-com",
    text: "drive Hawaii",
    likes: [],
    comments: [],
    user_id: "Lysanne3590",
  },
  {
    firstName: "Maggie",
    lastName: "Grimes",
    post_id: "41f4b02e-b5e3-11ea-a508-17399a840cb8",
    user_img:
      "https://s3.amazonaws.com/uifaces/faces/twitter/ChrisFarina78/128.jpg",
    img: "http://lorempixel.com/640/480/cats",
    feeling: "Director",
    text: "scalable Sausages",
    likes: [],
    comments: [],
    user_id: "Maggie9282",
  },
  {
    firstName: "Neil",
    lastName: "Monahan",
    post_id: "41f4b02f-b5e3-11ea-a508-17399a840cb8",
    user_img:
      "https://s3.amazonaws.com/uifaces/faces/twitter/tbakdesigns/128.jpg",
    img: "http://lorempixel.com/640/480/city",
    feeling: "local",
    text: "methodology International",
    likes: [],
    comments: [],
    user_id: "Neil4585",
  },
];

//@route get all posts

router.get("/all", async (req, res) => {
  const allPosts = await db.collection("posts").find().toArray();
  return res.send(allPosts);
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
