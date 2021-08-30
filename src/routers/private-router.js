import Dashboard from "../pages/private/Dashboard/index";
import OrderDraft from "../pages/private/Order-Draft";
import CreateOrder from "../pages/private/Order/index";
import ProductOrder from "../pages/private/Product-Order";
import ProductStock from "../pages/private/Product-Stock";
import ProductDetails from "../pages/private/Produect-Details";
import UpdateProfile from "../pages/private/Profile/UpdateProfile";

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
];

export default PrivateRoutes;