import {Link} from "react-router";
import DefaultLayout from "@/layouts/DefaultLayout.tsx";

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

                <Link
                    className={"rounded-full shadow bg-neutral-900 text-background px-3 py-2 text-sm "}
                    to={"/collections/all"}
                >
                    Click here!
                </Link>

            </section>
        </DefaultLayout>
    );
}

export default HomePage;