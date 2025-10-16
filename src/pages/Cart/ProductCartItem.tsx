import {Link} from "react-router";
import {Button} from "@/components/ui/button.tsx";
import {Icons} from "@/components/icons.tsx";
import InputItemQuantity from "@/pages/Cart/InputItemQuantity.tsx";
import {useEffect, useState} from "react";
import {toast} from "sonner";
import ProductPriceText from "@/components/ProductPriceText.tsx";

const ProductCartItem = ({item, cartItems, setCartItems}: {
    item: {
        productVariantId: number;
        productId: number;
        name: string;
        size: string;
        price: number;
        quantity: number;
        productImage: string;
    };
    cartItems: Array<{
        productVariantId: number;
        productId: number;
        name: string;
        size: string;
        price: number;
        quantity: number;
        productImage: string;
    }>;
    setCartItems: (cartItems: Array<{
        productVariantId: number;
        productId: number;
        name: string;
        size: string;
        price: number;
        quantity: number;
        productImage: string;
    }>) => void;
}) => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [localQuantity, setLocalQuantity] = useState(item.quantity);
    const [availableStock, setAvailableStock] = useState(0);

    const [isCheckingStock, setIsCheckingStock] = useState(false);

    const [checkStockAvailability, setCheckStockAvailability] = useState(true);


    useEffect(() => {
        if (checkStockAvailability) {
            getAndCheckStockQuantity();
            setCheckStockAvailability(false);
        }
    }, [checkStockAvailability]);

    const getAndCheckStockQuantity = async () => {
        setError(null);

        try {
            const response = await fetch(`http://localhost:5000/api/v1/product-variant/${item.productVariantId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Error fetching stock for product variant ${item.productVariantId}`);
            }

            const data = await response.json();

            setAvailableStock(data.stockQuantity);
            updateLocalStorageCart(data.stockQuantity);

        } catch (error) {
            setError("Failed to check stock availability.");
            console.error("Error fetching stock:", error);
            return false;
        } finally {
            setIsCheckingStock(false);
        }
    };

    const updateLocalStorageCart = (stockQuantity: number) => {
        const updatedCartItems = cartItems.map(cartItem => {
            if (cartItem.productVariantId === item.productVariantId) {

                if (localQuantity > stockQuantity) {
                    toast.error(`Only ${stockQuantity} items available in stock.`);
                    setLocalQuantity(stockQuantity);

                    return {
                        ...cartItem,
                        quantity: stockQuantity
                    };
                }

                if (localQuantity < 0) {
                    toast.error(`Quantity cannot be less than 0.`);
                    setLocalQuantity(0);
                    return {
                        ...cartItem,
                        quantity: 0
                    };
                }

                return {
                    ...cartItem,
                    quantity: localQuantity
                };
            }
            return cartItem;
        }).filter(cartItem => cartItem.quantity > 0); // Remove item if quantity is 0

        setCartItems(updatedCartItems);
        localStorage.setItem("cart", JSON.stringify(updatedCartItems));
    }

    if (isCheckingStock) {
        return (
            <div
                className={"w-full max-w-md p-4 flex flex-row justify-between items-center border-1 gap-2 border-black opacity-50"}>
                <p>Checking stock...</p>
            </div>
        );
    }

    return (
        <div
            key={item.productVariantId}
            className={`
                w-full p-4 flex flex-row justify-between items-center gap-2
                ${item.quantity <= 0 ? "opacity-50" : "opacity-100"}
            `}
        >
            <div className="h-full flex flex-col items-center justify-center ">
                <img
                    src={item.productImage}
                    alt={item.name}
                    className="object-cover object-center w-[96px] h-full"
                />
            </div>

            <div className="flex flex-col items-start w-full text-gray-600 text-sm">

                <div className={"w-full"}>
                    <span className={"flex flex-row items-center justify-between w-full"}>
                        <Link
                            to={`/product/${item.productId}`}
                            className={"hover:underline"}
                        >
                            <h2 className="text-lg font- text-foreground font-semibold">{item.name}</h2>

                        </Link>

                        <div className="flex flex-col items-center justify-center">
                            <Button
                                size="icon"
                                className={"bg-transparent hover:bg-gray-200 transition-all cursor-pointer shadow-none"}
                                onClick={() => {
                                    const updatedCartItems = cartItems.filter(cartItem => cartItem.productVariantId !== item.productVariantId);

                                    setCartItems(updatedCartItems);
                                    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
                                }}
                            >
                                <Icons.XMarkIcon
                                    className={"fill-gray-600 bg-transparent w-6 h-6 hover:fill-gray-700 transition-all"}
                                />
                            </Button>
                        </div>
                    </span>

                    <ProductPriceText
                        productPrice={item.price}
                        className={"font-semibold text-md text-foreground"}
                    />

                    <p>Prod. nr: {item.productId}</p>

                    <p>Size: {item.size}</p>


                    <p className="flex flex-row items-center start gap-1">
                        Total:
                        <ProductPriceText productPrice={item.price * item.quantity}/>
                    </p>

                    <div className={"w-full flex flex-row items-center justify-start gap-2"}>
                        <p className="">Quantity:</p>

                        <InputItemQuantity
                            localQuantity={localQuantity}
                            setLocalQuantity={setLocalQuantity}
                            availableStock={availableStock}
                            setCheckStockAvailability={setCheckStockAvailability}
                        />

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCartItem;