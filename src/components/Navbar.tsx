import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"

import {Link} from "react-router";
import {Icons} from "@/components/icons.tsx";
import {LogoIcon} from "@/components/LogoIcon.tsx";
import {useAuth} from "@/context/AuthContext.tsx";
import {useCart} from "@/context/CartContext";

export const Navbar = () => {
    const {user, isAuthenticated, loading} = useAuth();
    const {totalQuantity, counterCart} = useCart();

    return (
        <nav className="border-b-1 border-black sticky flex p-1 sm:p-3 flex-row items-center justify-between z-50">
            <div className="flex items-center justify-start">
                <Link
                    className="flex justify-start items-center gap-1"
                    color="foreground"
                    to="/"
                >
                    <LogoIcon
                        className="w-17 sm:w-20 fill-white mr-1"
                    />
                </Link>


                <div className="hidden sm:flex gap-4 justify-start ml-2">
                    <Link
                        className="cursor-pointer p-1 box-border border-1 border-transparent hover:border-black"
                        to="/"
                    >
                        <p className="text-inherit">Home</p>
                    </Link>

                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <span
                                className={"cursor-pointer p-1 box-border flex items-center justify-start gap-1 border-1 border-transparent hover:border-black"}>
                               Shop
                               <Icons.CaretDownIcon className="w-4 fill-foreground mr-1"/>
                           </span>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent>
                            <Link to={"/collections/all"}>
                                <DropdownMenuItem className={"cursor-pointer hover:bg-gray-100"}>
                                    ALL
                                </DropdownMenuItem>
                            </Link>

                            <Link to={"/collections/hoodies"}>
                                <DropdownMenuItem className={"cursor-pointer hover:bg-gray-100"}>
                                    HOODIES
                                </DropdownMenuItem>
                            </Link>

                            <Link to={"/collections/tshirts"}>
                                <DropdownMenuItem className={"cursor-pointer hover:bg-gray-100"}>
                                    T-SHIRTS
                                </DropdownMenuItem>
                            </Link>

                            <Link to={"/collections/bottoms"}>
                                <DropdownMenuItem className={"cursor-pointer hover:bg-gray-100"}>
                                    BOTTOMS
                                </DropdownMenuItem>
                            </Link>

                            <Link to={"/collections/accessories"}>
                                <DropdownMenuItem className={"cursor-pointer hover:bg-gray-100"}>
                                    ACCESSORIES
                                </DropdownMenuItem>
                            </Link>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Link
                        className="cursor-pointer p-1 box-border border-1 border-transparent hover:border-black"
                        to="/about-us"
                    >
                        <p className="text-inherit">About us</p>
                    </Link>

                </div>
            </div>

            <div className="flex flex-row items-center justify-end gap-1">

                <Link
                    className="text-default-500 cursor-pointer fill-black p-1 box-border"
                    to={"/profile"}
                >
                    <Icons.UserEmptyIcon
                        width={24}
                    />
                </Link>

                {/*<ModeToggle/>*/}

                <Link
                    className="text-default-500 cursor-pointer fill-black p-1 box-border"
                    to={"/cart"}
                >
                    {counterCart > 0 && (
                        <span
                            className="absolute top-1 right-1 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                            {counterCart}
                        </span>
                    )}
                    <Icons.CartIcon
                        width={24}
                    />
                </Link>

                <DropdownMenu>
                    <DropdownMenuTrigger className="sm:hidden p-2">
                        <Icons.HamburgerIcon className="w-6 h-6 fill-foreground cursor-pointer"/>

                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="sm:hidden">
                        <Link to="/"><DropdownMenuItem>Home</DropdownMenuItem></Link>

                        <DropdownMenuItem>
                            <div className="flex flex-col w-full">
                                <p className="font-semibold mb-1">Shop</p>
                                <Link to="/collections/all" className="py-1 text-sm">ALL</Link>
                                <Link to="/collections/hoodies" className="py-1 text-sm">HOODIES</Link>
                                <Link to="/collections/tshirts" className="py-1 text-sm">T-SHIRTS</Link>
                                <Link to="/collections/bottoms" className="py-1 text-sm">BOTTOMS</Link>
                                <Link to="/collections/accessories" className="py-1 text-sm">ACCESSORIES</Link>
                            </div>
                        </DropdownMenuItem>

                        <Link to="/about-us"><DropdownMenuItem>About us</DropdownMenuItem></Link>
                    </DropdownMenuContent>
                </DropdownMenu>

            </div>

        </nav>
    );
};
