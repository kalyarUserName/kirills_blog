import React, {
  useEffect,
  Fragment,
  useState,
  ChangeEvent,
  FC,
  SetStateAction,
} from "react";
import { Link, Outlet } from "react-router-dom";

import SearchBar from "../../components/searchBox/search.component";

import "./header.scss";
import { selectCurrentUser } from "../../store/user/user.selector";
import { signOutStart } from "../../store/user/user.actions";
import { useSelector, useDispatch } from "react-redux";
import { BlogItem } from "../../store/blogs/blogs.types";
import { selectBlogsMap } from "../../store/blogs/blogs.selector";
type HeaderProps = {
  setFilteredBlogs: React.Dispatch<SetStateAction<BlogItem[]>>;
};

const Header: FC<HeaderProps> = ({ setFilteredBlogs }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const blogMap = useSelector(selectBlogsMap);
  const [searchField, setSearchField] = useState("");

  const [blogsArray, setBlogsArray] = useState<BlogItem[]>([]);

  const signOutUser = () => {
    dispatch(signOutStart());
  };

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

  const onSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const searchFieldString = event.target.value.toLowerCase();
    setSearchField(searchFieldString);
  };

  return (
    <Fragment>
      <div className={"headerContainer"}>
        <div className={"logoContainer"}>
          <Link to={"/"}>
            <img src="/logo2.png" alt={"logo"} />
          </Link>
        </div>

        <div className={"navLinks"}>
          <Link className={"navLink"} to={"/"}>
            HOME
          </Link>
          <Link className={"navLink"} to={"/blog"}>
            BLOG
          </Link>
          {currentUser ? (
            <Fragment>
              <Link className={"navLink"} to={"/new-post"}>
                NEW POST
              </Link>
              <a className={"navLink"} onClick={signOutUser}>
                SIGN OUT
              </a>
            </Fragment>
          ) : (
            <Fragment>
              <Link className={"navLink"} to={"/sign-in"}>
                SIGN IN
              </Link>
              <Link className={"navLink"} to={"/sign-up"}>
                SIGN UP
              </Link>
            </Fragment>
          )}
          <SearchBar
            placeholder={"Search post"}
            onChangeHandler={onSearchChange}
          />
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Header;
