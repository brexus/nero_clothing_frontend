import {Link} from "react-router";
import {Icons} from "@/components/icons.tsx";
import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import DefaultLayout from "@/layouts/DefaultLayout.tsx";
import {getCartItems} from "@/utils/CartUtils.tsx";
import ProductCartItem from "@/pages/Cart/ProductCartItem.tsx";
import {toast} from "sonner";
import CircularLoading from "@/components/CircularLoading.tsx";
import ProductPriceText from "@/components/ProductPriceText.tsx";

const CartPage = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const [checkoutLoading, setCheckoutLoading] = useState(false);


    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        setCheckoutLoading(false);
        setLoading(true);
        setError(null);
        loadCart();

    }, []);

    const loadCart = () => {
        const cartItemsLocalStorage = getCartItems();

        if (cartItemsLocalStorage.length > 0) {
            setCartItems(cartItemsLocalStorage);
        } else {
            setCartItems([]);
        }

        setLoading(false);
    };

    const isCartItemsAvailable = async () => {

        for (let item of cartItems) {
            let stock = await getStockQuantity(item.productVariantId);

            if (!stock || stock < item.quantity) {
                return false;
            }
        }
        return true;
    };


    const getStockQuantity = async (productVariantId: number) => {

        try {
            const response = await fetch(`http://localhost:5000/api/v1/product-variant/${productVariantId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });


            if (!response.ok) {
                throw new Error(`Error fetching stock for product variant ${productVariantId}`);
            }

            const data = await response.json();

            return data.stockQuantity;

        } catch (error) {
            // setError("Failed to check stock availability.");
            console.error("Error fetching stock:", error);
            return false;
        } finally {
            console.log("Stock Quantity:", productVariantId);
        }
    };


    return (
        <DefaultLayout>

            {cartItems.length > 0 &&
                <section
                    className="w-full flex flex-col items-center justify-center text-black h-full py-4"
                >
                    <h1 className="text-2xl py-2 w-fullborder-black text-center font-semibold">
                        CART ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items)
                    </h1>


                    <div className={"max-w-xl w-full"}>

                        {cartItems.map((item) => (
                            <ProductCartItem
                                key={item.productVariantId}
                                item={item}
                                cartItems={cartItems}
                                setCartItems={setCartItems}
                            />
                        ))}

                        <div className="flex flex-col items-center justify-center w-full">

                            <p className="text-xl font-semibold flex-row gap-2 flex items-center justify-between w-full">
                                <span>
                                    Total:
                                </span>

                                <ProductPriceText
                                    productPrice={cartItems.reduce((acc, item) => acc + ((item.price) * item.quantity), 0)}/>
                            </p>

                            <Button
                                className={" bg-neutral-900 text-background px-6 text-md mt-3 w-full py-6 cursor-pointer mb-4"}
                                // to={"/checkout"}
                                onClick={async () => {
                                    setCheckoutLoading(true);
                                    const isCartAvailable = await isCartItemsAvailable();

                                    if (isCartAvailable) {
                                        window.location.href = "/checkout";

                                    } else {
                                        toast("Some items in your cart are no longer available.", {type: "error"});
                                    }
                                }}
                                disabled={checkoutLoading}
                            >
                                <CircularLoading className={`${checkoutLoading ? "block animate-spin" : "hidden"}`}/>
                                Go to Checkout
                            </Button>
                        </div>
                    </div>

                </section>
            }

            {(cartItems.length == 0) &&
                <section
                    className="w-full flex flex-col items-center justify-center h-full text-center gap-2 py-20"
                >
                    <Icons.CartIcon className="opacity-40 w-10"/>
                    <h1 className="text-2xl font-bold">Your Cart is empty</h1>
                    <p className="text-lg">Add products to your cart to continue shopping.</p>
                    <Link
                        className={"rounded-full bg-neutral-900 text-background px-4 py-2 text-md mt-2"}
                        to={"/collections/all"}
                    >
                        Continue Shopping
                    </Link>


                </section>
            }

        </DefaultLayout>
    );
};

export default CartPage;