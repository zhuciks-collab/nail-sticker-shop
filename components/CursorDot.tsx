"use client";
import { useEffect, useRef } from "react";

export default function CursorDot() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (e: MouseEvent) => {
      el.style.left = e.clientX + "px";
      el.style.top  = e.clientY + "px";
    };
    const big  = () => el.classList.add("big");
    const small = () => el.classList.remove("big");
    document.addEventListener("mousemove", move);
    document.querySelectorAll("a,button,[data-cursor]").forEach(el => {
      el.addEventListener("mouseenter", big);
      el.addEventListener("mouseleave", small);
    });
    return () => document.removeEventListener("mousemove", move);
  }, []);
  return <div ref={ref} className="cursor" />;
}
