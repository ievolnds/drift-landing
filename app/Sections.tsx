/* eslint-disable @next/next/no-img-element -- pre-optimized editorial WebP assets are rendered directly */
"use client";

import { type ReactNode } from "react";

// en 與 zh-TW 兩頁共用的版面元件，確保兩個語系的視覺完全一致。

export function Brand({ dark = false }: { dark?: boolean }) {
  return (
    <span className={`brand${dark ? " brand--dark" : ""}`} aria-label="drift">
      drift<span>.</span>
    </span>
  );
}

export function Scene({
  image,
  alt,
  eyebrow,
  title,
  copy,
  align = "left",
  position = "center",
}: {
  image: string;
  alt: string;
  eyebrow: string;
  title: ReactNode;
  copy: string;
  align?: "left" | "right";
  position?: string;
}) {
  return (
    <section className={`scene scene--${align}`} data-scene>
      <img
        className="scene__image"
        src={image}
        alt={alt}
        loading="lazy"
        style={{ objectPosition: position }}
      />
      <div className="scene__veil" />
      <div className="scene__number" aria-hidden="true" />
      <div className="scene__copy" data-reveal>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p className="scene__body">{copy}</p>
      </div>
    </section>
  );
}
