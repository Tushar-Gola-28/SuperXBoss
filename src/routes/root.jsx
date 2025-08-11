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
import { UserHandle } from '../pages/user/user-handle'
import { RoleHandler } from '../pages/role-and-permission/role-handler'
import { ShippingHandler } from '../pages/shipping/shipping-handler'
import { CouponHandler } from '../pages/coupon/coupon-handler'
import { BannerHandler } from '../pages/banner/banner-handler'
import { NotificationHandler } from '../pages/notification/notification-handler'
import { SegmentPage } from '../pages/segment/segment-page'
import { VehiclesPage } from '../pages/brands/vehicle-page'
import { UnitPage } from '../pages/units/unit-page'
import { VehicleAssignPage } from '../pages/product/vehicle-assign-page'
import { OrderDetailsPage } from '../pages/order/order-details-page'
import { ChargesPage } from '../pages/Charges/charges-page'

export const root = [
  {
    path: urls.BASE_URL,
    element: <LoadingCallBack />
  },
  {
    path: urls.LOGIN,
    element: (
      <AuthGuard url={urls.DASHBOARD} requiresAuth={false}>
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
        path: urls.UNITS,
        children: [
          {
            index: true,
            element: <UnitPage />
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

          {
            path: urls.VEHICLE,
            element: <></>
          },
          {
            path: urls.VEHICLE_HANDLE,
            element: <VehiclesPage />
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
          {
            path: urls?.PRODUCTS_HANDLER_UPDATE,
            element: <ProductHandlePage />
          },
          {
            path: urls?.ASSIGN_VEHICLE_HANDLE,
            element: <VehicleAssignPage />
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
          {
            path: urls.USER_HANDLER,
            element: <UserHandle />
          },
          {
            path: urls.USER_HANDLER_UPDATE,
            element: <UserHandle />
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
          {
            path: urls.ROLE_HANDLER,
            element: <RoleHandler />
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
          {
            path: urls.SHIPPING_HANDLER,
            element: <ShippingHandler />
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
          {
            path: urls.ORDERS_ID,
            element: <OrderDetailsPage />
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
          {
            path: urls.NOTIFICATION_HANDLER,
            element: <NotificationHandler />
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
          {
            path: urls.COUPON_HANDLER,
            element: <CouponHandler />
          },
          {
            path: urls.COUPON_HANDLER_UPDATE,
            element: <CouponHandler />
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
        path: urls.CHARGES,
        children: [
          {
            index: true,
            element: <ChargesPage />
          },
        ]
      },
      {
        path: urls.SEGMENT,
        children: [
          {
            index: true,
            element: <SegmentPage />
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
          {
            path: urls.BANNER_HANDLER,
            element: <BannerHandler />
          },
          {
            path: urls.BANNER_HANDLER_UPDATE,
            element: <BannerHandler />
          },
        ]
      },

    ]
  }
]
