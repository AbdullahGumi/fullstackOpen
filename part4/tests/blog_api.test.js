// /*eslint-env es6*/
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");

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

test("blog is created successfully", async () => {
  const newBlog = {
    title: "Spongebob Adventure",
    author: "mark may",
    url: "https://blog.com"
  };

  await api.post("/api/blogs").send(newBlog).expect(201);

  const response = await api.get("/api/blogs");

  expect(response.body.length).toBe(initialBlogs.length + 1);
  expect(response.body).toContain(...response.body, newBlog);

});

afterAll(() => {
  mongoose.connection.close();
});