import {
  createAction,
  Action,
  ActionWithPayload,
  withMatcher,
} from "../../utils/reducer/reducer.utils";

import { Blog, BLOGS_ACTION_TYPES } from "./blogs.types";

export type FetchBlogsStart = Action<BLOGS_ACTION_TYPES.FETCH_BLOGS_START>;

export type FetchBlogsSuccess = ActionWithPayload<
  BLOGS_ACTION_TYPES.FETCH_BLOGS_SUCCESS,
  Blog[]
>;

export type FetchBlogsFailed = ActionWithPayload<
  BLOGS_ACTION_TYPES.FETCH_BLOGS_SUCCESS,
  Error
>;

export const fetchBlogsStart = withMatcher(() =>
  createAction(BLOGS_ACTION_TYPES.FETCH_BLOGS_START)
);

export const fetchBlogsSuccess = withMatcher((blogsArray: Blog[]) =>
  createAction(BLOGS_ACTION_TYPES.FETCH_BLOGS_SUCCESS, blogsArray)
);

export const fetchBlogsFailed = withMatcher((error: Error) =>
  createAction(BLOGS_ACTION_TYPES.FETCH_BLOGS_FAILED, error)
);
