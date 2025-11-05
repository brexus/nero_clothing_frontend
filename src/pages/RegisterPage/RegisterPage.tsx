import {useAuth} from "@/context/AuthContext.tsx";
import DefaultLayout from "@/layouts/DefaultLayout.tsx";
import {useNavigate} from "react-router";
import RegisterForm from "@/pages/RegisterPage/RegisterForm.tsx";

const RegisterPage = () => {
    const {isAuthenticated} = useAuth();
    const navigate = useNavigate();

    if (isAuthenticated) navigate("/profile");

    return (
        <DefaultLayout>
            <div className="w-full flex flex-col items-center justify-center h-full">
                <div className="w-full max-w-lg mt-5">
                    <RegisterForm/>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default RegisterPage;