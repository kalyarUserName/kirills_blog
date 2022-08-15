import { RootState } from "../store";
import { BlogsState } from "./blogs.reducer";
import { createSelector } from "reselect";

const selectBlogReducer = (state: RootState): BlogsState => state.blogs;

export const selectBlogs = createSelector(
  [selectBlogReducer],
  (blogsSlice) => blogsSlice.blogs
);

export const selectBlogsIsLoading = createSelector(
  [selectBlogReducer],
  (blogsSlice) => blogsSlice.isLoading
);
