 import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";
import { DefaultLayout1 } from "./layouts";

// Route Views
import BlogOverview from "./views/BlogOverview";
import UserProfileLite from "./views/UserProfileLite";
import AddNewPost from "./views/AddNewPost";
import Errors from "./views/Errors";
import ComponentsOverview from "./views/ComponentsOverview";
import Tables from "./views/Tables";
import NewsPosts from "./views/NewsPosts";
import OtherUserProfileLite from "./views/otheruserprofile";
import NewsFullPosts from "./views/newsfullpost";
import TrendingNews from "./views/trendingnews"
import Login from "./components/user-login/login"

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/news-posts" />
  },
  {
    path: "/blog-overview",
    layout: DefaultLayout,
    component: BlogOverview
  },
  {
    path: "/user-profile-lite",
    layout: DefaultLayout,
    component: UserProfileLite
  },
  {
    path: "/other-user-profile-lite",
    layout: DefaultLayout,
    component: OtherUserProfileLite
  },
  {
    path: "/add-new-post",
    layout: DefaultLayout,
    component: AddNewPost
  },
  {
    path: "/errors",
    layout: DefaultLayout,
    component: Errors
  },
  {
    path: "/components-overview",
    layout: DefaultLayout,
    component: ComponentsOverview
  },
  {
    path: "/tables",
    layout: DefaultLayout,
    component: Tables
  },
  {
    path: "/news-posts",
    layout: DefaultLayout,
    component: NewsPosts
  },
  {
    path: "/news-full-post",
    layout: DefaultLayout,
    component: NewsFullPosts
  },
  {
    path: "/trending-news",
    layout: DefaultLayout,
    component: TrendingNews
  },
  {
    path: "/login",
    layout: DefaultLayout1,
    component: Login
  }

];
