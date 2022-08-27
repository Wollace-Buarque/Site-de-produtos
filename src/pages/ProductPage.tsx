import { GameController, Wallet } from "phosphor-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Description from "../components/Description";
import Header from "../components/Header";
import { ImageWithLoading } from "../components/Product";
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

    if (!slug) return <Error />;

    const product = getProductBySlug(slug);

    if (!product) return <Error />;

    document.title = product.name;

    let [color, setColor] = useState("#4CC2FF");

    useEffect(() => {

        let buttonQuery = document.querySelector('.button') as HTMLElement;

        updateButton(buttonQuery, `${color}90`);

        buttonQuery.addEventListener("mouseover", () => {
            updateButton(buttonQuery, `${color}90`);
        });

        buttonQuery.addEventListener("mouseout", () => {
            updateButton(buttonQuery, color);
        });

    }, [color]);

    function updateButton(button: HTMLElement, color: string) {
        button.style.borderColor = color;
        button.style.backgroundColor = color;
        button.style.color = getCorrectTextColor(color);
    }

    function updateColors(image: any) {
        const rgb = getAverageRGB(image.target);

        setColor(rgbToHex(rgb.r, rgb.g, rgb.b));
    }

    const rgbToHex = (r: number, g: number, b: number) => '#' + [r, g, b]
        .map(x => x.toString(16).padStart(2, '0')).join('');

    return (
        <div>
            <Header />

            <main className="flex justify-center mx-auto max-w-[1600px]">
                <div className="flex flex-col items-center mt-10 w-[1000px]">

                    <ImageWithLoading
                        onLoad={(event: any) => updateColors(event)}
                        src={product.image}
                        width={1000}
                        className="rounded-md shadow-md shadow-black max-h-[600px]"
                        spinner={{ width: 100, topColor: "#4CC2FF" }} />

                    <h2 className="flex items-center gap-3 text-4xl text-white py-5">
                        {product.name}
                    </h2>

                    <Description description={product.description} color={color} />

                    <span className="flex gap-2 text-md pb-2">
                        R$ {product.value.toLocaleString("pt-BR")}
                    </span>

                    <button
                        className="button mb-5">
                        {/* className="flex items-center gap-2 py-4 px-16 rounded text-white bg-black border border-black hover:bg-black hover:bg-opacity-80 transition-colors"> */}
                        <Wallet size={20} />
                        COMPRAR
                    </button>
                </div>
            </main>

        </div>
    );
}

function getAverageRGB(imgEl: any) {

    var blockSize = 5, // only visit every 5 pixels
        defaultRGB = { r: 0, g: 0, b: 0 }, // for non-supporting envs
        canvas = document.createElement('canvas'),
        context = canvas.getContext && canvas.getContext('2d'),
        data, width, height,
        i = -4,
        length,
        rgb = { r: 0, g: 0, b: 0 },
        count = 0;

    if (!context) {
        return defaultRGB;
    }

    height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
    width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

    context.drawImage(imgEl, 0, 0);

    try {
        data = context.getImageData(0, 0, width, height);
    } catch (e: any) {
        console.log(e);

        return defaultRGB; /* security error, img on diff domain */
    }

    length = data.data.length;

    while ((i += blockSize * 4) < length) {
        ++count;
        rgb.r += data.data[i];
        rgb.g += data.data[i + 1];
        rgb.b += data.data[i + 2];
    }

    // ~~ used to floor values
    rgb.r = ~~(rgb.r / count);
    rgb.g = ~~(rgb.g / count);
    rgb.b = ~~(rgb.b / count);

    return rgb;
}

function getCorrectTextColor(hex: any) {
    let threshold = 130; /* about half of 256. Lower threshold equals more dark text on dark background  */

    let hRed = hexToR(hex);
    let hGreen = hexToG(hex);
    let hBlue = hexToB(hex);


    function hexToR(h: any) { return parseInt((cutHex(h)).substring(0, 2), 16) }
    function hexToG(h: any) { return parseInt((cutHex(h)).substring(2, 4), 16) }
    function hexToB(h: any) { return parseInt((cutHex(h)).substring(4, 6), 16) }
    function cutHex(h: any) { return (h.charAt(0) == "#") ? h.substring(1, 7) : h }

    let cBrightness = ((hRed * 299) + (hGreen * 587) + (hBlue * 114)) / 1000;
    if (cBrightness > threshold) { return "#000000"; } else { return "#ffffff"; }
}