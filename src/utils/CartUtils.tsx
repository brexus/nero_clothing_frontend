export const getCartItems = () => {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
};