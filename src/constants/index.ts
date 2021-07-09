export const RESET_SERVER_MESSAGES = "RESET_SERVER_MESSAGES";
export const SERVER_ERROR = "SERVER_ERROR";
export const SERVER_MESSAGE = "SERVER_MESSAGE";

// user constants
export const USERS_CREATE = "USERS/CREATE";
export const USERS_DELETE = "USERS/DELETE";
export const USERS_FETCH = "USERS/FETCH";
export const USERS_RESET = "USERS/RESET";
export const USERS_SEED = "USERS/SEED";
export const USERS_SET_DATA = "USERS/SET_DATA";
export const USERS_UPDATE = "USERS/UPDATE";

// tag constants
export const TAGS_CREATE = "TAGS/CREATE";
export const TAGS_DELETE = "TAGS/DELETE";
export const TAGS_FETCH = "TAGS/FETCH";
export const TAGS_RESET = "TAGS/RESET";
export const TAGS_SEED = "TAGS/SEED";
export const TAGS_SET_DATA = "TAGS/SET_DATA";
export const TAGS_UPDATE = "TAGS/UPDATE";

export type ResetMessage = typeof RESET_SERVER_MESSAGES;
export type ServerError = typeof SERVER_ERROR;
export type ServerMessage = typeof SERVER_MESSAGE;

// export user constants
export type CreateUser = typeof USERS_CREATE;
export type DeleteUser = typeof USERS_DELETE;
export type FetchUser = typeof USERS_FETCH;
export type ResetUsers = typeof USERS_RESET;
export type SeedUsers = typeof USERS_SEED;
export type SetUsersData = typeof USERS_SET_DATA;
export type UpdateUser = typeof USERS_UPDATE;

// export tag constants
export type CreateTag = typeof TAGS_CREATE;
export type DeleteTag = typeof TAGS_DELETE;
export type FetchTag = typeof TAGS_FETCH;
export type ResetTags = typeof TAGS_RESET;
export type SeedTags = typeof TAGS_SEED;
export type SetTagsData = typeof TAGS_SET_DATA;
export type UpdateTag = typeof TAGS_UPDATE;
