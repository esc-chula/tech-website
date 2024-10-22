"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface CopyButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  copyText: string;
}

export default function CopyButton(props: CopyButtonProps) {
  const [success, setSuccess] = useState(false);

  const copy = async () => {
    if (success) return;

    try {
      await navigator.clipboard.writeText(props.copyText);
      setSuccess(true);
    } catch (error) {
      console.error("Failed to copy: ", error);
    }
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <button
      {...props}
      onClick={copy}
      className={cn(
        "relative p-1 outline-none",
        success ? "cursor-default" : "cursor-pointer",
        props.className,
      )}
    >
      {success ? <Check size={16} /> : <Copy size={16} />}
    </button>
  );
}
