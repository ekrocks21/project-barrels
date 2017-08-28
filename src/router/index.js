import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home/Home'
import Signup from '@/components/User/Signup'
import Signin from '@/components/User/Signin'
import About from '@/components/Footer/About'
import Categories from '@/components/Categories/Categories'
import Household from '@/components/Categories/Household'
import Health from '@/components/Categories/Health'
import Arts from '@/components/Categories/Arts'
import Kids from '@/components/Categories/Kids'
import Electronics from '@/components/Categories/Electronics'
import Outdoors from '@/components/Categories/Outdoors'
import FeaturedShops from '@/components/Featured/FeaturedShops'
import CreateShop from '@/components/Shop/CreateShop'
import AuthGuard from './auth-guard'
import Profile from '@/components/User/Profile'
import Shop from '@/components/Shop/Shop'
import Shops from '@/components/Shop/Shops'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/profile/:id',
      name: 'Profile',
      component: Profile,
      props: true,
      beforeEnter: AuthGuard
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/categories',
      name: 'Categories',
      component: Categories
    },
    {
      path: '/household',
      name: 'Household',
      component: Household
    },
    {
      path: '/health',
      name: 'Health',
      component: Health
    },
    {
      path: '/arts',
      name: 'Arts',
      component: Arts
    },
    {
      path: '/kids',
      name: 'Kids',
      component: Kids
    },
    {
      path: '/electronics',
      name: 'Electronics',
      component: Electronics
    },
    {
      path: '/outdoors',
      name: 'Outdoors',
      component: Outdoors
    },
    {
      path: '/featuredshops',
      name: 'FeaturedShops',
      component: FeaturedShops
    },
    {
      path: '/createshop',
      name: 'CreateShop',
      component: CreateShop,
      beforeEnter: AuthGuard
    },
    {
      path: '/shops',
      name: 'Shops',
      component: Shops
    },
    {
      path: '/shops/:id',
      name: 'Shop',
      props: true,
      component: Shop
    }
  ],
  mode: 'history'
})
