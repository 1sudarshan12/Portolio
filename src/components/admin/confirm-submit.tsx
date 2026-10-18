"use client";

import * as React from "react";
import { Button, type ButtonProps } from "@/components/ui/button";

export function ConfirmSubmit({
  confirmText = "Are you sure? This can't be undone.",
  children,
  ...props
}: ButtonProps & { confirmText?: string }) {
  function onClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (!window.confirm(confirmText)) {
      e.preventDefault();
      return;
    }
    const form = e.currentTarget.form;
    if (form) {
      e.preventDefault();
      form.requestSubmit();
    }
  }

  return (
    <Button type="submit" onClick={onClick} {...props}>
      {children}
    </Button>
  );
}
