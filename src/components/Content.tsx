import Category from "./Category";
import products from "../data/products";

export default function Content() {
    const test = "hi" || [];
    
    return (
        <main className="mx-auto max-w-[1600px]">
            <Category key={Math.random() * 9999} name="Jogos" products={products} />
            <Category key={Math.random() * 9999} name="Produtos" products={products} />
        </main>
    );
}