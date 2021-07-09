import mongoose from "mongoose";
import { connectToDB } from "~database";
import Tag, { TTagDocument } from "~models/tag";
import app from "~testServer";

const data = {
  category: "Example Cat",
  tagName: "Cat"
};

describe("Delete Tag Route", () => {
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
      .delete(`/api/tags/delete/${invalidId}`)
      .expect("Content-Type", /json/)
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual("Unable to locate that tag for deletion.");
        done();
      });
  });

  it("accepts requests to delete tags", async done => {
    await app()
      .delete(`/api/tags/delete/${tag._id}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body.message).toEqual(
          `Successfully deleted ${tag.tagName}.`
        );
        done();
      });
  });
});
