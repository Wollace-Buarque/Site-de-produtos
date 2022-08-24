import { Route, Routes } from "react-router-dom";
import Error from "./pages/Error";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";

export function Router() {
    return (
        <Routes>
            <Route path="*" element={<Error />} />
            <Route path="/" element={<Home />} />
            <Route path="/product/:slug" element={<ProductPage />} />
        </Routes>
    )
}