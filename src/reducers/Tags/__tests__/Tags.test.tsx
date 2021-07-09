import { HYDRATE } from "next-redux-wrapper";
import * as constants from "~constants";
import tagReducer, { initialState } from "../index";

const tags = [
  {
    tagName: "MySQL",
    category: "Db",
    _id: "987654321"
  }
];

describe("Tag Reducer", () => {
  it("initially matches the initialState pattern", () => {
    expect(tagReducer(undefined, { payload: {}, type: "" })).toEqual(
      initialState
    );
  });

  it("rehydrates", () => {
    const state = tagReducer(undefined, {
      type: HYDRATE,
      payload: { tags: { data: tags, isLoading: false } }
    });

    expect(state).toEqual({
      data: tags,
      isLoading: false
    });
  });

  it("sets tag data", () => {
    const state = tagReducer(undefined, {
      type: constants.TAGS_SET_DATA,
      payload: tags
    });

    expect(state).toEqual({
      data: tags,
      isLoading: false
    });
  });

  it("resets tags data during fetch", () => {
    let state = tagReducer(undefined, {
      type: constants.TAGS_SET_DATA,
      payload: { tags }
    });

    state = tagReducer(state, {
      type: constants.TAGS_FETCH
    });

    expect(state).toEqual(initialState);
  });

  it("resets tags data", () => {
    let state = tagReducer(undefined, {
      type: constants.TAGS_SET_DATA,
      payload: { tags }
    });

    state = tagReducer(state, {
      type: constants.TAGS_RESET
    });

    expect(state).toEqual(initialState);
  });
});
