import {Navbar} from "@/components/Navbar.tsx";
import Footer from "@/components/Footer.tsx";
import InfiniteMarquee from "@/components/InfiniteMarquee.tsx";

export default function DefaultLayout({
                                          children,
                                          ...props
                                      }) {
    return (
        <div className="flex flex-col min-h-screen w-full">
            <Navbar/>
            <InfiniteMarquee />
            <main {...props} className="flex-1 flex flex-col w-full">
                {children}
            </main>
            <Footer/>
        </div>
    );
}
