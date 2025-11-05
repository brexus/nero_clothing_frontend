const ProductPriceText = ({productPrice, ...props}: { productPrice?: number }) => {
    return (
        <span className={""} {...props} >${(productPrice ? productPrice : 0) / 100}</span>
    );
};

export default ProductPriceText;
