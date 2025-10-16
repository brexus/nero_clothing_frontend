import {Button} from "@/components/ui/button"

interface ProductSizeButtonProps {
    size: string;
    isSizeAvailable: boolean;
    setPickedSize: (size: string) => void;
    pickedSize: string;
}

const ProductSizeButton = ({size, isSizeAvailable, setPickedSize, pickedSize}: ProductSizeButtonProps) => {

    return (
        <Button
            size="icon"
            disabled={!isSizeAvailable}
            className={`
                border-black border-1 hover:text-foreground text-foreground cursor-pointer disabled:opacity-15
                ${!isSizeAvailable && "line-through"} 
                ${pickedSize === size ? "bg-foreground text-background hover:text-background" : "bg-transparent hover:text-background"}
            `}
            onClick={() => setPickedSize(size)}
        >
            {size}
        </Button>
    );
};

export default ProductSizeButton;