import { useState } from "react";

type ToastMessage = {
  message: string;
  type: "error" | "success";
};

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (message: string, type: "error" | "success") => {
    setToasts((prevToasts) => [...prevToasts, { message, type }]);
  };

  const removeToast = (index: number) => {
    setToasts((prevToasts) => prevToasts.filter((_, i) => i !== index));
  };

  return {
    toasts,
    addToast,
    removeToast,
  };
};
