import React, { useEffect, useState } from "react";
import { Header } from "owenmerry-designsystem";
import Router from "next/router";
import { siteSettings } from "../helpers/settings";
import { fetchData } from "../helpers/general";

const Menu = (props) => {
  const [stateLogin, setStateLogin] = useState(props.loggedin || false);
  //console.log(props);
  useEffect(() => {
    getMenu();
  }, [stateLogin]);

  const isLoggedIn = async () => {
    const res = await fetchData(`${siteSettings.apiWebsite}/api/user/loggedin`);
    return res;
  };

  const getMenu = async () => {
    const login = await isLoggedIn();
    const logClient =
      (typeof window !== "undefined" && sessionStorage.loggedin) || false;
    console.log(logClient);
    if (login.loggedin) {
      setStateLogin(true);
    }
  };

  const menuClicked = async (data) => {
    if (data.ref === "logout") {
      const res = await fetchData(`${siteSettings.apiWebsite}/api/user/logout`);
      sessionStorage.loggedin = false;
      setStateLogin(false);
      Router.push("/");
    } else {
      Router.push(data.ref);
    }
  };

  return (
    <React.Fragment>
      <style jsx global>
        {`
          html,
          body,
          textarea {
            font-family: "Source Sans Pro", sans-serif;
            margin: 0px;
            padding: 0px;
          }
          a {
            text-decoration: none;
          }
        `}
      </style>
      <Header
        logoURL="/webshare-logo-blue.svg"
        shadow
        menuSettings={{
          light: true,
          align: "right",
          seperator: "bordertop",
          items: [
            stateLogin && {
              name: "My Links",
              ref: "/links",
              selected: props.page === "links",
            },
            stateLogin && {
              name: "My Collections",
              ref: "/collections",
              selected: props.page === "collections",
            },
            stateLogin && { name: "Logout", ref: "logout" },
            !stateLogin && {
              name: "Login",
              ref: "/login",
              selected: props.page === "login",
            },
            !stateLogin && {
              name: "Create Account",
              ref: "/signup",
              selected: props.page === "signup",
            },
          ],
        }}
        menuClicked={menuClicked}
        backgroundColor="white"
      />
    </React.Fragment>
  );
};

export default Menu;
