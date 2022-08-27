import { MagnifyingGlass, Warning } from "phosphor-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import products from "../data/products";

export default function Error() {
    const [searchTerms, setSearchTerms] = useState<{ id: number; name: string; value: number; description: string; image: string; slug: string; }[]>([]);

    function autoCompleteMatch(input: string) {
        if (input == "") {
            return [];
        }

        return products.filter(product => {
            if (product.name.toLowerCase().match(new RegExp(input.toLowerCase()))) {
                return product;
            }
        });
    }

    function showResults(value: string) {
        setSearchTerms(autoCompleteMatch(value));
    }

    document.title = "Página não encontrada";

    return (
        <div>
            <main className="flex items-center justify-center h-screen">

                <div className="p-4 space-y-4">
                    <div className="flex flex-col items-start space-y-3 sm:flex-row sm:space-y-0 sm:items-center sm:space-x-3">

                        <span className="font-semibold text-9xl text-red-700">
                            404
                        </span>

                        <div className="space-y-2">

                            <h1 id="pageTitle" className="flex items-center space-x-2">
                                <Warning size={24} className="text-red-600" />

                                <span className="text-xl font-medium sm:text-2xl text-light">
                                    Oops! Página não encontrada!
                                </span>
                            </h1>

                            <p className="text-base font-normal text-gray-300">
                                A página que você está procurando não foi encontrada!
                            </p>

                            <p className="text-base font-normal text-gray-300">
                                Você pode voltar para <Link
                                    to={"/"}
                                    className="hover:underline text-[#4CC2FF]">
                                    página inicial
                                </Link> ou tentar pesquisar algo.
                            </p>
                        </div>
                    </div>

                    <form action="#" method="POST" autoComplete="off">

                        <div className="flex items-center justify-center">
                            <input
                                className="w-full px-4 py-2 rounded-l-md bg-neutral-800 border-2 border-r-0 border-neutral-800 focus:outline-none focus:border-blue-800"
                                type="text"
                                name="search"
                                placeholder="O que você está procurando?"
                                onKeyUp={(event) => showResults(event.currentTarget.value)} />

                            <button
                                onClick={event => event.preventDefault()}
                                className="p-2 text-white rounded-r-md bg-blue-700 border-2 border-blue-700 hover:bg-blue-800 focus:outline-none focus:ring focus:ring-primary-darker">
                                <span className="sr-only">
                                    Pesquisar
                                </span>
                                <MagnifyingGlass size={24} />
                            </button>
                        </div>

                        <div
                            className="flex px-2 py-1 h-[200px] max-h-[200px] overflow-y-auto overflow-x-hidden"
                            id="result">
                            <ul className="flex flex-col flex-1">
                                {searchTerms.map((product, index) => (
                                    <li key={index}>

                                        <Link
                                            className="flex items-start max-h-[90px] gap-2 p-2 text-lg cursor-pointer hover:bg-neutral-700"
                                            to={`/product/${product.slug}`}>
                                            <img
                                                className="rounded shadow-sm shadow-black"
                                                width={100}
                                                src={product.image} />

                                            <div className="flex flex-col max-h-[60px] overflow-hidden ">
                                                <span className="truncate max-w-[350px]">
                                                    {product.name}
                                                </span>
                                                <span className="text-sm text-gray-300">
                                                    R$ {product.value.toLocaleString('pt-BR')}
                                                </span>
                                            </div>
                                        </Link>

                                    </li>
                                ))}
                            </ul>
                        </div>

                    </form>
                </div>
            </main>
        </div>
    );
}