const ProductPriceText = ({productPrice, ...props}: { productPrice?: number }) => {
    return (
        <p className={""} {...props} >${(productPrice ? productPrice : 0) / 100}</p>
    );
};

export default ProductPriceText;
