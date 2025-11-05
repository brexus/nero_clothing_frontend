import {createContext, useContext, useState, useEffect} from "react";

type CartItem = {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image?: string;
};

type CartContextType = {
    cart: CartItem[];
    totalQuantity: number;
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    clearCart: () => void;
    counterCart: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({children}: { children: React.ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>(() => {
        const stored = localStorage.getItem("cart");
        return stored ? JSON.parse(stored) : [];
    });

    const [counterCart, setCounterCart] = useState(0);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
        setCounterCart(cart.reduce((sum, i) => sum + i.quantity, 0));
    }, [cart]);

    const updateQuantity = (id: number, quantity: number) => {
        setCart((prev) =>
            prev.map((item) =>
                item.id === id ? {...item, quantity: Math.max(quantity, 1)} : item
            )
        );
    };

    const addToCart = (item: CartItem) => {
        setCart(prev => {
            const existing = prev.find(i => i.id === item.id);
            if (existing) {
                return prev.map(i =>
                    i.id === item.id
                        ? {...i, quantity: i.quantity + item.quantity}
                        : i
                );
            }
            return [...prev, item];
        });
    };

    return (
        <CartContext.Provider
            value={{ cart, counterCart, addToCart, updateQuantity }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);