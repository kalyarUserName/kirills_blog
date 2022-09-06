import { AnyAction } from "redux";

import { Blog } from "./blogs.types";
import {
  fetchBlogsFailed,
  fetchBlogsStart,
  fetchBlogsSuccess,
  addNewPost,
  updatePost,
  deletePost,
} from "./blogs.actions";
import { setBlogs } from "../../utils/firebase/firebase.utils";
import { findPostIndexInBlogs } from "../../utils/general";
import { signOutSuccess } from "../user/user.actions";

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
    let blogIndex = findPostIndexInBlogs(state.blogs, action.payload);
    let postIndex = -2;

    if (blogIndex !== -1)
      postIndex = state.blogs[blogIndex].items.findIndex(
        (post) => post.id === action.payload.id
      );

    if (postIndex >= 0) {
      state.blogs[blogIndex].items[postIndex] = action.payload;
      setBlogs(action.payload.user.email, state.blogs[blogIndex].items);
    }
    return state;
  }

  if (addNewPost.match(action)) {
    let blogIndex = findPostIndexInBlogs(state.blogs, action.payload);

    if (blogIndex >= 0) {
      state.blogs[blogIndex].items.unshift(action.payload);
    } else {
      state.blogs.push({
        email: action.payload.user.email.toLowerCase(),
        items: [action.payload],
      });

      blogIndex = state.blogs.findIndex(
        (blog) => blog.email === action.payload.user.email
      );
    }
    setBlogs(action.payload.user.email, state.blogs[blogIndex].items);
    return state;
  }

  if (deletePost.match(action)) {
    let blogIndex = findPostIndexInBlogs(state.blogs, action.payload);
    if (blogIndex >= 0) {
      state.blogs[blogIndex].items = Object.assign(
        [],
        state.blogs[blogIndex].items.filter(
          (post) => post.id !== action.payload.id
        )
      );
      setBlogs(action.payload.user.email, state.blogs[blogIndex].items);
    }
  }

  if (signOutSuccess.match(action)) {
    return { ...state, error: null };
  }
  return state;
};
