import Vue from 'vue'
import Router from 'vue-router'
import Seller from 'components/seller/Seller'
import Goods from 'components/goods/Goods'
import Ratings from 'components/ratings/Ratings'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/seller',
      component: Seller
    },
    {
      path: '/goods',
      component: Goods
    },
    {
      path: '/ratings',
      component: Ratings
    }
  ],
  linkActiveClass: 'active'
})
