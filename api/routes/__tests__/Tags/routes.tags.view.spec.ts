import mongoose from "mongoose";
import { connectToDB } from "~database";
import Tag, { TTagDocument } from "~models/tag";
import app from "~testServer";

const data = {
  tagName: "PHP",
  category: "Scripting"
};

describe("View Tag Route", () => {
  let tag: TTagDocument;
  beforeAll(async () => {
    await connectToDB();
    tag = await Tag.create(data);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("rejects requests where the id doesn't exist", async done => {
    const invalidId = new mongoose.Types.ObjectId();
    await app()
      .get(`/api/tags/view/${invalidId}`)
      .expect("Content-Type", /json/)
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual("Unable to locate that tag.");
        done();
      });
  });

  it("accepts requests to view the tag's details", async done => {
    await app()
      .get(`/api/tags/view/${tag._id}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body).toEqual({
          tag: expect.objectContaining({
            __v: expect.any(Number),
            _id: expect.anything(),
            tagName: expect.any(String),
            category: expect.any(String)
          })
        });
        done();
      });
  });
});
