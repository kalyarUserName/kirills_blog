import { RootState } from "../store";
import { BlogsState } from "./blogs.reducer";
import { createSelector } from "reselect";
import { BlogMap } from "./blogs.types";

const selectBlogReducer = (state: RootState): BlogsState => state.blogs;

export const selectBlogs = createSelector(
  [selectBlogReducer],
  (blogsSlice) => blogsSlice.blogs
);

export const selectBlogsIsLoading = createSelector(
  [selectBlogReducer],
  (blogsSlice) => blogsSlice.isLoading
);

export const selectBlogsMap = createSelector(
  [selectBlogs],
  (blogs): BlogMap =>
    blogs.reduce((acc, blog) => {
      if (blog.email && blog.items) {
        const { email, items } = blog;
        acc[email.toLowerCase()] = items;
      }
      return acc;
    }, {} as BlogMap)
);
