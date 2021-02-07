import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import CountryDetail from '../views/CountryDetail.vue'
import TransitionAnim from "../components/TransitionAnim.vue";
;
const routes = [
  {
    path: "/transition",
    name: "TransitionAnim",
    component: TransitionAnim,
  },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/country/:countryname",
    name: "CountryDetail",
    component: CountryDetail,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
