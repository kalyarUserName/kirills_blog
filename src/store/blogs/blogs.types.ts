import { UserForDisplay } from "../../utils/firebase/firebase.utils";

export enum BLOGS_ACTION_TYPES {
  FETCH_BLOGS_START = "blogs/FETCH_BLOGS_START",
  FETCH_BLOGS_SUCCESS = "blogs/FETCH_BLOGS_SUCCESS",
  FETCH_BLOGS_FAILED = "blogs/FETCH_BLOGS_FAILED",
  UPDATE_POST = "blogs/UPDATE_POST",
  ADD_NEW_COMMENT = "blogs/ADD_NEW_COMMENT",
  ADD_NEW_POST = "blogs/ADD_NEW_POST",
  DELETE_POST = "blogs/DELETE_POST",
}

export type BlogItem = {
  id: string;
  headline: string;
  imagesUrl: string[];
  text: string;
  textPreview: string;
  user: UserForDisplay;
  date: string;
  comments?: Comment[];
};
export type Blog = { email: string; items: BlogItem[] };

export type BlogMap = {
  [key: string]: BlogItem[];
};

export type Comment = {
  id: string;
  user: UserForDisplay;
  text: string;
  date: string;
};
