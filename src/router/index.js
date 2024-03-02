import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import MeetupsView from "../views/Meetup/MeetupsView.vue";
import CreateMeetups from "../views/Meetup/CreateMeetups.vue";
import MeetupView from "../views/Meetup/MeetupView.vue";
import ProfileView from "../views/User/ProfileView.vue";
import SignUp from "../views/User/SignUp.vue";
import SignIn from "../views/User/SignIn.vue";
// import AuthGuard from "./auth-guard.js";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/meetups",
    name: "Meetups",
    component: MeetupsView,
  },
  {
    path: "/meetup/new",
    name: "CreateMeetups",
    component: CreateMeetups,
    // beforeEnter: AuthGuard,
  },
  {
    path: "/meetups/:id",
    name: "Meetup",
    props: true,
    component: MeetupView,
  },
  {
    path: "/profile",
    name: "Profile",
    component: ProfileView,
    // beforeEnter: AuthGuard,
  },
  {
    path: "/signup",
    name: "Signup",
    component: SignUp,
  },
  {
    path: "/signin",
    name: "Signin",
    component: SignIn,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
