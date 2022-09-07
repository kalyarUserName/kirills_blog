import React, { ChangeEvent, Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./home.styles.scss";

import NewestPost from "../../components/bigPost/bigPost.component";
import PostCard from "../../components/postCard/postCard.component";
import Spinner from "../../components/spinner/spinner.component";
import SearchBar from "../../components/searchBox/search.component";

import {
  selectAllPosts,
  selectBlogsIsLoading,
} from "../../store/blogs/blogs.selector";
import { selectCurrentUser } from "../../store/user/user.selector";
import { deletePost, updatePost } from "../../store/blogs/blogs.actions";
import { BlogItem } from "../../store/blogs/blogs.types";
import {
  changePost,
  comparePostByDate,
  comparePostByRating,
  isChangesPost,
} from "../../utils/general";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchField, setSearchField] = useState("");
  const [blogsArray, setBlogsArray] = useState<BlogItem[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<BlogItem[]>([]);
  const [selectedOption, setSelectedOption] = useState("byDate");

  const isLoading = useSelector(selectBlogsIsLoading);
  const currentUser = useSelector(selectCurrentUser);
  const allPosts = useSelector(selectAllPosts);

  useEffect(() => {
    if (selectedOption === "byDate")
      setBlogsArray(allPosts.sort(comparePostByDate));
    if (selectedOption === "byRating")
      setBlogsArray(allPosts.sort(comparePostByRating));
  }, [allPosts, selectedOption]);

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

  const onSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const searchFieldString = event.target.value.toLowerCase();
    setSearchField(searchFieldString);
  };

  const onSaveChangesPost = (
    imagesUrl: string[],
    headline: string,
    text: string
  ) => {
    if (isChangesPost(filteredBlogs[0], imagesUrl, headline, text)) {
      dispatch(
        updatePost(changePost(filteredBlogs[0], imagesUrl, headline, text))
      );
    }
  };

  const onDeletePost = (postId: string) => {
    const deletingPost = filteredBlogs.find((post) => post.id === postId);
    if (deletingPost) {
      dispatch(deletePost(deletingPost));
      setFilteredBlogs(filteredBlogs.filter((post) => post.id !== postId));
    }
  };

  const handleOptionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedOption(value);
  };

  return (
    <div className={"posts-container"}>
      <div className="sort-container">
        <div className="search-bar">
          <SearchBar
            placeholder={"Search post"}
            onChangeHandler={onSearchChange}
          />
        </div>
        <select
          className={"select-container"}
          onChange={handleOptionChange}
          defaultValue={"byDate"}
        >
          <option value="byDate">Sort by date</option>
          <option value="byRating">Sort by rating</option>
        </select>
        {/*<fieldset className={"select-container"}>*/}
        {/*  <legend>Please select type of sorting</legend>*/}
        {/*  <FormInput*/}
        {/*    label={"sort by date"}*/}
        {/*    value="byDate"*/}
        {/*    type="radio"*/}
        {/*    radioGroup="sort"*/}
        {/*    checked={selectedOption === "byDate"}*/}
        {/*    onChange={handleOptionChange}*/}
        {/*  />*/}
        {/*  <FormInput*/}
        {/*    label={"sort by rating"}*/}
        {/*    value="byRating"*/}
        {/*    type="radio"*/}
        {/*    radioGroup="sort"*/}
        {/*    checked={selectedOption === "byRating"}*/}
        {/*    onChange={handleOptionChange}*/}
        {/*  />*/}
        {/*</fieldset>*/}
      </div>
      {isLoading || filteredBlogs.length === 0 ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className="newest-post">
            <NewestPost
              key={filteredBlogs[0].id}
              id={filteredBlogs[0].id}
              images={filteredBlogs[0].imagesUrl}
              headline={filteredBlogs[0].headline}
              date={filteredBlogs[0].date.slice(0, 10)}
              text={filteredBlogs[0].text}
              user={filteredBlogs[0].user}
              toNavigate={redirectToBlog}
              currentUser={currentUser}
              onSavePost={onSaveChangesPost}
              onDeletePost={onDeletePost}
            />
            <hr />
          </div>
          <div className="post-list" id={"post-list"}>
            {filteredBlogs.slice(1).map((post) => {
              return (
                <PostCard
                  key={post.id}
                  id={post.id}
                  headline={post.headline}
                  text={post.text}
                  textPreview={post.textPreview}
                  images={post.imagesUrl}
                  toNavigate={redirectToBlog}
                  currentUser={currentUser}
                  user={post.user}
                  onSavePost={onSaveChangesPost}
                  onDeletePost={onDeletePost}
                />
              );
            })}
          </div>
        </Fragment>
      )}
    </div>

    // <button
    //   onClick={(e) => addCollectionAndDocuments("blogs", dataPosts)}
    // ></button>
  );
};

export default Home;
