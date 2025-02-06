import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CheckoutView from '@/views/CheckoutView.vue'
import AccountManagementView from '@/views/AccountManagementView.vue'
import RedeemView from '@/views/RedeemView.vue'
import TransactionHistoryView from '@/views/TransactionHistoryView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: CheckoutView,
    },
    {
      path: '/redeem',
      name: 'redeem',
      component: RedeemView,
    },
    {
      path: '/transactions',
      name: 'transactions',
      component: TransactionHistoryView,
    },
    {
      path: '/account-management',
      name: 'account-management',
      component: AccountManagementView,
    },
  ],
})

export default router
