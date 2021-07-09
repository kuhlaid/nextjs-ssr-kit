import { expectSaga, testSaga } from "redux-saga-test-plan";
import app from "~utils/axiosConfig";
import * as actions from "~actions/Tags";
import * as sagas from "~sagas/Tags";
import tagReducer from "~reducers/Tags";
import { resetMessage, setMessage } from "~actions/Server";
import serverReducer from "~reducers/Server";
import { parseData, parseMessage } from "~utils/parseResponse";
import toast from "~components/App/Toast";
import mockApp from "~utils/mockAxios";
import { TagData } from "~types";

const id = "987654321";

const tag = {
  tagName: "SuperDuperDb",
  category: "Dibbers",
  _id: id
};

const data = [tag];

describe("Tag Sagas", () => {
  afterEach(() => {
    mockApp.reset();
  });

  afterAll(() => {
    mockApp.restore();
  });

  describe("Fetch Tags", () => {
    it("logical flow matches pattern for fetching tags", () => {
      const res = { data };

      testSaga(sagas.fetchTags)
        .next()
        .put(resetMessage())
        .next()
        .call(app.get, "tags")
        .next(res)
        .call(parseData, res)
        .next(res.data)
        .put(actions.setTags(res.data))
        .next()
        .isDone();
    });

    it("sets the tags into redux state", async () => {
      mockApp.onGet("tags").reply(200, data);

      return expectSaga(sagas.fetchTags)
        .withReducer(tagReducer)
        .hasFinalState({
          data: [tag],
          isLoading: false
        })
        .run();
    });

    it("if API call fails, it displays a message", async () => {
      const err = "Unable to fetch tags.";
      mockApp.onGet("tags").reply(404, { err });

      return expectSaga(sagas.fetchTags)
        .withReducer(serverReducer)
        .hasFinalState({
          error: err,
          message: ""
        })
        .run();
    });
  });

  describe("Create New Tag", () => {
    let payload: TagData;
    let message: string;
    beforeAll(() => {
      message = "Successfully created a new tag.";
      payload = tag;
    });

    it("logical flow matches pattern for a creating a new tag", () => {
      const res = { data: { message } };

      testSaga(sagas.createTag, actions.createTag(payload))
        .next()
        .put(resetMessage())
        .next()
        .call(app.post, "tags/create", payload)
        .next(res)
        .call(parseMessage, res)
        .next(res.data.message)
        .call(toast, { type: "success", message: res.data.message })
        .next()
        .put(setMessage(res.data.message))
        .next()
        .call(sagas.fetchTags)
        .next()
        .isDone();
    });

    it("successfully creates a new tag", async () => {
      mockApp.onPost("tags/create").reply(200, { message });
      mockApp.onGet("tags").reply(200, data);

      return expectSaga(sagas.createTag, actions.createTag(payload))
        .withReducer(tagReducer)
        .hasFinalState({
          data: [tag],
          isLoading: false
        })
        .run();
    });

    it("if API call fails, it displays a message", async () => {
      const err = "Unable to create a new tag.";
      mockApp.onPost("tags/create").reply(404, { err });

      return expectSaga(sagas.createTag, actions.createTag(payload))
        .withReducer(serverReducer)
        .hasFinalState({
          error: err,
          message: ""
        })
        .run();
    });
  });

  describe("Delete Tag", () => {
    let message: string;
    beforeAll(() => {
      message = "Successfully deleted a tag.";
    });

    it("logical flow matches pattern for a deleting a tag", () => {
      const res = { data: { message } };

      testSaga(sagas.deleteTag, actions.deleteTag(id))
        .next()
        .put(resetMessage())
        .next()
        .call(app.delete, `tags/delete/${id}`)
        .next(res)
        .call(parseMessage, res)
        .next(res.data.message)
        .call(toast, { type: "success", message: res.data.message })
        .next()
        .put(setMessage(res.data.message))
        .next()
        .call(sagas.fetchTags)
        .next()
        .isDone();
    });

    it("successfully deletes a tag", async () => {
      mockApp.onDelete(`tags/delete/${id}`).reply(200, { message });
      mockApp.onGet("tags").reply(200, data);

      return expectSaga(sagas.deleteTag, actions.deleteTag(id))
        .withReducer(tagReducer)
        .hasFinalState({
          data: [tag],
          isLoading: false
        })
        .run();
    });

    it("if API call fails, it displays a message", async () => {
      const err = "Unable to delete the tag.";
      mockApp.onDelete(`tags/delete/${id}`).reply(404, { err });

      return expectSaga(sagas.deleteTag, actions.deleteTag(id))
        .withReducer(serverReducer)
        .hasFinalState({
          error: err,
          message: ""
        })
        .run();
    });
  });

  describe("Seed Tags", () => {
    it("logical flow matches pattern for seeding tags", () => {
      const res = { data };

      testSaga(sagas.seedDB)
        .next()
        .put(resetMessage())
        .next()
        .call(app.post, "tags/seed")
        .next(res)
        .call(parseData, res)
        .next(res.data)
        .put(actions.setTags(res.data))
        .next()
        .isDone();
    });

    it("seeds the database and sets the tags into redux state", async () => {
      mockApp.onPost("tags/seed").reply(200, data);

      return expectSaga(sagas.seedDB)
        .withReducer(tagReducer)
        .hasFinalState({
          data: [tag],
          isLoading: false
        })
        .run();
    });

    it("if API call fails, it displays a message", async () => {
      const err = "Unable to seed tags.";
      mockApp.onPost("tags/seed").reply(404, { err });

      return expectSaga(sagas.seedDB)
        .withReducer(serverReducer)
        .hasFinalState({
          error: err,
          message: ""
        })
        .run();
    });
  });

  describe("Update Tag", () => {
    let payload: TagData;
    let message: string;
    beforeAll(() => {
      message = "Successfully updated a tag.";
      payload = tag;
    });

    it("logical flow matches pattern for a updating a tag", () => {
      const res = { data: { message } };

      testSaga(sagas.updateTag, actions.updateTag(payload))
        .next()
        .put(resetMessage())
        .next()
        .call(app.put, `tags/update/${id}`, payload)
        .next(res)
        .call(parseMessage, res)
        .next(res.data.message)
        .call(toast, { type: "info", message: res.data.message })
        .next()
        .put(setMessage(res.data.message))
        .next()
        .call(sagas.fetchTags)
        .next()
        .isDone();
    });

    it("successfully updates a tag", async () => {
      mockApp.onPut(`tags/update/${id}`).reply(200, { message });
      mockApp.onGet("tags").reply(200, data);

      return expectSaga(sagas.updateTag, actions.updateTag(payload))
        .withReducer(tagReducer)
        .hasFinalState({
          data: [tag],
          isLoading: false
        })
        .run();
    });

    it("if API call fails, it displays a message", async () => {
      const err = "Unable to update a tag.";
      mockApp.onPut(`tags/update/${id}`).reply(404, { err });

      return expectSaga(
        sagas.updateTag,
        actions.updateTag({ ...payload, _id: id })
      )
        .withReducer(serverReducer)
        .hasFinalState({
          error: err,
          message: ""
        })
        .run();
    });
  });
});
