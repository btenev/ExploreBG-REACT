import { useRef, useState } from "react";
import { GiClick } from "react-icons/gi";

import useCloseOnEscapeTabAndClickOutside from "@hooks/uiHooks/useCloseOnEscapeTabAndClickOutside";

interface Props {
  text: string;
  length: number;
}

const ExpandableText = ({ text, length }: Props) => {
  const [isExpand, setIsExpand] = useState<boolean>(false);
  const textRef = useRef<HTMLDivElement>(null);

  useCloseOnEscapeTabAndClickOutside(textRef, () => setIsExpand(false));

  return (
    <div ref={textRef} onClick={() => setIsExpand(!isExpand)}>
      <p>
        {isExpand
          ? text
          : `${text.slice(0, length)}  ${text.length > length ? "....." : ""}`}
      </p>
      {text.length > length && (
        <span>
          click to {isExpand ? "close" : "expand"}
          <GiClick />
        </span>
      )}
    </div>
  );
};

export default ExpandableText;
