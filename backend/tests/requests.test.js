const request = require("supertest");
const app = require("../app");

// 🔥 Mock DB
jest.mock("../db", () => ({
  query: jest.fn(),
}));

const pool = require("../db");

describe("API /api/requests", () => {

  // GET ALL
  test("GET /api/requests → 200", async () => {
    pool.query.mockResolvedValue({ rows: [{ id: 1 }] });

    const res = await request(app).get("/api/requests");

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([{ id: 1 }]);
  });

  // GET BY ID (found)
  test("GET /api/requests/:id → 200", async () => {
    pool.query.mockResolvedValue({ rows: [{ id: 1 }] });

    const res = await request(app).get("/api/requests/1");

    expect(res.statusCode).toBe(200);
  });

  // GET BY ID (not found)
  test("GET /api/requests/:id → 404", async () => {
    pool.query.mockResolvedValue({ rows: [] });

    const res = await request(app).get("/api/requests/999");

    expect(res.statusCode).toBe(404);
  });

  // POST OK
  test("POST /api/requests → 201", async () => {
    pool.query.mockResolvedValue({ rows: [{ id: 1 }] });

    const res = await request(app)
      .post("/api/requests")
      .send({
        name: "Mariem",
        email: "test@test.com",
        phone: "123",
        address: "Tunis",
        service: "repair",
        description: "Fix machine",
        preferred_date: "2026-01-01",
      });

    expect(res.statusCode).toBe(201);
  });

  // POST FAIL (missing fields)
  test("POST /api/requests → 400", async () => {
    const res = await request(app)
      .post("/api/requests")
      .send({ name: "Mariem" });

    expect(res.statusCode).toBe(400);
  });

  // PUT OK
  test("PUT /api/requests/:id → 200", async () => {
    pool.query.mockResolvedValue({ rows: [{ id: 1 }] });

    const res = await request(app)
      .put("/api/requests/1")
      .send({
        name: "Updated",
        email: "test@test.com",
        phone: "123",
        address: "Tunis",
        service: "repair",
        description: "Fix",
        preferred_date: "2026-01-01",
      });

    expect(res.statusCode).toBe(200);
  });

  // DELETE OK
  test("DELETE /api/requests/:id → 200", async () => {
    pool.query.mockResolvedValue({ rows: [{ id: 1 }] });

    const res = await request(app).delete("/api/requests/1");

    expect(res.statusCode).toBe(200);
  });

  // DELETE NOT FOUND
  test("DELETE /api/requests/:id → 404", async () => {
    pool.query.mockResolvedValue({ rows: [] });

    const res = await request(app).delete("/api/requests/999");

    expect(res.statusCode).toBe(404);
  });

});