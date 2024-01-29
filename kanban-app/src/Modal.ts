import { useEffect, useRef, ReactNode } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children }: { children?: ReactNode }) => {
  const modalRef = useRef<HTMLElement | null>(null);

  if (!modalRef.current) {
    modalRef.current = document.createElement("div");
  }
  useEffect(() => {
    const holder = document.getElementById("modal");
    if (holder !== null) {
      holder.appendChild(modalRef.current as HTMLElement);
      return () => {
        holder.removeChild(modalRef.current as HTMLElement);
      };
    }
  }, []);

  return createPortal(children, modalRef.current);
};

export default Modal;
