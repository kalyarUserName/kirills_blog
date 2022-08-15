export enum BLOGS_ACTION_TYPES {
  FETCH_BLOGS_START = "blogs/FETCH_BLOGS_START",
  FETCH_BLOGS_SUCCESS = "blogs/FETCH_BLOGS_SUCCESS",
  FETCH_BLOGS_FAILED = "blogs/FETCH_BLOGS_FAILED",
}

export type Blog = {
  id: string;
  headline: string;
  imageURL: string;
  text: string;
  textPreview: string;
};
