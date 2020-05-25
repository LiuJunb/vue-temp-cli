// import Login from './login.vue'
const Login = () => import(/* webpackChunkName: "login" */ './login.vue')
export default {
  path: '/login',
  name: 'login',
  pname: '', // 父亲路由的名称
  level: 1, // 一级路由
  component: Login,
  children: [
    // {
    //   path: 'goodslist', // /main/goodslist
    //   name: 'goodslist',
    //   component: GoodsList,
    //   children: [
    //     {
    //       path: 'create', // /main/goodslist/create
    //       name: 'create',
    //       component: GoodsListCreate
    //     }
    //   ]
    // }
  ]
}
