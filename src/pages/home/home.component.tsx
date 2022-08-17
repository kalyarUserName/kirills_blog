import React, { Fragment } from "react";
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

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const blogsMap = useSelector(selectBlogsMap);
  const isLoading = useSelector(selectBlogsIsLoading);
  const currentUser = useSelector(selectCurrentUser);

  const redirectToBlog = (id: string) => {
    navigate("/blog/" + id);
  };

  const onSaveChangesPost = (
    imageUrl: string,
    headline: string,
    text: string
  ) => {
    //
  };

  return (
    <Fragment>
      {isLoading ? (
        <Spinner />
      ) : (
        Object.keys(blogsMap).map((email) => {
          const blogs = blogsMap[email];

          return (
            <div className={"posts-container"} key={email}>
              <div className="newest-post">
                <NewestPost
                  key={blogs[0].id}
                  id={blogs[0].id}
                  image={blogs[0].imageUrl}
                  headline={blogs[0].headline}
                  date={blogs[0].date.slice(0, 10)}
                  text={blogs[0].textPreview}
                  user={blogs[0].user}
                  toNavigate={redirectToBlog}
                  currentUser={currentUser}
                  onSavePost={onSaveChangesPost}
                />
                <hr />
              </div>
              <div className="post-list">
                {blogs
                  .filter((post) => post !== blogs[0])
                  .map((post) => {
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
          );
        })
      )}
    </Fragment>
    // <button
    //   onClick={(e) => addCollectionAndDocuments("blogs", dataPosts)}
    // ></button>
  );
};

export default Home;
