// /*eslint-env es6*/
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')


const api = supertest(app);

const initialBlogs = [
  {
    title: "The Ultimate Blog ",
    author: "Jack born",
    url: "https://blog.com"
  },
  {
    title: "Bloging: zero to hero",
    author: "Elon",
    url: "https://blog.com"
  },
  {
    title: "coding blog",
    author: "Mr nam",
    url: "https://blog.com"
  }  
];


beforeEach(async () => {
  await Blog.deleteMany({});
  await new Blog(initialBlogs[0]).save();
  await new Blog(initialBlogs[1]).save();
  await new Blog(initialBlogs[2]).save();
  await User.deleteMany({});
});

test("blog is returned in json format", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("the exact number of blogs is returned", async () => {
  const blogs = await api.get("/api/blogs");
  expect(blogs.body.length).toBe(3);
});

test("unique identifier property of the blog posts is named id", async () => {
  const blogs = await api.get("/api/blogs");
  blogs.body.map(blog => expect(blog.id).toBeDefined())  

});

test("blog is created successfully if there is a valid token", async () => {
  const newBlog = {
    title: "Spongebob Adventure",
    author: "mark may",
    url: "https://blog.com"
  };

 const user =  await new User({
    username: "justman",
    name: "man",
    passwordHash: await bcrypt.hash('1234567890', 10)
  }).save();

  const token = jwt.sign(user.toJSON(), process.env.SECRET);

  await api.post("/api/blogs").set('Authorization', `Bearer ${token}`).send(newBlog).expect(201);

  const response = await api.get("/api/blogs");
  expect(response.body.length).toBe(initialBlogs.length + 1);
  expect(response.body).toContain(...response.body, newBlog);

});

test("blog creation fails if no token is provided", async () => {
  const newBlog = {
    title: "Spongebob Adventure",
    author: "mark may",
    url: "https://blog.com"
  };

 const user =  await new User({
    username: "justman",
    name: "man",
    passwordHash: await bcrypt.hash('1234567890', 10)
  }).save();

  const token = undefined;

  await api.post("/api/blogs").set('Authorization', `Bearer ${token}`).send(newBlog).expect(401);

});

test("when a new blog has no likes property, its value will be 0 by default", async () => {
   const newBlog = {
     title: "Adventure Time",
     author: "mark may II",
     url: "https://blog.com"
   };

  const user =  await new User({
    username: "pacman",
    name: "Mr pac",
    passwordHash: await bcrypt.hash('1234567890', 10)
  }).save();

  const token = jwt.sign(user.toJSON(), process.env.SECRET);

   const response = await api.post("/api/blogs").set('Authorization', `Bearer ${token}`).send(newBlog)
   expect(response.body.likes).toBe(0);
 });

test("if the body has no title or url the backend responds with 400 Bad Request ", async () => {
  const newBlog = {
    author: "mark may II"
  };
  const response = await api.post("/api/blogs").send(newBlog)
  expect(response.status).toBe(400);
});

afterAll(() => {
  mongoose.connection.close();
});