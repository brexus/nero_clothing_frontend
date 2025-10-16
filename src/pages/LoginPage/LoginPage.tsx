import {useAuth} from "@/context/AuthContext.tsx";
import DefaultLayout from "@/layouts/DefaultLayout.tsx";
import {useNavigate} from "react-router";
import LoginForm from "@/pages/LoginPage/LoginForm.tsx";

const LoginPage = () => {
    const {isAuthenticated} = useAuth();

    const navigate = useNavigate();

    if (isAuthenticated) {
        navigate("/profile");
    }

    return (
        <DefaultLayout>
            <div className="w-full flex flex-col items-center justify-center h-full">
                <div className="w-full max-w-lg mt-5">
                    <LoginForm/>
                </div>
            </div>

        </DefaultLayout>
    );
};

export default LoginPage;