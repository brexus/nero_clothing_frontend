import {useParams} from 'react-router'
import {useEffect, useState} from 'react';
import {Button} from "@/components/ui/button"
import ProductSizeButton from "@/components/ProductSizeButton.tsx";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,} from "@/components/ui/carousel"
import DefaultLayout from "@/layouts/DefaultLayout.tsx";
import CircularLoading from "@/components/CircularLoading.tsx";
import {toast} from "sonner"
import ProductPriceText from "@/components/ProductPriceText.tsx";

const ProductPage = () => {
    const [product, setProduct] = useState({
        name: undefined,
        price: undefined,
        description: undefined
    });

    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState<number | undefined>(undefined);
    const [productDescription, setProductDescription] = useState("");
    const [productImages, setProductImages] = useState([]);


    // const [productImages, setProductImages] = useState([]);
    const [pickedSize, setPickedSize] = useState("");


    const [isSizeXSAvailable, setIsSizeXSAvailable] = useState(false);
    const [isSizeSAvailable, setIsSizeSAvailable] = useState(false);
    const [isSizeMAvailable, setIsSizeMAvailable] = useState(false);
    const [isSizeLAvailable, setIsSizeLAvailable] = useState(false);
    const [isSizeXLAvailable, setIsSizeXLAvailable] = useState(false);


    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const {id} = useParams();


    useEffect(() => {
        setLoading(true);
        setError(null);

        fetchProductPageInfo();

    }, [id]);

    const fetchProductPageInfo = async () => {

        try {
            const response = await fetch(`http://localhost:5000/api/v1/product/product-page-info/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Błąd pobierania produktu');
            }

            const data = await response.json();

            setProductName(data.name);
            setProductPrice(data.price);
            setProductDescription(data.description);
            setProductImages(data.productImages);

            setIsSizeXSAvailable(data.variantQuantities.XS_size);
            setIsSizeSAvailable(data.variantQuantities.S_size);
            setIsSizeMAvailable(data.variantQuantities.M_size);
            setIsSizeLAvailable(data.variantQuantities.L_size);
            setIsSizeXLAvailable(data.variantQuantities.XL_size);


        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const saveToCart = async () => {
        const cart = localStorage.getItem("cart");
        let cartItems = cart ? JSON.parse(cart) : [];
        let isAdded = false;

        cartItems.forEach((item) => {
            if ((item.size === pickedSize) && (item.productId === id)) {
                toast("Product already in cart", {type: "error"});
                isAdded = true;
            }
        });

        if (!isAdded) {
            let productVariantId = "";

            try {
                const response = await fetch(`http://localhost:5000/api/v1/product/get-product-variant/${id}/${pickedSize}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Error fetching product variant');
                }

                const data = await response.json();

                productVariantId = data.id;

            } catch (err: any) {
                // setError(err.message);
                console.log(err.message);
            } finally {
                localStorage.removeItem("cart");

                cartItems.push({
                    productId: id,
                    productVariantId: productVariantId,
                    name: productName,
                    price: productPrice,
                    size: pickedSize,
                    quantity: 1,
                    productImage: productImages.length > 0 ? productImages[0].imageUrl : ''
                });

                localStorage.setItem("cart", JSON.stringify(cartItems));

                toast("Product added to cart", {type: "success"});
            }
        }

        setPickedSize("");
    };

    return (
        <DefaultLayout>
            {!loading && !error &&
                <section className="flex sm:flex-row items-start justify-center flex-col w-full h-full">
                    <div
                        className="flex flex-col justify-center items-center sm:w-[50%] w-full border-r-1 border-foreground">
                        <Carousel className={"relative w-full h-full rounded-none"}>
                            <CarouselContent className={""}>
                                {productImages.length > 0 &&
                                    productImages.map((image, index) => (
                                        <CarouselItem key={index}>
                                            <img
                                                alt={product.name}
                                                className="w-full object-contain rounded-none"
                                                // height={800}
                                                src={image.imageUrl}
                                            />

                                        </CarouselItem>
                                    ))
                                }

                            </CarouselContent>
                            <CarouselPrevious className={"absolute left-5"}/>
                            <CarouselNext className={"absolute right-5"}/>
                        </Carousel>

                    </div>

                    <div className="flex flex-col items-start gap-4 p-4 w-full sm:w-[50%]">
                        <div className="flex flex-col gap-2">
                            <h1 className=" font-bold text-2xl">{productName}</h1>
                            <ProductPriceText productPrice={productPrice}/>
                        </div>

                        <div className="flex flex-col gap-2">
                            <h3 className="font-bold">Size:</h3>

                            <div className="flex flex-row gap-1">
                                <ProductSizeButton
                                    isSizeAvailable={isSizeXSAvailable}
                                    pickedSize={pickedSize}
                                    setPickedSize={setPickedSize}
                                    size="XS"
                                />

                                <ProductSizeButton
                                    isSizeAvailable={isSizeSAvailable}
                                    pickedSize={pickedSize}
                                    setPickedSize={setPickedSize}
                                    size="S"
                                />

                                <ProductSizeButton
                                    isSizeAvailable={isSizeMAvailable}
                                    pickedSize={pickedSize}
                                    setPickedSize={setPickedSize}
                                    size="M"
                                />

                                <ProductSizeButton
                                    isSizeAvailable={isSizeLAvailable}
                                    pickedSize={pickedSize}
                                    setPickedSize={setPickedSize}
                                    size="L"
                                />

                                <ProductSizeButton
                                    isSizeAvailable={isSizeXLAvailable}
                                    pickedSize={pickedSize}
                                    setPickedSize={setPickedSize}
                                    size="XL"
                                />

                            </div>
                        </div>

                        <Button
                            className="w-full cursor-pointer"
                            color="default"
                            onClick={() => {
                                if (pickedSize === "") {
                                    alert("Please select a size before adding to cart.");
                                    return;
                                } else {
                                    saveToCart();
                                }
                            }}
                            disabled={pickedSize === ""}
                        >
                            Add to cart
                        </Button>

                        <h3 className="font-bold">Description:</h3>

                        <p className={"text-start"}>{productDescription}</p>

                    </div>
                </section>
            }

            {loading &&
                <CircularLoading/>
            }

            {error &&
                <h1>Jakiś błąd</h1>
            }

        </DefaultLayout>
    );
}

export default ProductPage;
