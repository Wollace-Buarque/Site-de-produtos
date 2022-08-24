import Content from "../components/Content";
import Header from "../components/Header";

export default function Home() {
    document.title = "Marketing";
    return (
        <div>
            <Header home />
            <Content />
        </div>
    );
}