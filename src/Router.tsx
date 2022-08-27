import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext, AuthProvider } from "./auth/Auth";
import SignIn from "./pages/SignIn";
import Error from "./pages/Error";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import Spinner from "./components/Spinner";
import SignUp from "./pages/SignUp";

export function Router() {
    const Private = ({ children }: any) => {
        const { authenticated, loading } = useContext(AuthContext);

        if (loading) {

            return <Spinner width={60} topColor="#48B2E9" />
        }

        if (!authenticated) {
            return <Navigate to="/signin" />;
        }

        return children;
    }

    return (
        <AuthProvider>
            <Routes>
                <Route path="*" element={<Error />} />
                <Route path="/" element={<Home />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/product/:slug" element={<Private> <ProductPage /> </Private>} />
            </Routes>
        </AuthProvider>
    )
}