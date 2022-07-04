import { createWebHistory, createRouter } from "vue-router";
const routes = [
  {
    path: "/",
    alias: "/surveys",
    name: "surveys",
    component: () => import("./views/SurveysList.vue")
  },
  {
    path: "/add",
    name: "add",
    component: () => import("./views/AddAlbum.vue")
  },
  {
    path: "/view/:id",
    name: "view",
    component: () => import("./views/ViewAlbum.vue"),
    props: true
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./views/Login.vue")
  },
];
const router = createRouter({
  base: process.env.NODE_ENV === 'development' ? '/' : '/survey-frontend-user/',
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
