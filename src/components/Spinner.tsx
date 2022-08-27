interface SpinnerProps {
    width?: number;
    borderWidth?: number;
    color?: string;
    topColor?: string;
}

export default function Spinner(props: SpinnerProps) {
    const width = props.width || 25;
    const color = props.color || "rgba(0, 0, 0, 0.25)";
    const topColor = props.topColor || "black";
    const borderWidth = props.borderWidth || 4;

    return (
        <span
            className={`flex rounded-full animate-spin`}
            style={{ width: width, height: width, borderWidth: borderWidth, borderTopWidth: borderWidth, borderColor: color, borderTopColor: topColor }}>
        </span>
    );
}