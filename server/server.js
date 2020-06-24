const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("config");
const app = express();
const server = require("http").createServer(app);
const socketIo = require("socket.io");
// const io = require("socket.io")(server, { origins: "http://localhost:3000" });
// io.origins("*:*");

const port = process.env.PORT || 9090;

const io = socketIo(server); // < Interesting!

let interval;

io.on("connection", (socket) => {
  console.log("New client connected");
  // socket.emit("FromAPI", "New client connected");
  // if (interval) {
  //   clearInterval(interval);
  // }
  // interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    // clearInterval(interval);
  });
  socket.on("chat", (msg) => {
    socket.emit("FromAPI", msg);
  });
});

////////////////////////////////// socket

// const tech = io.of("/chat");

// //io - server, socket - client events. namespases are joined by clients by sending a request to the server
// tech.on("connection", (socket) => {
//   socket.on("join", (data) => {
//     socket.join(data.room);
//     tech.in(data.room).emit("message", `new user joined ${data.room} room`);
//   });
//   socket.on("message", (data) => {
//     console.log(`message: ${data.msg}`);
//     tech.in(data.room).emit("message", data.msg);
//   });

//   socket.on("disconnect", () => {
//     console.log("user disconnected");

//     tech.emit("message", "user disconnected");
//   });
// });

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

server.listen(port, () => console.log(`Listening on port ${port}`));
