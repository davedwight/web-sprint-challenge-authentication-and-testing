const request = require("supertest");
const server = require("./server");
const db = require("../data/dbConfig");

test("sanity", () => {
  expect(true).toBe(true);
});

test("in testing environment", () => {
  expect(process.env.NODE_ENV).toBe("testing");
});

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
afterAll(async () => {
  await db.destroy();
});

describe("[GET] /api/jokes", () => {
  test("requests with a valid token get all jokes from the jokes table", async () => {
    // make sure to check token validation
    await request(server).post('/api/auth/register').send({ username: 'fizzbuzz', password: '1234' })
    let res = await request(server).post('/api/auth/login').send({ username: 'fizzbuzz', password: '1234' })
    res = await request(server).get('/api/jokes').set('Authorization', res.body.token)
    expect(res.body).toMatchObject([
      {
        id: "0189hNRf2g",
        joke: "I'm tired of following my dreams. I'm just going to ask them where they are going and meet up with them later.",
      },
      {
        id: "08EQZ8EQukb",
        joke: "Did you hear about the guy whose whole left side was cut off? He's all right now.",
      },
      {
        id: "08xHQCdx5Ed",
        joke: "Why didn’t the skeleton cross the road? Because he had no guts.",
      },
    ]);
  });
  test("requests without a token are bounced with status 401", () => {});
  test("requests with an invalid token are bounced with status 401", () => {});
  test("snapshot test", async () => {
    const res = await request(server).get("/api/jokes");
    expect(res.body).toMatchSnapshot();
  });
});

describe("[POST] /api/auth/register", () => {
  test("registers a new user in the database", () => {});
  test("register returns the new user information", () => {});
  test("does not create new user in the database if username and password are not provided", () => {});
  test("does not create new user if username is a duplicate", () => {});
});
describe("[POST] /api/auth/register", () => {
  test("responds with status code 200 on valid credentials", () => {});
  test("responds with a correctly formatted token", () => {});
});
