import Header from "../components/Header";
import Login from "../components/Login";

export default function SignIn() {

    return (
        <div className="flex flex-col h-screen">
            <Header noSearch account />

            <main className="mx-auto max-w-[1600px] w-full h-full flex justify-center items-center">

                <Login />

            </main>
        </div>
    );
}