import React, { ChangeEvent, Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./home.styles.scss";

import NewestPost from "../../components/bigPost/bigPost.component";
import PostCard from "../../components/postCard/postCard.component";
import Spinner from "../../components/spinner/spinner.component";

import {
  selectBlogsIsLoading,
  selectBlogsMap,
} from "../../store/blogs/blogs.selector";
import { selectCurrentUser } from "../../store/user/user.selector";
import { updatePost } from "../../store/blogs/blogs.actions";
import { BlogItem } from "../../store/blogs/blogs.types";
import { changePost, isChangesPost } from "../../utils/general";
import SearchBar from "../../components/searchBox/search.component";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchField, setSearchField] = useState("");
  const [blogsArray, setBlogsArray] = useState<BlogItem[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<BlogItem[]>([]);

  const blogMap = useSelector(selectBlogsMap);
  const isLoading = useSelector(selectBlogsIsLoading);
  const currentUser = useSelector(selectCurrentUser);

  let firstPost: BlogItem;

  useEffect(() => {
    let arrayT: BlogItem[] = [];
    // eslint-disable-next-line array-callback-return
    Object.keys(blogMap).map((email) => {
      arrayT.push(...blogMap[email].map((blog) => blog));
    });

    setBlogsArray(arrayT);
  }, [blogMap]);

  useEffect(() => {
    const newFilteredBlogs = blogsArray.filter((blog) => {
      return (
        blog.headline.toLowerCase().includes(searchField) ||
        blog.text.toLowerCase().includes(searchField)
      );
    });
    setFilteredBlogs(newFilteredBlogs);
  }, [searchField, blogsArray, setFilteredBlogs]);

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

  const onSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const searchFieldString = event.target.value.toLowerCase();
    setSearchField(searchFieldString);
  };

  return (
    <div className={"posts-container"}>
      <div className="search-bar">
        <SearchBar
          placeholder={"Search post"}
          onChangeHandler={onSearchChange}
        />
      </div>
      {isLoading || filteredBlogs.length === 0 ? (
        <Spinner />
      ) : (
        <Fragment>
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
        </Fragment>
      )}
    </div>

    // <button
    //   onClick={(e) => addCollectionAndDocuments("blogs", dataPosts)}
    // ></button>
  );
};

export default Home;
