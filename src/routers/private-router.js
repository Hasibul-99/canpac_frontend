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
import WeeklyReport from "../pages/private/WeeklyReport";

const PrivateRoutes = [
    {
        path: "/",
        name: "Dashboard",
        component: Dashboard,
        layout: "/",
        exact: true
    },
    {
        path: "create-order",
        name: "Create Order",
        component: CreateOrder,
        layout: "/",
        exact: true
    },
    {
        path: "update-profile",
        name: "Update Profile",
        component: UpdateProfile,
        layout: "/",
        exact: true
    },
    {
        path: "product-stock",
        name: "Product Stock",
        component: ProductStock,
        layout: "/",
        exact: true
    },
    {
        path: "product-order",
        name: "Product Order",
        component: ProductOrder,
        layout: "/",
        exact: true
    },
    {
        path: "order-draft",
        name: "Order Draft",
        component: OrderDraft,
        layout: "/",
        exact: true
    },
    {
        path: "product-details/:productId",
        name: "Product Details",
        component: ProductDetails,
        layout: "/",
        exact: true
    },
    {
        path: "low-stock",
        name: "Low Stock",
        component: LowStock,
        layout: "/",
        exact: true
    },
    {
        path: "product-delivery",
        name: "Product Delivery",
        component: ProductDelivery,
        layout: "/",
        exact: true
    },
    {
        path: "weekly-report",
        name: "Weekly Report",
        component: WeeklyReport,
        layout: "/",
        exact: true
    },
    {
        path: "users",
        name: "Users",
        component: Users,
        layout: "/",
        exact: true
    },
    {
        path: "merchents",
        name: "Merchents",
        component: Merchents,
        layout: "/",
        exact: true
    },
    {
        path: "permissionts",
        name: "Permissionts",
        component: Permissions,
        layout: "/",
        exact: true
    },
    {
        path: "roles",
        name: "Roles",
        component: Roles,
        layout: "/",
        exact: true
    },
    {
        path: "create-role",
        name: "Create Role",
        component: CreateRole,
        layout: "/",
        exact: true
    },
];

export default PrivateRoutes;