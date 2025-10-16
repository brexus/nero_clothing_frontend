import {Link} from "react-router";

const Footer = () => {

    return (
        <footer className="w-full flex flex-row items-center justify-center bg-foreground">

            <div className="p-5 flex flex-col items-center gap-2 w-[50%] border-background border-r-1">
                <Link
                    className="flex items-center gap-1 text-background text-sm hover:underline"
                    to="/"
                >
                    TERMS
                </Link>

                <Link
                    className="flex items-center gap-1 text-background text-sm hover:underline"
                    to="/"
                >
                    PRIVACY POLICY
                </Link>

                <Link
                    className="flex items-center gap-1 text-background text-sm hover:underline"
                    to="/"
                >
                    RETURNS
                </Link>

                <Link
                    className="flex items-center gap-1 text-background text-sm hover:underline"
                    to="/"
                >
                    SHIPPING
                </Link>
            </div>

            <div className="w-[50%] p-3 flex flex-col items-center gap-2">
				<span className="flex-row flex gap-1 text-background">
					© 2025 NERO CLOTHING
				</span>
                <span className={"text-background"}>
                    This is a demo project. All products and data shown are fictional.
                </span>
            </div>
        </footer>
    );
};

export default Footer;