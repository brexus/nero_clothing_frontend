import {Navbar} from "@/components/Navbar.tsx";
import Footer from "@/components/Footer.tsx";

export default function DefaultLayout({
                                          children,
                                          ...props
                                      }) {
    return (
        <div className="min-h-screen flex flex-col w-full">
            <Navbar/>
            <main {...props} className="w-full flex-1">
                {children}
            </main>
            <Footer/>
        </div>
    );
}
