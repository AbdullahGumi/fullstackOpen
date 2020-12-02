// /*eslint-env es6*/
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user");

const api = supertest(app);

const initalUsers = [
  {
    name: "Johnny black",
    username: "bakerman",
    passwordHash: "mypass"
  },
  {
    name: "White Snow",
    username: "Snow",
    passwordHash: "Secret"
  },
  {
    name: "Red Man",
    username: "Mr Red",
    passwordHash: "nopass"
  }
];

beforeEach(async () => {
  await User.deleteMany({});

  const usersArray = initalUsers.map(user => new User(user));
  const promiseArray = usersArray.map(user => user.save());

  await Promise.all(promiseArray);
});

describe("fetch users", () => {
  test("status code 200", async () => {
    await api
      .get("/api/users")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("exact number of users", async () => {
    const response = await api.get("/api/users");

    expect(response.body.length).toBe(3);
  });
});

describe("creating users", () => {
  test("created successfully", async () => {
    const newUser = {
      name: "MongoDB",
      username: "Mr Mongo",
      password: "189897"
    };

    const response = await api.post("/api/users").send(newUser);
    expect(response.body.username).toBe(newUser.username);
  });

  test("password with less than 3 characters return 400 Bad Request", async () => {
    const newUser = {
      username: "Le August",
      password: "le"
    };

    const response = await api.post("/api/users").send(newUser);
    expect(response.status).toBe(400);
  });

  test("username with less than 3 characters return 400 Bad Request", async () => {
    const newUser = {
      username: "Le",
      password: "le1234"
    };

    const response = await api.post("/api/users").send(newUser);
    expect(response.status).toBe(400);
  });
});

afterAll(() => {
  mongoose.connection.close();
});