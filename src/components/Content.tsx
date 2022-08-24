import Category from "./Category";
import products from "../data/products";

export default function Content() {

    function scrollLoop() {
        let scrollBars = document.querySelectorAll('.productsbar');

        setInterval(() => {
            scrollBars.forEach(element => {
                if (element.matches(":hover")) return;

                if (Math.random() * 100 > 50) {
                    element.scrollTo({
                        top: 0,
                        left: Math.random() * 100 > 50 ? element.scrollWidth : 0,
                        behavior: "smooth",
                    });
                }

            });
        }, 5000);
    }

    setTimeout(() => {
        scrollLoop();
    }, 500);

    return (
        <main className="mx-auto max-w-[1600px]">
            <Category name="Jogos" products={products} />
            <Category name="Produtos" products={products} />
        </main>
    );
}