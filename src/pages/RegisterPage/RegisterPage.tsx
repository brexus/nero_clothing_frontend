import {useAuth} from "@/context/AuthContext.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import DefaultLayout from "@/layouts/DefaultLayout.tsx";
import {useState} from "react";
import {useNavigate} from "react-router";

const RegisterPage = () => {
    const {user, isAuthenticated, login} = useAuth();

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submitRegister = async () => {
        await login(email, password);
        await console.log(user);
        await navigate("/profile");
    };

    if (isAuthenticated) {
        navigate("/profile");
    }

    return (
        <DefaultLayout>
            <div className={"justify-center items-center w-50"}>

                <Input placeholder="email" onChange={(e) => setEmail(e.target.value)}/>
                <Input placeholder="password" onChange={(e) => setPassword(e.target.value)}/>

                <Button onClick={submitRegister}>
                    Register
                </Button>
            </div>

        </DefaultLayout>
    );
};

export default RegisterPage;