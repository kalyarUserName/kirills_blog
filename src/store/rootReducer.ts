import { combineReducers } from "redux";

import { userReducer } from "./user/user.reducer";
import { blogsReducer } from "./blogs/blogs.reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  blogs: blogsReducer,
});
