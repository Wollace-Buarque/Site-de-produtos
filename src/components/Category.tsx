import { ShoppingCart, PaperPlaneTilt } from "phosphor-react";
import Product from "./Product";

interface CategoryProps {
    name: string;
    products: {
        name: string,
        description: string,
        image: string,
        slug: string,
        value: number
    }[];
}

export default function Category(props: CategoryProps) {
    let products = props.products;
    products = products.sort(() => Math.random() - 0.5);

    return (
        <div className="flex flex-col mt-10 min-h-[451px]">

            <div className="flex w-full justify-between">
                <span className="flex items-center gap-2 font-semibold text-stone-300">
                    <ShoppingCart size={20} color="#48B2E9" />
                    {props.name}
                </span>
                <span className="flex items-center gap-2 font-semibold text-stone-300">
                    <PaperPlaneTilt size={20} color="#48B2E9" />
                    Próximo
                </span>
            </div>

            <div
                className="flex gap-3 py-3 px-11 overflow-hidden hover:overflow-x-auto productsbar">

                {products.map(product => (
                    <Product
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
