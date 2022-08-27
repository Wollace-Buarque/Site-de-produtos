import { ShoppingCart, PaperPlaneTilt, SortDescending, SortAscending, Funnel } from "phosphor-react";
import { useEffect, useState } from "react";
import Product from "./Product";
import Spinner from "./Spinner";

interface CategoryProps {
    name: string;
    products: {
        id: number,
        name: string,
        description: string,
        image: string,
        slug: string,
        value: number
    }[];
}

export default function Category(props: CategoryProps) {
    let products = props.products.sort(() => Math.random() - 0.5);

    let [iconWeight, setIconWeight] = useState<{ product: boolean, next: boolean }>({ product: true, next: false });

    let element: HTMLElement;

    function scrollLoop() {

        setInterval(() => {
            if (!element) return;

            if (element.matches(":hover")) {
                setIconWeight({ product: false, next: false });
                return;
            }

            if (Math.random() * 100 > 50) {

                let random = Math.random() * 100;
                let left = random > 50 ? element.scrollWidth : 0;

                setIconWeight({ product: random <= 50, next: random > 50 });

                element.scrollTo({
                    top: 0,
                    left: left,
                    behavior: "smooth",
                });
            }

        }, 5000);
    }

    useEffect(() => {
        let timeoutId = setTimeout(() => {
            scrollLoop();
        }, 500);

        return () => clearTimeout(timeoutId);
    }, []);

    if (!products) {
        return (
            <div className="flex justify-center py-5">
                <Spinner width={45} topColor="#4CC2FF" />
            </div>
        );
    }

    return (
        <div className="flex flex-col mt-10 min-h-[451px]">

            <div className="flex w-full justify-between">
                <span className="flex items-center gap-2 font-semibold text-stone-300">
                    <ShoppingCart size={20} color="#4CC2FF" weight={iconWeight.product ? "fill" : "regular"} />
                    {props.name}
                </span>

                <span className="flex items-center gap-2 font-semibold text-stone-300">
                    <PaperPlaneTilt size={20} color="#4CC2FF" weight={iconWeight.next ? "fill" : "regular"} />
                    Próximo
                </span>
            </div>

            <div
                onLoad={event => element = event.currentTarget}
                className="flex gap-3 py-3 px-11 overflow-hidden hover:overflow-x-auto productsbar">

                {products.map(product => (
                    <Product
                        key={product.id}
                        name={product.name}
                        description={product.description}
                        image={product.image}
                        value={product.value}
                        slug={product.slug} />
                ))}

            </div>
        </div>
    );
}
