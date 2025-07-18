import { Outlet } from 'react-router'
import { urls } from './urls'

import { AuthGuard, LoadingCallBack } from '../helpers'
import { CategoriesPage, FaqPage, LoginPage, SubCategoriesPage, } from '../pages'
import { MainLayout } from '../layouts'
import { InformationPage } from '../pages/information'
import { WalletOfferPage } from '../pages/wallet-offer'
import { DashboardPage } from '../pages/dashboard'
import { BrandsPage } from '../pages/brands/brands-page'
import { ProductPage } from '../pages/product/product-page'
import { UserPage } from '../pages/user/user-page'
import { RoleAndPermissionPage } from '../pages/role-and-permission/role-and-permission-page'
import { CustomerPage } from '../pages/customer/customer-page'
import { ShippingPage } from '../pages/shipping/shipping-page'
import { OrderPage } from '../pages/order/order-page'
import { NotificationPage } from '../pages/notification/notification-page'
import { CouponPage } from '../pages/coupon/coupon-page'
import { BannerPage } from '../pages/banner/banner-page'
import { ProductHandlePage } from '../pages/product/product-handler-page'

export const root = [
  {
    path: urls.BASE_URL,
    element: <LoadingCallBack />
  },
  {
    path: urls.LOGIN,
    element: (
      <AuthGuard url={urls.BASE_URL} requiresAuth={false}>
        <Outlet />
      </AuthGuard>
    ),

    children: [
      {
        index: true,
        element: <LoginPage />,
        handle: {
          crumb: () => ({ label: 'Login Page' })
        },
      }
    ]
  },
  {
    path: urls.BASE_URL,
    element: (
      <AuthGuard url={urls.LOGIN} requiresAuth={true}>
        <MainLayout />
      </AuthGuard>
    ),
    // handle: {
    //   crumb: () => ({ label: 'Event Meta' })
    // },
    children: [
      {
        index: true,
        element: <></>,
      },
      {
        path: urls.CATEGORIES,
        children: [
          {
            index: true,
            element: <CategoriesPage />
          },
          {
            path: urls.SUB_CATEGORIES,
            element: <SubCategoriesPage />
          },
        ]
      },
      {
        path: urls.DASHBOARD,
        children: [
          {
            index: true,
            element: <DashboardPage />
          },
        ]
      },
      {
        path: urls.BRAND,
        children: [
          {
            index: true,
            element: <BrandsPage />
          },
        ]
      },
      {
        path: urls.PRODUCTS,
        children: [

          {
            index: true,
            element: <ProductPage />
          },
          {
            path: urls?.PRODUCTS_HANDLER,
            element: <ProductHandlePage />
          },
        ]
      },
      {
        path: urls.USERS,
        children: [
          {
            index: true,
            element: <UserPage />
          },
        ]
      },
      {
        path: urls.ROLE_AND_PERMISSION,
        children: [
          {
            index: true,
            element: <RoleAndPermissionPage />
          },
        ]
      },
      {
        path: urls.CUSTOMERS,
        children: [
          {
            index: true,
            element: <CustomerPage />
          },
        ]
      },
      {
        path: urls.SHIPPING,
        children: [
          {
            index: true,
            element: <ShippingPage />
          },
        ]
      },
      {
        path: urls.RECHARGE,
        children: [
          {
            index: true,
            element: <WalletOfferPage />
          },
        ]
      },
      {
        path: urls.ORDERS,
        children: [
          {
            index: true,
            element: <OrderPage />
          },
        ]
      },
      {
        path: urls.NOTIFICATION,
        children: [
          {
            index: true,
            element: <NotificationPage />
          },
        ]
      },
      {
        path: urls.FAQ,
        children: [
          {
            index: true,
            element: <FaqPage />
          },
        ]
      },
      {
        path: urls.COUPON,
        children: [
          {
            index: true,
            element: <CouponPage />
          },
        ]
      },
      {
        path: urls.INFORMATION,
        children: [
          {
            index: true,
            element: <InformationPage />
          },
        ]
      },
      {
        path: urls.BANNER,
        children: [
          {
            index: true,
            element: <BannerPage />
          },
        ]
      },

    ]
  }
]
