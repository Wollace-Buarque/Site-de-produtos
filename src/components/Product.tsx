import { Link } from "react-router-dom";
import { Link as LinkIcon } from "phosphor-react"
import { AllHTMLAttributes, Component, DOMAttributes } from "react";
import Spinner from "./Spinner";

interface ProductProps {
    name: string;
    description: string;
    image: string;
    slug: string;
    value: number;
}

export default function Product(props: ProductProps) {

    return (
        <div className="min-w-[368px] w-[368px] h-96 flex flex-col rounded bg-[#101010] hover:scale-[1.03] transition-transform">

            <ImageWithLoading
                src={props.image}
                className="w-full min-h-[11rem] max-h-[11rem] rounded-t bg-[#070707]"
                spinner={{ width: 50, borderWidth: 3, color: "#17171720", topColor: "#1D9BF0" }} />

            <span className="px-3 pt-3 text-lg font-semibold text-stone-300">
                {props.name}
            </span>

            <span className="px-3 pb-3 text-sm text-stone-400">
                R$ {props.value.toLocaleString('pt-BR')}
            </span>

            <p className="h-full px-3 text-sm leading-relaxed text-stone-400">
                {props.description}
            </p>

            <Link to={`/product/${props.slug}`}
                className="flex justify-center items-center gap-2 py-3 text-xs font-semibold text-[#4CC2FF]">
                <LinkIcon size={18} />
                ACESSAR
            </Link>
        </div>
    );
}

interface SpinnerProps {
    width?: number;
    borderWidth?: number;
    color?: string;
    topColor?: string;
}

interface ImageLoadingProps {
    spinner?: SpinnerProps;
}

export class ImageWithLoading extends Component<ImageLoadingProps & AllHTMLAttributes<HTMLImageElement> & DOMAttributes<HTMLImageElement>> {
    state = { isLoaded: false }

    componentDidMount() {
        const image = new Image();
        image.onload = () => this.setState({ isLoaded: true });
        image.src = this.props.src ?? "";
    }

    render() {
        const { src } = this.props;
        const { isLoaded } = this.state;

        return isLoaded
            ? <img
                src={src}
                width={this.props.width}
                height={this.props.height}
                className={this.props.className}
                onLoad={this.props.onLoad}
            />
            : <div className="flex justify-center items-center h-full">

                {this.props.spinner
                    ? <Spinner
                        width={this.props.spinner.width}
                        borderWidth={this.props.spinner.borderWidth}
                        color={this.props.spinner.color}
                        topColor={this.props.spinner.topColor} />
                    : <Spinner width={64} topColor="#4CC2FF" />}

            </div>
    }
}