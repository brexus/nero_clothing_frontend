import DefaultLayout from "@/layouts/DefaultLayout.tsx";
import {getCartItems} from "@/utils/CartUtils.tsx";
import {useEffect, useState} from "react";
import CheckoutForm from "@/pages/Checkout/CheckoutForm.tsx";
import {Link} from "react-router";
import ProductPriceText from "@/components/ProductPriceText.tsx";

const CheckoutPage = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const [cartItems, setCartItems] = useState([]);

    const [shippingCost, setShippingCost] = useState(0); // in cents
    const [totalCost, setTotalCost] = useState(0); // in cents
    const [subtotalCost, setSubtotalCost] = useState(0); // in cents


    useEffect(() => {
        loadCart();
    }, []);

    useEffect(() => {
        calculateTotalCost();

    }, [cartItems]);


    const loadCart = () => {
        const cartItemsLocalStorage = getCartItems();

        if (cartItemsLocalStorage.length > 0) {
            setCartItems(cartItemsLocalStorage);
        } else {
            setCartItems([]);
        }

        setLoading(false);
    };

    const calculateTotalCost = () => {
        let calculatedSubtotalCost = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

        console.log(calculatedSubtotalCost)
        setSubtotalCost(calculatedSubtotalCost);

        if (calculatedSubtotalCost > 30000) {
            setShippingCost(0);
        } else {
            setShippingCost(399);
        }

        setTotalCost(calculatedSubtotalCost + shippingCost);
    };

    return (
        <DefaultLayout>
            <div className={"w-full flex flex-row items-start justify-center h-full px-2 text-sm"}>

                <div
                    className="flex flex-col items-end justify-center border-r-1 border-foreground w-full max-w-xl py-8">
                    <CheckoutForm
                        cartItems={cartItems}
                        shippingCost={shippingCost}
                    />
                </div>

                <div className="flex flex-col items-center justify-center gap-4 p-8 max-w-lg w-full">
                    <h2 className="text-2xl font-bold w-full">Summary</h2>

                    {cartItems.length > 0 &&
                        <>
                            {cartItems.map((item) => (
                                <div
                                    key={item.productVariantId}
                                    className="w-full flex flex-row items-center"
                                >
                                    <div className="flex flex-col items-center justify-center">
                                        <img
                                            src={item.productImage}
                                            alt={item.name}
                                            className=" object-contain object-center w-[70px] h-[70px] rounded-lg border-1 border-gray-200 bg-gray-100 "
                                        />
                                    </div>

                                    <div className={"flex-1 px-4"}>
                                        <Link to={`/product/${item.productId}`} className={"hover:underline"}>
                                            <h2 className="text-md font-semibold">{item.name}</h2>
                                        </Link>

                                        <p className="text-gray-600">Size: {item.size}</p>
                                        <p className="text-gray-600">Quantity: {item.quantity}</p>

                                    </div>

                                    <div>
                                        <ProductPriceText
                                            productPrice={item.price * item.quantity}
                                            className={"font-bold"}
                                        />
                                    </div>

                                </div>
                            ))}
                        </>
                    }

                    <div className="flex flex-row items-center justify-between w-full">
                        <p className="">Subtotal</p>
                        <p className="">
                            <ProductPriceText
                                productPrice={subtotalCost}
                                className={""}
                            />
                        </p>
                    </div>

                    <div className="flex flex-row items-center justify-between w-full">
                        <p className="">Shipping</p>
                        <ProductPriceText
                            productPrice={shippingCost}
                        />
                    </div>

                    {cartItems.length > 0 &&
                        <div className="flex flex-row items-center justify-between w-full text-md font-bold">
                            <p>Total</p>
                            <p>
                                <ProductPriceText
                                    productPrice={totalCost}
                                />
                            </p>
                        </div>
                    }

                </div>
            </div>
        </DefaultLayout>
    );
};

export default CheckoutPage;