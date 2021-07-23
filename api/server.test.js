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

describe("jokes router", () => {
  describe("[GET] /api/jokes", () => {
    test("gets all jokes from the jokes table", async () => {
      const res = await request(server).get("/api/jokes");
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
    test("snapshot test", async () => {
      const res = await request(server).get("/api/jokes");
      expect(res.body).toMatchSnapshot();
    });
  });
});
