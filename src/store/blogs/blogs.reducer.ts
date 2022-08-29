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
    // state.blogs.findIndex(
    //   (blog) => blog.email === action.payload.user.email
    // );

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
    // let blogIndex = state.blogs.findIndex(
    //   (blog) => blog.email === action.payload.user.email
    // );
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
    console.log("state1", state);
    let blogIndex = findPostIndexInBlogs(state.blogs, action.payload);
    console.log("blogIndex", blogIndex);
    if (blogIndex >= 0) {
      console.log(
        "state.blogs[blogIndex].items111",
        state.blogs[blogIndex].items
      );
      state.blogs[blogIndex].items = state.blogs[blogIndex].items.filter(
        (post) => post.id !== action.payload.id
      );
      console.log(
        "state.blogs[blogIndex].items111",
        state.blogs[blogIndex].items
      );
      setBlogs(action.payload.user.email, state.blogs[blogIndex].items);
    }
    console.log("state2", state);
  }
  return state;
};
