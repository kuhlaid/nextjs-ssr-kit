import * as constants from "~constants";
import * as actions from "../index";

const props = {
  _id: "tagi8243j438j34218j7u",
  tagName: "SQL Server",
  category: "Databases"
};

const _id = "123456789";

describe("Tag Actions", () => {
  it("returns TAGS_CREATE with props", () => {
    const value = actions.createTag(props);

    expect(value).toEqual({ type: constants.TAGS_CREATE, payload: props });
  });

  it("returns TAGS_DELETE with an id", () => {
    const value = actions.deleteTag(_id);

    expect(value).toEqual({ type: constants.TAGS_DELETE, payload: _id });
  });

  it("returns TAGS_FETCH", () => {
    const value = actions.fetchTags();

    expect(value).toEqual({ type: constants.TAGS_FETCH });
  });

  it("returns TAGS_RESET", () => {
    const value = actions.resetTags();

    expect(value).toEqual({ type: constants.TAGS_RESET });
  });

  it("returns TAGS_SEED", () => {
    const value = actions.seedDB();

    expect(value).toEqual({ type: constants.TAGS_SEED });
  });

  it("returns TAGS_SET_DATA with data", () => {
    const data = [props];
    const value = actions.setTags(data);

    expect(value).toEqual({ type: constants.TAGS_SET_DATA, payload: data });
  });

  it("returns TAGS_SET_DATA with empty data", () => {
    const value = actions.setTags([]);

    expect(value).toEqual({ type: constants.TAGS_SET_DATA, payload: [] });
  });

  it("returns TAGS_UPDATE with props and an id", () => {
    const payload = { ...props, _id };
    const value = actions.updateTag(payload);

    expect(value).toEqual({ type: constants.TAGS_UPDATE, payload });
  });
});
