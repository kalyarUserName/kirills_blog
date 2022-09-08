import { Blog, BlogItem, BlogMap, Rating } from "../store/blogs/blogs.types";
import { setBlogs } from "./firebase/firebase.utils";

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
    textPreview: newText.slice(0, newText.indexOf(".")) + "...",
  };
}

export function findPostIndexInBlogs(blogs: Blog[], post: BlogItem): number {
  return blogs.findIndex((blog) => blog.email === post.user.email);
}

export function comparePostByDate(post1: BlogItem, post2: BlogItem): number {
  if (new Date(post1.date) > new Date(post2.date)) return -1;
  if (new Date(post1.date) === new Date(post2.date)) return 0;
  return 1;
}

export function comparePostByRating(post1: BlogItem, post2: BlogItem): number {
  const newPost1 = {
    ...post1,
    rating: post1.rating ? post1.rating : defaultRating,
  };
  const newPost2 = {
    ...post2,
    rating: post2.rating ? post2.rating : defaultRating,
  };

  if (newPost1.rating.count > newPost2.rating.count) return -1;
  if (newPost1.rating.count === newPost2.rating.count) return 0;
  return 1;
}

export const defaultRating: Rating = { count: 0, up: [], down: [] };
export function addToAllPostsRating(blogsMap: BlogMap): void {
  Object.keys(blogsMap).map(async (email) => {
    const blogs = blogsMap[email];
    if (blogs.length > 0) {
      let updatedBlogs = blogs.map((blog) => {
        return { ...blog, rating: defaultRating };
      });
      await setBlogs(email, updatedBlogs);
    }
  });
}

export function upRatingOfPost(
  rating: Rating | undefined,
  userEmail: string
): Rating {
  let newRating: Rating;
  if (rating) newRating = { ...rating };
  else newRating = defaultRating;
  if (newRating.up.findIndex((email) => email === userEmail) < 0) {
    newRating.down = newRating.down.filter((email) => email !== userEmail);
    newRating.up.unshift(userEmail);
    newRating.count = newRating.up.length - newRating.down.length;
  }
  return newRating;
}
export function downRatingOfPost(
  rating: Rating | undefined,
  userEmail: string
): Rating {
  let newRating: Rating;
  if (rating) newRating = { ...rating };
  else newRating = defaultRating;
  if (newRating.down.findIndex((email) => email === userEmail) < 0) {
    newRating.up = newRating.up.filter((email) => email !== userEmail);
    newRating.down.unshift(userEmail);
    newRating.count = newRating.up.length - newRating.down.length;
  }
  return newRating;
}
