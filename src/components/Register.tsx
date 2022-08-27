import { Eye, EyeClosed } from "phosphor-react";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../auth/Auth";
import FireError from "./FireError";
import Spinner from "./Spinner";

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const { register } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(event: any) {
        event.preventDefault();

        setLoading(!loading);

        try {
            await register(email, password);

            <Navigate to={"/account"} />
        } catch (error: any) {
            setError(error.code);
        }

        setLoading(false);
    }

    return (
        <div className="w-[400px] shadow-[0_10px_30px_0px] shadow-black rounded-lg p-10">

            <form autoComplete="off" className="flex flex-col" onSubmit={event => handleSubmit(event)}>

                <div className="flex flex-col pb-1">
                    <label
                        className="text-lg text-gray-300 pb-1 pt-2"
                        htmlFor="password">
                        E-mail
                    </label>

                    <input
                        className="bg-neutral-800 text-base outline-none rounded p-2 px-4"
                        type="text"
                        name="email"
                        onChange={event => setEmail(event.target.value)}
                        placeholder="Digite seu e-mail" />
                </div>

                <div className="flex flex-col pb-1">
                    <label
                        className="text-lg text-gray-300 pb-1 pt-2"
                        htmlFor="password">
                        Senha
                    </label>

                    <div className="flex justify-end items-center">
                        <input
                            className="bg-neutral-800 text-base outline-none rounded p-2 px-4 w-full"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            onChange={event => setPassword(event.target.value)}
                            placeholder="Digite sua senha" />

                        <button
                            onClick={() => setShowPassword(!showPassword)}
                            type="button"
                            className="absolute mr-2 ">

                            {showPassword ? <Eye size={25} color="#4CC2FF" /> : <EyeClosed size={25} color="#4CC2FF" />}

                        </button>
                    </div>
                </div>

                <button
                    className="h-10 bg-[#4CC2FF] text-black rounded-md p-2 mt-5 hover:bg-[#47B1E8] transition-colors">
                    {loading ? (
                        <div className="flex justify-center items-center gap-2">
                            <Spinner width={25} borderWidth={3} color="#17171720" topColor="black" />
                            Registrando...
                        </div>
                    ) : (
                        <span>Registrar</span>
                    )}
                </button>

                <div className="flex justify-center">
                    <FireError error={error} />
                </div>

                <span className="text-sm text-gray-500 pt-6">
                    Já possui uma conta? <Link to={"/signin"} className="text-[#4CC2FF]">Entrar</Link>
                </span>

            </form>

        </div>
    );
}