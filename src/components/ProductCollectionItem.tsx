import {Link} from "react-router";
import {useEffect, useState} from "react";
import ProductPriceText from "@/components/ProductPriceText.tsx";

type Product = {
    id: number;
    name: string;
    price: number;
}

const ProductCollectionItem = ({product}: { product: Product }) => {
    const [image, setImage] = useState<string | undefined>("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [loaded, setLoaded] = useState(false);


    useEffect(() => {
        fetchImage();

    }, [product]);

    const fetchImage = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/v1/product/image/${product.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Błąd pobierania produktu');
            }

            const data = await response.json();

            setImage(data[0].imageUrl);

        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Link
            className={"border-b-1 border-r-1 border-black h-[570px] flex flex-col items-center justify-center"}
            to={`/product/${product.id}`}
        >
            <img
                alt={product.name}
                src={image}
                onLoad={() => setLoaded(true)}
                className={`rounded-none flex items-center justify-center object-contain w-full h-[500px] transition-opacity duration-100 ${loaded ? "opacity-100" : "opacity-0"}`}
            />

            <div className="flex flex-col items-start justify-center border-black border-t-1 w-full gap-1 px-5 h-fit">
                <h2 className="text-medium">{product.name}</h2>
                <ProductPriceText productPrice={product.price} className={"text-sm"}/>
            </div>

        </Link>
    );
};

export default ProductCollectionItem;