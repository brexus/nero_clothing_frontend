import {Button} from '@/components/ui/button.tsx';

const InputItemQuantity = ({localQuantity, setLocalQuantity, availableStock, setCheckStockAvailability}: {
    localQuantity: number;
    setLocalQuantity: (quantity: number) => void;
    availableStock: number;
    setCheckStockAvailability: (validating: boolean) => void;
}) => {

    return (
        <div className="flex flex-row items-center gap-2 border-1 border-black">
            <Button
                onClick={() => {
                    setLocalQuantity(localQuantity - 1)
                    setCheckStockAvailability(true);
                }}
                className="rounded-none cursor-pointer w-[30px] h-[30px] p-0 "
            >
                -
            </Button>

            <span>{localQuantity}</span>

            <Button
                className="rounded-none cursor-pointer w-[30px] h-[30px] p-0 "
                onClick={() => {
                    if (localQuantity + 1 <= availableStock) {
                        setLocalQuantity(localQuantity + 1);
                        setCheckStockAvailability(true);
                    }
                }}
                disabled={localQuantity >= availableStock}
            >
                +
            </Button>

        </div>
    );
};

export default InputItemQuantity;