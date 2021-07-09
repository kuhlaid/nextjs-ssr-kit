import mongoose from "mongoose";
import { connectToDB } from "~database";
import app from "~testServer";

const data = {
  tagName: "Svelte",
  category: "Super Js"
};

describe("Get Create Tags Route", () => {
  beforeAll(async () => {
    await connectToDB();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("rejects invalid requests to the createTags controller", async done => {
    await app()
      .post("/api/tags/create")
      .expect("Content-Type", /json/)
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual("Missing tag card creation parameters.");
        done();
      });
  });

  it("rejects requests where the tagname already exists", async done => {
    const invalidData = { ...data, tagName: "PHP" };
    await app()
      .post("/api/tags/create")
      .send(invalidData)
      .expect("Content-Type", /json/)
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual("That tagname is already in use!");
        done();
      });
  });

  it("accepts requests to create unique tags", async done => {
    await app()
      .post("/api/tags/create")
      .send(data)
      .expect("Content-Type", /json/)
      .expect(201)
      .then(res => {
        expect(res.body.message).toEqual(
          `Successfully created ${data.tagName}.`
        );
        done();
      });
  });
});
