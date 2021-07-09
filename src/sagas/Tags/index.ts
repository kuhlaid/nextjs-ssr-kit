import { all, put, call, takeLatest } from "redux-saga/effects";
import { resetMessage, setMessage } from "src/actions/Server";
import { setTags } from "src/actions/Tags";
import * as constants from "src/constants";
import toast from "src/components/App/Toast";
import * as actions from "src/actions/Tags";
import app from "src/utils/axiosConfig";
import { parseData, parseMessage } from "src/utils/parseResponse";
import showError from "src/utils/showError";
import { SagaIterator } from "src/types";

/**
 * Attempts to fetch tags from DB.
 *
 * @generator
 * @function fetchTags
 * @yields {object} - A response from a call to the API.
 * @function parseData - returns a parsed res.data.
 * @yields {action} -  A redux action to set tags to redux state.
 * @throws {action} - A toast error message.
 */
export function* fetchTags(): SagaIterator {
  try {
    yield put(resetMessage());

    const res = yield call(app.get, "tags");
    const data = yield call(parseData, res);

    yield put(setTags(data));
  } catch (e) {
    yield call(showError, e.toString());
  }
}

/**
 * Creates a new tag.
 *
 * @generator
 * @param {object} props - props contain new tag data.
 * @yields {object} - A response from a call to the API.
 * @function parseMessage - returns a parsed res.data.message.
 * @yields {action} - A toast success message.
 * @yields {action} - A redux action to set server message state.
 * @yields {action} - A redux action to refetch tags.
 * @throws {action} - A toast error message.
 */
export function* createTag({
  payload
}: ReturnType<typeof actions.createTag>): SagaIterator {
  try {
    yield put(resetMessage());

    const res = yield call(app.post, "tags/create", payload);
    const message = yield call(parseMessage, res);

    yield call(toast, { type: "success", message });

    yield put(setMessage(message));

    yield call(fetchTags);
  } catch (e) {
    yield call(showError, e.toString());
  }
}

/**
 * Attempts to delete a tag.
 *
 * @generator
 * @param id
 * @yields {object} - A response from a call to the API.
 * @function parseMessage - returns a parsed res.data.message.
 * @yields {action} - A toast success message.
 * @yields {action} - A redux action to set server message state.
 * @yields {action} - A redux action to refetch tags.
 * @throws {action} - A toast error message.
 */
export function* deleteTag({
  payload
}: ReturnType<typeof actions.deleteTag>): SagaIterator {
  try {
    yield put(resetMessage());

    const res = yield call(app.delete, `tags/delete/${payload}`);
    const message = yield call(parseMessage, res);

    yield call(toast, { type: "success", message });

    yield put(setMessage(message));

    yield call(fetchTags);
  } catch (e) {
    yield call(showError, e.toString());
  }
}

/**
 * Attempts to seed DB with fake tags.
 *
 * @generator
 * @yields {object} - A response from a call to the API.
 * @function parseData - returns a parsed res.data.
 * @yields {action} -  A redux action to set tags to redux state.
 * @throws {action} - A toast error message.
 */
export function* seedDB(): SagaIterator {
  try {
    yield put(resetMessage());

    const res = yield call(app.post, "tags/seed");
    const data = yield call(parseData, res);

    yield put(setTags(data));
  } catch (e) {
    yield call(showError, e.toString());
  }
}

/**
 * Attempts to update a new tag.
 *
 * @generator
 * @param {object} - props contain tag data and id is tag id.
 * @yields {object} - A response from a call to the API.
 * @function parseMessage - returns a parsed res.data.message.
 * @yields {action} - A redux action to display a server message by type.
 * @yields {action} - A redux action to set server message state.
 * @yields {action} - A redux action to fetch tags.
 * @throws {action} - A redux action to display a server message by type.
 */
export function* updateTag({
  payload
}: ReturnType<typeof actions.updateTag>): SagaIterator {
  try {
    yield put(resetMessage());

    const res = yield call(app.put, `tags/update/${payload?._id}`, payload);
    const message = yield call(parseMessage, res);

    yield call(toast, { type: "info", message });

    yield put(setMessage(message));

    yield call(fetchTags);
  } catch (e) {
    yield call(showError, e.toString());
  }
}

/**
 * Creates watchers for all generators.
 *
 * @generator
 * @function authSagas
 * @yields {watchers}
 */
export default function* authSagas(): SagaIterator {
  yield all([
    takeLatest(constants.TAGS_CREATE, createTag),
    takeLatest(constants.TAGS_DELETE, deleteTag),
    takeLatest(constants.TAGS_FETCH, fetchTags),
    takeLatest(constants.TAGS_SEED, seedDB),
    takeLatest(constants.TAGS_UPDATE, updateTag)
  ]);
}
