"use client";

import { useEffect } from "react";

// 兩個語系共用的進場揭露效果。抽出來是為了讓 en 與 zh-TW 的動作行為不會各自漂移。
// 尊重 prefers-reduced-motion；IntersectionObserver 不存在時直接全部顯示，
// 不讓內容卡在不可見狀態。
export function useReveal() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealNodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal], [data-scene]"),
    );

    if (reducedMotion || typeof window.IntersectionObserver === "undefined") {
      revealNodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8%" },
    );

    document.documentElement.classList.add("motion-ready");
    revealNodes.forEach((node) => observer.observe(node));

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        document.documentElement.style.setProperty("--scroll-y", `${window.scrollY}px`);
        frame = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      document.documentElement.classList.remove("motion-ready");
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);
}
