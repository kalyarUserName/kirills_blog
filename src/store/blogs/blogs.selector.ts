import { createSelector } from "reselect";

import { RootState } from "../store";
import { BlogsState } from "./blogs.reducer";
import { BlogMap } from "./blogs.types";

const selectBlogReducer = (state: RootState): BlogsState => state.blogs;

export const selectBlogs = createSelector([selectBlogReducer], (blogsSlice) =>
  blogsSlice.blogs.filter((blogs) => blogs.email && blogs.items)
);

export const selectBlogsMap = createSelector([selectBlogs], (blogs) =>
  blogs.reduce((acc, blog) => {
    if (blog.email && blog.items) {
      const { email, items } = blog;
      acc[email.toLowerCase()] = items;
    }
    return acc;
  }, {} as BlogMap)
);

export const selectBlogsIsLoading = createSelector(
  [selectBlogReducer],
  (blogsSlice) => blogsSlice.isLoading
);
