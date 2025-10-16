import {Route, Routes} from "react-router";

import HomePage from "@/pages/HomePage.tsx";
import CollectionPage from "@/pages/CollectionPage.tsx";
import CartPage from "@/pages/Cart/CartPage.tsx";
import ProductPage from "@/pages/ProductPage.tsx";
import NotFoundPage from "@/pages/NotFoundPage.tsx";
import CheckoutPage from "@/pages/Checkout/CheckoutPage.tsx";
import LoginPage from "@/pages/LoginPage/LoginPage.tsx";
import ProfilePage from "@/pages/Profile/ProfilePage.tsx";

const RouterProvider = () => {
    return (
        <Routes>
            <Route element={<HomePage/>} path="/"/>
            <Route element={<ProductPage/>} path="/product/:id"/>
            <Route element={<CollectionPage/>} path="/collections/:name"/>
            <Route element={<CartPage/>} path="/cart"/>
            <Route element={<CheckoutPage/>} path="/checkout"/>

            <Route element={<LoginPage/>} path="/login"/>
            <Route element={<ProfilePage/>} path="/profile"/>

            <Route element={<NotFoundPage/>} path="*"/>
        </Routes>
    );
}

export default RouterProvider;
