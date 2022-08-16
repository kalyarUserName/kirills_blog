import { UserForDisplay } from "../../utils/firebase/firebase.utils";

export enum BLOGS_ACTION_TYPES {
  FETCH_BLOGS_START = "blogs/FETCH_BLOGS_START",
  FETCH_BLOGS_SUCCESS = "blogs/FETCH_BLOGS_SUCCESS",
  FETCH_BLOGS_FAILED = "blogs/FETCH_BLOGS_FAILED",
}

export type BlogItem = {
  id: string;
  headline: string;
  imageUrl: string;
  text: string;
  textPreview: string;
  user: UserForDisplay;
  date: string;
};
export type Blog = { email: string; items: BlogItem[] };

export type BlogMap = {
  [key: string]: BlogItem[];
};
