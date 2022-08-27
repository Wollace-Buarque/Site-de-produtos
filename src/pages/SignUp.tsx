import Header from "../components/Header";
import Register from "../components/Register";

export default function SignUp() {

    return (
        <div className="flex flex-col h-screen">
            <Header noSearch account />

            <main className="mx-auto max-w-[1600px] w-full h-full flex justify-center items-center">

                <Register />

            </main>
        </div>
    );
}