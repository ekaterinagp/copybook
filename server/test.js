var faker = require("faker");
const { v1: uuidv1 } = require("uuid");

var randomName = faker.name.findName(); // Rowan Nikolaus
var randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
// var randomCard = faker.helpers.createCard();

// console.log(randomCard);

// let user = {
//   firstName: "",
//   lastName: "",
//   email: "",
//   user_img: "",
//   friends: [],
//   cover_img: "",
//   photos: [],
//   lives: "",
//   works: "",
//   bio: "",
//   groups: [],
//   videos: [],
//   items: [],
// };

// const posts = [];

// for (let i = 0; i < 50; i++) {
//   let post = {
//     firstName: faker.name.firstName(),
//     lastName: faker.name.lastName(),
//     post_id: uuidv1(),

//     user_img: faker.image.avatar(),

//     img: faker.image.image(),

//     feeling: faker.random.word(),
//     text: faker.random.words(),

//     likes: [],
//     comments: [],
//   };
//   posts.push(post);
// }

// posts.forEach((post) => {
//   post.user_id = post.firstName + Math.floor(Math.random() * 10000);
// });

// console.log(posts);

module.exports = posts;
