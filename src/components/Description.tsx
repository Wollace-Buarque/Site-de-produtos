import { ChatCenteredText } from "phosphor-react";
import { useState } from "react";

export default function Description(props: { description: string, color: string }) {
  const [showDescription, setShowDescription] = useState(true);

  return (
    <p className="flex gap-2 text-md text-gray-300 text-justify pb-4">
      <ChatCenteredText
        onClick={() => setShowDescription(!showDescription)}
        className="cursor-pointer"
        size={20}
        color={props.color} />

      {showDescription && props.description}
    </p>
  );
}