import mongoose from "mongoose";
import { connectToDB } from "~database";
import app from "~testServer";

describe("Get All Tags Route", () => {
  beforeAll(async () => {
    await connectToDB();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("routes requests to the getTags controller", async done => {
    await app()
      .get("/api/tags")
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              __v: expect.any(Number),
              _id: expect.anything(),
              tagName: expect.any(String),
              category: expect.any(String)
            })
          ])
        );
        done();
      });
  });
});
