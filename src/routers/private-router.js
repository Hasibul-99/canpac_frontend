import Dashboard from "../pages/private/Dashboard/index";
import CreateOrder from "../pages/private/Order/index";

const PrivateRoutes = [
    {
        path: "/",
        name: "Dashboard",
        component: Dashboard,
        layout: "/",
        exact: true
    },
    {
        path: "/create-order",
        name: "Create Order",
        component: CreateOrder,
        layout: "/",
        exact: true
    },
];

export default PrivateRoutes;