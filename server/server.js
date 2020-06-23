const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("config");

const app = express();
const port = process.env.PORT || 9090;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const mongoClient = require("mongodb").MongoClient;
const mongoUrl = "mongodb://localhost:27017/";
global.db = "";
mongoClient.connect(mongoUrl, { useUnifiedTopology: true }, (err, res) => {
  if (err) {
    console.log("Error in connection");
    return;
  }
  db = res.db("copybook");
  console.log("database is connected");
});

process.on("uncaughtException", (error, data) => {
  if (error) {
    console.log("critical error, yet system keeps running");
    //email to system administartor
    console.log(error);
    return;
  }
});

const postRoutes = require("./routes/posts/posts.js");
const userRoutes = require("./routes/users/users.js");
// app.post("/posts", postRoutes);
app.use("/posts", postRoutes);
app.use("/users", userRoutes);

app.listen(port, (err) => {
  if (err) {
    console.log("Server error");
    return;
  }
  console.log(`server is listening to port ${port}`);
});
