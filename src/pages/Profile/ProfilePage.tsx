import DefaultLayout from "@/layouts/DefaultLayout.tsx";
import {useAuth} from "@/context/AuthContext.tsx";
import {Navigate, useNavigate} from "react-router";
import {Button} from "@/components/ui/button.tsx";

const ProfilePage = () => {

    const {user, isAuthenticated, logout} = useAuth();

    const navigate = useNavigate();

    const logoutUser = () => {
        logout();
        navigate("/login");
    };

    if (!isAuthenticated) {
        return <Navigate to="/login"/>;
    }

    return (
        <DefaultLayout>
            <div className={"w-full flex flex-col items-center justify-center h-full px-2 text-sm"}>

                <div className="p-4">
                    <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
                    <p>Welcome to your profile!</p>
                    <div className="mt-4">
                        <p><strong>First Name:</strong> {user?.firstName}</p>
                        <p><strong>Last Name:</strong> {user?.lastName}</p>
                        <p><strong>Email:</strong> {user?.email}</p>
                        <p><strong>Phone Number:</strong> {user?.phoneNumber}</p>
                    </div>

                    <Button onClick={logoutUser} className="mt-4">
                        Logout
                    </Button>

                    <Button onClick={() => console.log(isAuthenticated)} className="mt-4">
                        Check Auth
                    </Button>

                </div>
            </div>

        </DefaultLayout>
    );
};

export default ProfilePage;