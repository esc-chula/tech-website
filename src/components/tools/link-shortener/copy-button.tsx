"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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
    <Button
      variant="transparent"
      className={cn(success ? "cursor-default" : "cursor-pointer", className)}
      onClick={copy}
    >
      {success ? <Check size={16} /> : <Copy size={16} />}
    </Button>
  );
}
