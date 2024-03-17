import { createRouter, createWebHistory } from 'vue-router';
import MainPage from "../views/MainPage.vue";
import ProfilePage from "../views/ProfilePage.vue";
import AboutPage from "../views/AboutPage.vue";

const routes = [
    {
        path: '/',
        component: MainPage,
        meta: {
            title: "Home"
        }
    }, {
        path: '/Profile',
        component: ProfilePage,
        meta: {
            title: "Profile"
        }
    },{
        path: '/About',
        component: AboutPage,
        meta: {
            title: "About"
        }
    },

];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;