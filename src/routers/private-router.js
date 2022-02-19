import Dashboard from "../pages/private/Dashboard/index";
import LowStock from "../pages/private/Low-stock";
import Merchents from "../pages/private/Merchents";
import OrderDraft from "../pages/private/Order-Draft";
import CreateOrder from "../pages/private/Order/index";
import Permissions from "../pages/private/Permissions";
import ProductDelivery from "../pages/private/Product-Delivery";
import ProductOrder from "../pages/private/Product-Order";
import ProductStock from "../pages/private/Product-Stock";
import ProductDetails from "../pages/private/Produect-Details";
import UpdateProfile from "../pages/private/Profile/UpdateProfile";
import Roles from "../pages/private/Roles";
import CreateRole from "../pages/private/Roles/Create-Role";
import Users from "../pages/private/users";
import WeeklyReport from "../pages/private/Report/WeeklyReport";
import UpdateRole from "../pages/private/Roles/Update-role";
import CreateUser from "../pages/private/users/CreateUser";
import UpdateUser from "../pages/private/users/UpdateUser";
import CreateMarchent from "../pages/private/Merchents/CreateMarchent";
import UpdateMarchent from "../pages/private/Merchents/UpdateMarchent";
import Page404 from "../pages/private/404";
import AddProductModel from "../pages/private/Merchents/addProductModel";

const PrivateRoutes = [
    {
        path: "/",
        name: "Dashboard",
        permission: "Dashboard Report",
        component: Dashboard,
        layout: "/",
        exact: true
    },
    {
        path: "create-order",
        name: "Create Order",
        permission: "Order - Creat",
        component: CreateOrder,
        layout: "/",
        exact: true
    },
    {
        path: "update-profile",
        name: "Update Profile",
        permission: "User - Profile | Update",
        component: UpdateProfile,
        layout: "/",
        exact: true
    },
    {
        path: "product-stock",
        name: "Product Stock",
        permission: 'Product - Stock',
        component: ProductStock,
        layout: "/",
        exact: true
    },
    {
        path: "product-order",
        name: "Product Order",
        permission: 'Product - Order',
        component: ProductOrder,
        layout: "/",
        exact: true
    },
    {
        path: "order-draft",
        name: "Order Draft",
        permission: 'Order - Draft',
        component: OrderDraft,
        layout: "/",
        exact: true
    },
    {
        path: "product-order-details/:orderId",
        name: "Product Details",
        permission: 'Product - Order',
        component: ProductDetails,
        layout: "/",
        exact: true
    },
    {
        path: "low-stock",
        name: "Low Stock",
        permission: 'Product - Low Stock',
        component: LowStock,
        layout: "/",
        exact: true
    },
    {
        path: "product-delivery",
        name: "Product Delivery",
        permission: 'Product - Delivery',
        component: ProductDelivery,
        layout: "/",
        exact: true
    },
    {
        path: "weekly-report",
        name: "Weekly Report",
        permission: 'Weekly Report',
        component: WeeklyReport,
        layout: "/",
        exact: true
    },
    {
        path: "users",
        name: "Users",
        permission: 'User - List',
        component: Users,
        layout: "/",
        exact: true
    },
    {
        path: "users-create",
        name: "Users Create",
        permission: 'User - Creat',
        component: CreateUser,
        layout: "/",
        exact: true
    },
    {
        path: "update-user/:userId",
        name: "Users Update",
        permission: 'User - Update',
        component: UpdateUser,
        layout: "/",
        exact: true
    },
    {
        path: "merchents",
        name: "Merchents",
        permission: 'Merchant - List',
        component: Merchents,
        layout: "/",
        exact: true
    },
    {
        path: "create-merchents",
        name: "Merchents Create",
        permission: 'Merchant - Creat',
        component: CreateMarchent,
        layout: "/",
        exact: true
    },
    {
        path: "update-merchents/:marchentId",
        name: "Merchents Update",
        permission: 'Merchant - Update',
        component: UpdateMarchent,
        layout: "/",
        exact: true
    },
    {
        path: "permissionts",
        name: "Permissionts",
        permission: 'Permission - List',
        component: Permissions,
        layout: "/",
        exact: true
    },
    {
        path: "roles",
        name: "Roles",
        permission: 'Role - List',
        component: Roles,
        layout: "/",
        exact: true
    },
    {
        path: "create-role",
        name: "Create Role",
        permission: 'Role - Creat',
        component: CreateRole,
        layout: "/",
        exact: true
    },
    {
        path: "update-role/:roleId",
        name: "Update Role",
        permission: 'Role - Update',
        component: UpdateRole,
        layout: "/",
        exact: true
    },
    {
        path: "page-404",
        name: "page 404",
        component: Page404,
        layout: "/",
        exact: true
    },
    {
        path: "update-merchents-product-model/:marchentId",
        name: "Merchents Update product model",
        permission: 'Merchant - Mapping Products',
        component: AddProductModel,
        layout: "/",
        exact: true
    },
];

export default PrivateRoutes;