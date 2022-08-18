import React, { FC, Fragment } from "react";
import { useNavigate } from "react-router-dom";

import NewestPost from "../../components/bigPost/bigPost.component";
import PostCard from "../../components/postCard/postCard.component";

import "./home.styles.scss";

import { useDispatch, useSelector } from "react-redux";
import {
  selectBlogsIsLoading,
  selectBlogsMap,
} from "../../store/blogs/blogs.selector";

import Spinner from "../../components/spinner/spinner.component";
import { selectCurrentUser } from "../../store/user/user.selector";
import { BlogItem } from "../../store/blogs/blogs.types";
import { changePost, isChangesPost } from "../../utils/general";
import { updatePost } from "../../store/blogs/blogs.actions";

export type HomeProps = {
  filteredBlogs: BlogItem[];
};
const Home: FC<HomeProps> = ({ filteredBlogs }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoading = useSelector(selectBlogsIsLoading);
  const currentUser = useSelector(selectCurrentUser);

  let firstPost: BlogItem;

  const redirectToBlog = (id: string) => {
    navigate("/blog/" + id);
  };

  const onSaveChangesPost = (
    imageUrl: string,
    headline: string,
    text: string
  ) => {
    if (isChangesPost(firstPost, imageUrl, headline, text)) {
      dispatch(updatePost(changePost(firstPost, imageUrl, headline, text)));
      firstPost = changePost(firstPost, imageUrl, headline, text);
    }
  };

  return (
    <Fragment>
      {isLoading || filteredBlogs.length === 0 ? (
        <Spinner />
      ) : (
        <div className={"posts-container"}>
          <div className="newest-post">
            <NewestPost
              key={filteredBlogs[0].id}
              id={filteredBlogs[0].id}
              image={filteredBlogs[0].imageUrl}
              headline={filteredBlogs[0].headline}
              date={filteredBlogs[0].date.slice(0, 10)}
              text={filteredBlogs[0].textPreview}
              user={filteredBlogs[0].user}
              toNavigate={redirectToBlog}
              currentUser={currentUser}
              onSavePost={onSaveChangesPost}
            />
            <hr />
          </div>
          <div className="post-list">
            {filteredBlogs.slice(1).map((post) => {
              return (
                <PostCard
                  id={post.id}
                  key={post.id}
                  headline={post.headline}
                  textPreview={post.textPreview}
                  image={post.imageUrl}
                  toNavigate={redirectToBlog}
                />
              );
            })}
          </div>
          <hr />
        </div>
      )}
    </Fragment>
    // <button
    //   onClick={(e) => addCollectionAndDocuments("blogs", dataPosts)}
    // ></button>
  );
};

export default Home;
