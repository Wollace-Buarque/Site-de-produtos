import { GlobeHemisphereWest, House, User } from "phosphor-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import products from "../data/products";

interface HeaderProps {
    home?: boolean;
    account?: boolean;
}

export default function Header(props: HeaderProps) {
    const [searchTerms, setSearchTerms] = useState<{ id: number; name: string; value: number; description: string; image: string; slug: string; }[]>([]);

    function autoCompleteMatch(input: string) {
        let searchProducts = products.filter(product => {
            if (product.name.toLowerCase().match(new RegExp(input.toLowerCase()))) {
                return product;
            }
        });;

        return searchProducts.length == 0 ? products : searchProducts;
    }

    function showResults(value: string) {
        setSearchTerms(autoCompleteMatch(value));

        let result = document.getElementById("result");

        if (result == null) return;

        let classList = result.classList;

        if (classList.contains("hidden")) {
            classList.remove("hidden");
            classList.add("absolute");
        }
    }

    function hide() {
        let result = document.getElementById("result");

        if (result == null) return;

        let classList = result.classList;

        if (classList.contains("absolute")) {
            classList.remove("absolute");
            classList.add("hidden");
        }
    }

    return (
        <div className=" bg-neutral-800 shadow-sm shadow-black">
            <div className="max-w-[1600px] h-14 mx-auto flex items-center justify-between">
                <Link to={"/"}
                    className="flex items-center gap-2 text-2xl text-stone-300">
                    <GlobeHemisphereWest size={30} color="#48B2E9" />
                    MARKETING
                </Link>

                <div className="flex flex-col items-center">
                    <input
                        className="w-80 h-9 bg-neutral-900 rounded-lg text-[#ffffffec] text-center outline-none border-2 border-neutral-800 hover:border-2 hover:border-neutral-500 placeholder:uppercase placeholder:text-[#ffffffa4]"
                        type="text"
                        placeholder="Pesquisar"
                        onKeyUp={event => showResults(event.currentTarget.value)}
                        onBlur={() => hide()}
                    />

                    <div
                        className="hidden w-96 top-12 h-[200px] max-h-[200px] shadow-md shadow-black bg-neutral-900 overflow-y-auto overflow-x-hidden"
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

                                        <div className="flex flex-col max-h-[60px] overflow-hidden">
                                            <span className="truncate">
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
                </div>

                <div className="flex gap-3 uppercase text-stone-300 leading-5">
                    <Link to={"/"}
                        className="flex items-center gap-2">
                        <House size={20} color="#48B2E9" weight={props.home ? "fill" : "regular"} />
                        Inicio
                    </Link>

                    <Link to={"/"}
                        className="flex items-center gap-2">
                        <User size={20} color="#48B2E9" weight={props.account ? "fill" : "regular"} />
                        Conta
                    </Link>
                </div>
            </div>
        </div>
    );
}
