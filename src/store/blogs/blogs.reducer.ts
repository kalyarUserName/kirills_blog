import { AnyAction } from "redux";

import { Blog } from "./blogs.types";
import {
  fetchBlogsFailed,
  fetchBlogsStart,
  fetchBlogsSuccess,
} from "./blogs.actions";

export type BlogsState = {
  readonly blogs: Blog[];
  readonly isLoading: boolean;
  readonly error: Error | null;
};

export const BLOGS_INITIAL_STATE: BlogsState = {
  blogs: [],
  isLoading: false,
  error: null,
};

export const blogsReducer = (
  state = BLOGS_INITIAL_STATE,
  action: AnyAction
): BlogsState => {
  if (fetchBlogsStart.match(action)) {
    return { ...state, isLoading: true };
  }
  if (fetchBlogsSuccess.match(action)) {
    return { ...state, blogs: action.payload, isLoading: false };
  }
  if (fetchBlogsFailed.match(action)) {
    return { ...state, error: action.payload, isLoading: false };
  }

  return state;
};
