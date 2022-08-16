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
  (categories): BlogMap =>
    categories.reduce((acc, category) => {
      const { email, items } = category;
      acc[email.toLowerCase()] = items;
      return acc;
    }, {} as BlogMap)
);
