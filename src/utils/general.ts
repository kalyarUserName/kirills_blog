import { Blog, BlogItem } from "../store/blogs/blogs.types";

export function dateToString(date: Date): string {
  return `${date.getMonth()}-${date.getDate()}-${date.getFullYear()}`;
}

export function isChangesPost(
  post: BlogItem,
  newImagesUrl: string[],
  newHeadline: string,
  newText: string
): boolean {
  return !(
    post.headline === newHeadline &&
    JSON.stringify(post.imagesUrl) === JSON.stringify(newImagesUrl) &&
    post.text === newText
  );
}

export function changePost(
  post: BlogItem,
  newImagesUrl: string[],
  newHeadline: string,
  newText: string
): BlogItem {
  return {
    ...post,
    imagesUrl: newImagesUrl,
    headline: newHeadline,
    text: newText,
  };
}

export function findPostIndexInBlogs(blogs: Blog[], post: BlogItem): number {
  return blogs.findIndex((blog) => blog.email === post.user.email);
}
