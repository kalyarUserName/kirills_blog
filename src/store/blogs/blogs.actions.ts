import {
  createAction,
  Action,
  ActionWithPayload,
  withMatcher,
} from "../../utils/reducer/reducer.utils";

import { Blog, BlogItem, BLOGS_ACTION_TYPES } from "./blogs.types";

export type FetchBlogsStart = Action<BLOGS_ACTION_TYPES.FETCH_BLOGS_START>;

export type FetchBlogsSuccess = ActionWithPayload<
  BLOGS_ACTION_TYPES.FETCH_BLOGS_SUCCESS,
  Blog[]
>;

export type FetchBlogsFailed = ActionWithPayload<
  BLOGS_ACTION_TYPES.FETCH_BLOGS_FAILED,
  Error
>;

export type UpdatePost = ActionWithPayload<
  BLOGS_ACTION_TYPES.UPDATE_POST,
  BlogItem
>;

export type AddNewPost = ActionWithPayload<
  BLOGS_ACTION_TYPES.ADD_NEW_POST,
  BlogItem
>;

export type AddNewComment = ActionWithPayload<
  BLOGS_ACTION_TYPES.ADD_NEW_COMMENT,
  Comment[]
>;

export const fetchBlogsStart = withMatcher(
  (): FetchBlogsStart => createAction(BLOGS_ACTION_TYPES.FETCH_BLOGS_START)
);

export const fetchBlogsSuccess = withMatcher(
  (blogsArray: Blog[]): FetchBlogsSuccess =>
    createAction(BLOGS_ACTION_TYPES.FETCH_BLOGS_SUCCESS, blogsArray)
);

export const fetchBlogsFailed = withMatcher(
  (error: Error): FetchBlogsFailed =>
    createAction(BLOGS_ACTION_TYPES.FETCH_BLOGS_FAILED, error)
);

export const updatePost = withMatcher(
  (updatedPost: BlogItem): UpdatePost =>
    createAction(BLOGS_ACTION_TYPES.UPDATE_POST, updatedPost)
);
export const addNewPost = withMatcher(
  (newPost: BlogItem): AddNewPost =>
    createAction(BLOGS_ACTION_TYPES.ADD_NEW_POST, newPost)
);
