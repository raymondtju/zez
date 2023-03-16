import clsx from "clsx";
import { useState } from "react";

interface ClipboardCopyProps {
  text: string;
}

export default function ClipboardCopy({ text }: ClipboardCopyProps) {
  const [isCopied, setIsCopied] = useState(false);

  async function copyTextToClipboard({
    text,
  }: {
    text: string;
  }): Promise<void> {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    }
  }

  const handleClick = () => {
    copyTextToClipboard({ text })
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
    <>
      <button
        onClick={handleClick}
        className={clsx(
          "items-center rounded-lg  px-2 py-0.5 text-sm ",
          "dark:bg-zinc-900 dark:text-zinc-100",
          `${isCopied ? "bg-primary text-white" : "bg-white text-primary"}`
        )}
      >
        Copy
      </button>
    </>
  );
}
