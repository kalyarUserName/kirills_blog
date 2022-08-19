import { takeLatest, all, call, put } from "typed-redux-saga/macro";

import { fetchBlogsFailed, fetchBlogsSuccess } from "./blogs.actions";
import { BLOGS_ACTION_TYPES } from "./blogs.types";
import { getBlogsAndDocuments } from "../../utils/firebase/firebase.utils";

export function* fetchBlogsAsync() {
  try {
    const blogsArray = yield* call(getBlogsAndDocuments);
    yield* put(fetchBlogsSuccess(blogsArray));
  } catch (error) {
    yield* put(fetchBlogsFailed(error as Error));
  }
}

export function* onfetchBlogs() {
  yield* takeLatest(BLOGS_ACTION_TYPES.FETCH_BLOGS_START, fetchBlogsAsync);
}

export function* blogsSagas() {
  yield* all([call(onfetchBlogs)]);
}
