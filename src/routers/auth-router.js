import ForgetPassword from "../pages/Auth/Forget-Password";
import passwordSet from "../pages/Auth/Forget-Password/passwordSet";
import SignIn from "../pages/Auth/SignIn";
import SignUp from "../pages/Auth/SignUp";

const AuthRouters = [  
    {
        path: "/login",
        name: "Login",
        component: SignIn,
        layout: "/auth"
    },
    {
        path: "/signup",
        name: "Signup",
        component: SignUp,
        layout: "/auth"
    },
    {
        path: "/forget-password",
        name: "Forget Password",
        component: ForgetPassword,
        layout: "/auth"
    },
    {
        path: "/forget-password-reset",
        name: "Forget Password Reset",
        component: passwordSet,
        layout: "/auth"
    }
];

export default AuthRouters;