import Header from "../components/Header";
import Spinner from "../components/Spinner";

export default function Loading() {
    document.title = "Tailwind";

    return (
        <div>
            <Header />

            <main className="mx-auto max-w-[1600px] flex justify-center py-5">
                <Spinner width={45} topColor="#4CC2FF" />
            </main>
        </div>
    );
}
