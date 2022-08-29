import React, {
  ChangeEvent,
  Fragment,
  // useContext,
  useEffect,
  useState,
} from "react";
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
import { deletePost, updatePost } from "../../store/blogs/blogs.actions";
import { BlogItem } from "../../store/blogs/blogs.types";
import { changePost, isChangesPost } from "../../utils/general";
import SearchBar from "../../components/searchBox/search.component";
// import { ModalContext } from "../../context/modal.context";
// import PopupAgreement from "../../components/popupAgreement/popupAgreement.component";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { isModalOpen, setModalOpen, isConfirm, setConfirm } =
  //   useContext(ModalContext);

  const [searchField, setSearchField] = useState("");
  const [blogsArray, setBlogsArray] = useState<BlogItem[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<BlogItem[]>([]);

  const blogMap = useSelector(selectBlogsMap);
  const isLoading = useSelector(selectBlogsIsLoading);
  const currentUser = useSelector(selectCurrentUser);

  // let firstPost: BlogItem;

  useEffect(() => {
    // if (blogMap[0]) firstPost = blogMap[0][0];
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

  const onSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const searchFieldString = event.target.value.toLowerCase();
    setSearchField(searchFieldString);
  };

  const onSaveChangesPost = (
    imageUrl: string,
    headline: string,
    text: string
  ) => {
    if (isChangesPost(filteredBlogs[0], imageUrl, headline, text)) {
      dispatch(
        updatePost(changePost(filteredBlogs[0], imageUrl, headline, text))
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
          {/*{isModalOpen && (*/}
          {/*  <PopupAgreement*/}
          {/*    text={"qweqweq"}*/}
          {/*    closePopup={() => {*/}
          {/*      setModalOpen(false);*/}
          {/*    }}*/}
          {/*    confirm={() => {*/}
          {/*      setConfirm(true);*/}
          {/*    }}*/}
          {/*  />*/}
          {/*)}*/}
          <div className="newest-post">
            <NewestPost
              key={filteredBlogs[0].id}
              id={filteredBlogs[0].id}
              image={filteredBlogs[0].imageUrl}
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
          <div className="post-list">
            {filteredBlogs.slice(1).map((post) => {
              return (
                <PostCard
                  key={post.id}
                  id={post.id}
                  headline={post.headline}
                  textPreview={post.textPreview}
                  image={post.imageUrl}
                  toNavigate={redirectToBlog}
                  currentUser={currentUser}
                  user={post.user}
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
