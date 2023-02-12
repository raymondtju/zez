import { useState } from "react";
import { DocumentDuplicateIcon } from "@heroicons/react/24/solid";

export default function ClipboardCopy({ text }) {
  const [isCopied, setIsCopied] = useState(false);

  async function copyTextToClipboard(text) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    }
  }

  const handleClick = () => {
    copyTextToClipboard(text)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className={`
          items-center p-2
        `}
      >
        <DocumentDuplicateIcon
          className={`
          ${isCopied ? "fill-red-200" : "fill-redGuy"} h-5 w-5 md:h-6 md:w-6
          `}
        />
      </button>
    </div>
  );
}
