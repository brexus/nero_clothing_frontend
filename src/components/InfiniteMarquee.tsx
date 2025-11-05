import Marquee from "react-fast-marquee";

const InfiniteMarquee = () => {
    return (
        <Marquee
            className={"border-b-1 border-black bg-foreground text-background"}
            pauseOnHover
            autoFill
        >
            <div className="gap-10 flex uppercase font-semibold text-xs py-2">
                <span>Free shipping on orders over $300 📦</span>
                <span>New fall collection is now available! 🆕</span>
                <span className={"mr-10"}>Subscribe newsletter for exclusive offers 📫</span>
            </div>
        </Marquee>
    );
};

export default InfiniteMarquee;