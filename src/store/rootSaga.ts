import { all, call } from "typed-redux-saga/macro";

import { userSagas } from "./user/user.saga";
import { blogsSagas } from "./blogs/blogs.saga";

export function* rootSaga() {
  yield* all([call(userSagas), call(blogsSagas)]);
}
