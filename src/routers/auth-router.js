import SignIn from "../pages/Auth/SignIn";

const AuthRouters = [  
    {
        path: "/login",
        name: "Login",
        component: SignIn,
        layout: "/auth"
    }
];

export default AuthRouters;