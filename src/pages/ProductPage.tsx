import { GameController, Wallet } from "phosphor-react";
import { SyntheticEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import products from "../data/products";
import Error from "./Error";

interface Product {
    id: number;
    name: string;
    description: string;
    image: string;
    slug: string;
    value: number;
}

function getProductBySlug(slug: string): Product | null {
    return products.filter(product => product.slug === slug)[0];
}

export default function ProductPage() {
    const { slug } = useParams<({ slug: string })>();

    if (!slug) return <Error />; {/* Página de produto não encontrado */ }

    const product = getProductBySlug(slug);

    if (!product) return <Error />; {/* Página de produto não encontrado */ }

    document.title = product.name;

    return (
        <div>
            <Header />

            <main className="flex justify-center mx-auto max-w-[1600px]">
                <div className="flex flex-col items-center mt-10 w-[1000px]">

                    <img
                        className="rounded-md shadow-md shadow-black"
                        src={product.image}
                        width={1000} />

                    <h2 className="flex items-center gap-3 text-4xl text-white py-5">
                        <GameController size={20} color="#48B2E9" />
                        {product.name}
                    </h2>

                    <p className="text-md text-gray-300 text-justify pb-4">
                        {product.description}
                    </p>

                    <span className="text-md pb-2">
                        R$ {product.value.toLocaleString("pt-BR")}
                    </span>

                    <button
                        className="flex items-center gap-2 py-4 px-16 rounded text-[#48B2E9] bg-neutral-900 border border-[#48B2E9] hover:bg-[#48B2E9] hover:text-black transition-colors">
                        <Wallet size={20} />
                        COMPRAR
                    </button>
                </div>
            </main>

        </div>
    );
}

// function getAverageRGB(imgEl: any) {

//     var blockSize = 5, // only visit every 5 pixels
//         defaultRGB = { r: 0, g: 0, b: 0 }, // for non-supporting envs
//         canvas = document.createElement('canvas'),
//         context = canvas.getContext && canvas.getContext('2d'),
//         data, width, height,
//         i = -4,
//         length,
//         rgb = { r: 0, g: 0, b: 0 },
//         count = 0;

//     if (!context) {
//         return defaultRGB;
//     }

//     height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
//     width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

//     context.drawImage(imgEl, 0, 0);

//     try {
//         data = context.getImageData(0, 0, width, height);
//     } catch (e) {
//         /* security error, img on diff domain */alert('x');
//         return defaultRGB;
//     }

//     length = data.data.length;

//     while ((i += blockSize * 4) < length) {
//         ++count;
//         rgb.r += data.data[i];
//         rgb.g += data.data[i + 1];
//         rgb.b += data.data[i + 2];
//     }

//     // ~~ used to floor values
//     rgb.r = ~~(rgb.r / count);
//     rgb.g = ~~(rgb.g / count);
//     rgb.b = ~~(rgb.b / count);

//     return rgb;
// }