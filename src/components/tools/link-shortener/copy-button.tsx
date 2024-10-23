"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface CopyButtonProps {
  value: string;
  className?: string;
}

export default function CopyButton({ value, className }: CopyButtonProps) {
  const [success, setSuccess] = useState(false);

  const copy = async () => {
    if (success) return;

    try {
      await navigator.clipboard.writeText(value);
      setSuccess(true);
    } catch (error) {
      console.error("Failed to copy: ", error);
    }
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <button
      onClick={copy}
      type="button"
      className={cn(
        "relative p-1 outline-none",
        success ? "cursor-default" : "cursor-pointer",
        className,
      )}
    >
      {success ? <Check size={16} /> : <Copy size={16} />}
    </button>
  );
}
