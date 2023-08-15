import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children }) => {
  const modalRef = useRef(null);

  if (!modalRef.current) {
    modalRef.current = document.createElement("div");
  }
  useEffect(() => {
    const holder = document.getElementById("modal");
    holder.appendChild(modalRef.current);

    return () => holder.removeChild(modalRef.current);
  }, []);

  return createPortal(children, modalRef.current);
};

export default Modal;
