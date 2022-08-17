import { AnyAction } from "redux";

import { Blog, BlogItem } from "./blogs.types";
import {
  fetchBlogsFailed,
  fetchBlogsStart,
  fetchBlogsSuccess,
  addNewPost,
  updatePost,
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
  if (updatePost.match(action)) {
    let blogIndex = state.blogs.findIndex(
      (blog) => blog.email === action.payload.user.email
    );

    let postIndex = -2;
    if (blogIndex !== -1)
      postIndex = state.blogs[blogIndex].items.findIndex(
        (post) => post.id === action.payload.id
      );

    if (postIndex >= 0)
      state.blogs[blogIndex].items[postIndex] = action.payload;

    return state;
  }

  if (addNewPost.match(action)) {
    let blogIndex = state.blogs.findIndex(
      (blog) => blog.email === action.payload.user.email
    );
    if (blogIndex >= 0) state.blogs[blogIndex].items.unshift(action.payload);
    return state;
  }

  return state;
};
