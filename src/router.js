import { createWebHistory, createRouter } from "vue-router";
const routes = [
  {
    path: "/",
    name: "surveyForm",
    component: () => import("./views/SurveyForm.vue")
  }
];
const router = createRouter({
  base: process.env.NODE_ENV === 'development' ? '/' : '/survey-frontend-user/',
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
