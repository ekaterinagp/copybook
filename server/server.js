const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("config");
const app = express();

const port = process.env.PORT || 9090;

const server = require("http").Server(app);
const io = require("socket.io")(server);

///////////////////////// socket
const users = {};
console.log(users);
io.on("connection", function (socket) {
  console.log("a user connected");
  socket.on("login", function (data) {
    console.log("a user " + data.userId + " connected");
    // saving userId to array with socket ID
    users[socket.id] = data.userId;
    io.emit("login", data.userId);
  });

  console.log(users);
  socket.on("chat message", function (msg) {
    console.log("message :" + JSON.stringify(msg));
    io.emit("chat message", msg);
  });
  socket.on("disconnect", function () {
    console.log("user " + users[socket.id] + " disconnected");
    // remove saved socket from users object
    delete users[socket.id];
  });
});

////////////////////////////

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
const groupsRoutes = require("./routes/groups/groups.js");
const watchRoutes = require("./routes/watch/watch.js");
const chatRoutes = require("./routes/chats/chats.js");
// app.post("/posts", postRoutes);
app.use("/posts", postRoutes);
app.use("/users", userRoutes);
app.use("/groups", groupsRoutes);
app.use("/watch", watchRoutes);
app.use("/chats", chatRoutes);

// app.listen(port, (err) => {
//   if (err) {
//     console.log("Server error");
//     return;
//   }
//   console.log(`server is listening to port ${port}`);
// });

server.listen(port, () => console.log(`Listening happily on port ${port}`));
