import { useEffect, Fragment, useState, ChangeEvent } from "react";
import { Link, Outlet } from "react-router-dom";

import SearchBar from "../../components/searchBox/search.component";

import "./header.scss";
import { selectCurrentUser } from "../../store/user/user.selector";
import { signOutStart } from "../../store/user/user.actions";
import { useSelector, useDispatch } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const [searchField, setSearchField] = useState("");

  const signOutUser = () => {
    dispatch(signOutStart());
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
          <Link to={"/"}>
            <img src="./logo2.png" alt={"logo"} />
          </Link>
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
            <a className={"navLink"} onClick={signOutUser}>
              SIGN OUT
            </a>
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
