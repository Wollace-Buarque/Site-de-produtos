import { Link } from "react-router-dom";
import { Link as LinkIcon } from "phosphor-react"

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
            <img
                className="w-full h-44 rounded-t bg-[#070707]"
                src={props.image} />

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
                className="flex justify-center items-center gap-2 py-3 text-xs font-semibold text-[#48B2E9]">
                <LinkIcon size={18} />
                ACESSAR
            </Link>
        </div>
    );
}