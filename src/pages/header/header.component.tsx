import { useEffect, Fragment, useState, ChangeEvent } from "react";
import { Link, Outlet } from "react-router-dom";

import SearchBar from "../../components/searchBox/search.component";

import "./header.scss";

const Header = () => {
  const [currentUser, setCurrentUser] = useState(false);
  const [searchField, setSearchField] = useState("");

  const signOut = () => {
    setCurrentUser(false);
  };
  useEffect(() => {}, [searchField]);
  // const signIn = () => {
  //   setCurrentUser(true);
  // };

  const onSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const searchFieldString = event.target.value.toLowerCase();
    setSearchField(searchFieldString);
  };

  return (
    <Fragment>
      <div className={"headerContainer"}>
        <div className={"logoContainer"}>
          <Link to={"/"}>LOGO</Link>
        </div>

        <div className={"navLinks"}>
          <Link className={"navLink"} to={"/"}>
            HOME
          </Link>
          <Link className={"navLink"} to={"/blog"}>
            BLOG
          </Link>
          <Link className={"navLink"} to={"/new-post"}>
            NEW POST
          </Link>
          {currentUser ? (
            <a className={"navLink"} onClick={signOut}>
              SIGN OUT
            </a>
          ) : (
            <Link className={"navLink"} to={"/sign"}>
              SIGN IN
            </Link>
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
