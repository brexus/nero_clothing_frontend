import {Navigate, useParams} from 'react-router';
import {useEffect, useState} from 'react';
import ProductCollectionItem from "@/components/ProductCollectionItem.tsx";
import DefaultLayout from "@/layouts/DefaultLayout.tsx";
import {Button} from "@/components/ui/button"
import CircularLoading from "@/components/CircularLoading.tsx";

const CollectionPage = () => {
    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [pageNumber, setPageNumber] = useState(0);
    const [pageSize, setPageSize] = useState(2);
    const [isLastPage, setIsLastPage] = useState(false);
    const [isFirstPage, setIsFirstPage] = useState(true);

    const {name} = useParams();

    useEffect(() => {
        setLoading(true);
        setError(null);
        fetchProducts();

    }, [name, pageNumber]);

    useEffect(() => {
        setProducts([]);
        setPageNumber(0);
    }, [name]);

    const fetchProducts = async () => {
        try {
            let response;

            if (name === "all") {
                response = await fetch(`http://localhost:5000/api/v1/product/?page=${pageNumber}&size=${pageSize}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            } else {
                response = await fetch(`http://localhost:5000/api/v1/product/?category=${name}&page=${pageNumber}&size=${pageSize}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            }

            if (!response.ok) {
                throw new Error('Błąd pobierania produktu');
            }

            const data = await response.json();
            setIsLastPage(data.last);
            setIsFirstPage(data.first);

            if (data.content.length === 0) {
                setProducts(data.content);
            } else if (pageNumber > 0 && data.content.length > 0) {
                const newProducts = data.content.filter((newProduct: any) => {
                    return !products.some((existingProduct: any) => existingProduct.id === newProduct.id);
                });
                setProducts(prevProducts => [...prevProducts, ...newProducts]);
            } else {
                setProducts(data.content);
            }


        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (error) {
        return <Navigate replace to="/"/>;
    }

    return (
        <DefaultLayout>
            <section className="flex flex-col items-center justify-center w-full">
                <h1 className="text-2xl py-2">
                    {name ? name.toUpperCase() : ""}
                </h1>

                <div className="flex flex-col items-center justify-center border-t-1 border-black w-full">

                    {loading && !error &&
                        <CircularLoading/>
                    }

                    {error && !loading && !products &&
                        <h1 className="text-lg py-4">
                            Jakiś błąd podczas pobierania produktów: {error}
                        </h1>

                    }

                    {!loading && !error && products.length == 0 && (
                        <h1 className="text-lg py-4">
                            Nie znaleziono produktów w tej kolekcji.
                        </h1>
                    )}

                    {products && !loading && !error && products.length > 0 &&
                        <div
                            className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                            {products && products.map((product: any) => (
                                <ProductCollectionItem
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                        </div>
                    }

                    <Button
                        onClick={() => {
                            if (!isLastPage) {
                                setPageNumber(prevState => prevState + 1);
                            }
                        }}
                        className={`cursor-pointer bg-background text-foreground border-foreground border-1 rounded-none hover:bg-gray-100 my-4 ${isLastPage ? "hidden" : "block"}`}
                        disabled={isLastPage}
                    >
                        Load more...
                    </Button>

                </div>

            </section>
        </DefaultLayout>
    );
}

export default CollectionPage;
