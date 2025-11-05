import {Link} from "react-router";
import DefaultLayout from "@/layouts/DefaultLayout.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Icons} from "@/components/icons.tsx";

const HomePage = () => {
    return (
        <DefaultLayout>
            <section
                className="w-full bg-cover bg-center flex flex-col items-center justify-center h-full  text-center relative gap-2"
                style={{
                    backgroundImage: "url('/pages/HomePage/main2.jpg')",
                    height: "calc(100vh - 64px)"
                }}
            >
                <div className="inline-block max-w-lg text-center justify-center">
                    <span className={"text-2xl sm:text-4xl font-lexend text-background"}>SHOP NOW</span>
                </div>

                <Link to={"/collections/all"}>
                    <Button
                        className={"w-fit py-6 cursor-pointer font-semibold text-lg"}
                    >
                        Click here!
                    </Button>
                </Link>
            </section>

            <section className={"flex flex-col md:flex-row items-center justify-center px-4 py-10"}>
                <h2
                    className={"text-xl md:text-2xl mb-5 md:mb-0 w-1/2 text-center flex flex-col items-center justify-center"}
                >
                    <span>
                        Subscribe our {" "}
                        <span className={"font-bold"}>newsletter</span> {" \n"}
                    </span>

                    <span>
                        to get a {" "}
                        <span className={"font-bold"}>better style!</span>
                    </span>

                </h2>

                <form className={"flex flex-row gap-2 items-center justify-center w-1/2"}>
                    <Input
                        type="email"
                        placeholder="Enter your email"
                        className={"border border-gray-300 rounded px-4 py-2 w-64"}
                    />
                    <Button
                        type="submit"
                        className={"w-fit py-5 cursor-pointer font-semibold text-sm"}
                    >
                        <Icons.SendIcon className={"fill-background"} />
                    </Button>
                </form>
            </section>
        </DefaultLayout>
    );
}

export default HomePage;