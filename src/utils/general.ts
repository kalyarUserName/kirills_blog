import { BlogItem } from "../store/blogs/blogs.types";

export function dateToString(date: Date): string {
  return `${date.getMonth()}-${date.getDate()}-${date.getFullYear()}`;
}

export function isChangesPost(
  post: BlogItem,
  newImageUrl: string,
  newHeadline: string,
  newText: string
): boolean {
  return !(
    post.headline === newHeadline &&
    post.imageUrl === newImageUrl &&
    post.text === newText
  );
}

export function changePost(
  post: BlogItem,
  newImageUrl: string,
  newHeadline: string,
  newText: string
): BlogItem {
  return {
    ...post,
    imageUrl: newImageUrl,
    headline: newHeadline,
    text: newText,
  };
}
