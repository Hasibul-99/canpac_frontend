import Dashboard from "../pages/private/Dashboard/index";
import CreateOrder from "../pages/private/Order/index";
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
];

export default PrivateRoutes;