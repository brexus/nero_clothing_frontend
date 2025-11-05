import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {BrowserRouter} from "react-router";
import RouterProvider from "@/RouterProvider.tsx";
import {ThemeProvider} from "@/components/theme-provider.tsx";
import {Toaster} from "@/components/ui/sonner"
import {AuthProvider} from "@/context/AuthContext.tsx";
import { CartProvider } from "@/context/CartContext";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <AuthProvider>
                <CartProvider>
                    <BrowserRouter>
                        <RouterProvider/>
                        <Toaster richColors closeButton/>
                    </BrowserRouter>
                </CartProvider>
            </AuthProvider>
        </ThemeProvider>
    </StrictMode>,
)
