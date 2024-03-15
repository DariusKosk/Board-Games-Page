import { createRouter, createWebHistory } from 'vue-router';
import MainPage from "../views/MainPage.vue";
import ProfilePage from "../views/ProfilePage.vue";

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
    },

];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;