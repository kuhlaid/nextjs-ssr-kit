import isEmpty from "lodash.isempty";
import * as constants from "~constants";
import { ActionType, TagData } from "~types";

export type CreateTag = typeof createTag;
export type DeleteTag = typeof deleteTag;
export type FetchTags = typeof fetchTags;
export type ResetTags = typeof resetTags;
export type SeedDB = typeof seedDB;
export type SetTags = typeof setTags;
export type UpdateTag = typeof updateTag;

/**
 * Attempts to create a new tag in DB.
 *
 * @param props - contains tag's  name and category
 * @returns {ActionType} a redux action
 */
export const createTag = (
  payload: TagData
): ActionType<constants.CreateTag, TagData> => ({
  type: constants.TAGS_CREATE,
  payload
});

/**
 * Attempts to delete a tag from DB.
 *
 * @param id - tag id as string
 * @returns {ActionType} a redux action
 */
export const deleteTag = (
  payload: string
): ActionType<constants.DeleteTag, string> => ({
  type: constants.TAGS_DELETE,
  payload
});

/**
 * Attempts to fetchTags tags from DB.
 *
 * @returns {ActionType} a redux action
 */
export const fetchTags = (): ActionType<constants.FetchTag> => ({
  type: constants.TAGS_FETCH
});

/**
 * Resets redux tags state.
 * @returns {ActionType} a redux action
 */
export const resetTags = (): ActionType<constants.ResetTags> => ({
  type: constants.TAGS_RESET
});

/**
 * Attempts to seed the DB with data.
 *
 * @returns {ActionType} a redux action
 */
export const seedDB = (): ActionType<constants.SeedTags> => ({
  type: constants.TAGS_SEED
});

/**
 * Sets tag data to state.
 *
 * @param data - contains tag data: [_id, tagName, category }]
 * @returns {ActionType} a redux action
 */
export const setTags = (
  data: TagData[]
): ActionType<constants.SetTagsData, TagData[]> => ({
  type: constants.TAGS_SET_DATA,
  payload: !isEmpty(data) ? data : []
});

/**
 * Attempts to update a current tag in DB.
 *
 * @param payload - props contain tag data and tag id as string
 * @returns {ActionType} a redux action
 */
export const updateTag = (
  payload: TagData
): ActionType<constants.UpdateTag, TagData> => ({
  type: constants.TAGS_UPDATE,
  payload
});
