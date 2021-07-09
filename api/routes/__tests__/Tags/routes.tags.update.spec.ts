import mongoose from "mongoose";
import { connectToDB } from "~database";
import Tag, { TTagDocument } from "~models/tag";
import app from "~testServer";

const data = {
  category: "update cat",
  tagName: "Update Cat"
};

const invalidId = new mongoose.Types.ObjectId();

describe("Update Tag Route", () => {
  let tag: TTagDocument;
  beforeAll(async () => {
    await connectToDB();
    tag = await Tag.create(data);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("rejects invalid requests where the tagname doesn't exist in req.body", async done => {
    await app()
      .put(`/api/tags/update/${invalidId}`)
      .expect("Content-Type", /json/)
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual("Missing tag update parameters.");
        done();
      });
  });

  it("rejects invalid requests where the id is invalid", async done => {
    await app()
      .put(`/api/tags/update/${invalidId}`)
      .send({ tagName: tag.tagName })
      .expect("Content-Type", /json/)
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual("Unable to locate that tag to update.");
        done();
      });
  });

  it("rejects invalid requests where the tagname is already in use", async done => {
    await app()
      .put(`/api/tags/update/${tag._id}`)
      .send({ tagName: "PHP" })
      .expect("Content-Type", /json/)
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual("That tagname is already in use!");
        done();
      });
  });

  it("accepts requests to update the tag", async done => {
    await app()
      .put(`/api/tags/update/${tag._id}`)
      .send({ tagName: "Updated Tag" })
      .expect("Content-Type", /json/)
      .expect(201)
      .then(res => {
        expect(res.body.message).toEqual("Successfully updated Updated Tag.");
        done();
      });
  });
});
