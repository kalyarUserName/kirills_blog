import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Outlet } from "react-router-dom";

import "./header.styles.scss";

import { selectCurrentUser } from "../../store/user/user.selector";
import { signOutStart } from "../../store/user/user.actions";

const Header = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  const signOutUser = () => {
    dispatch(signOutStart());
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
              <Link className={"navLink"} onClick={signOutUser} to={""}>
                SIGN OUT
              </Link>
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
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Header;
