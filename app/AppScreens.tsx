/* eslint-disable @next/next/no-img-element -- lossless exports of approved store artwork */
"use client";

import { useEffect, useRef, useState } from "react";
import { ASSET_PREFIX, type Locale } from "./site";

type Group = "moments" | "character" | "conversation";
const screens = {
  feed: { file: "01-post-reactions", en: "A moment, and a little resonance", zh: "一個片刻，一點共鳴" },
  camera: { file: "02-camera-bookstore", en: "Photographs from right now", zh: "把此刻拍下來" },
  now: { file: "03-now-playing", en: "Let someone hear your day", zh: "讓人聽見你的此刻" },
  encounter: { file: "04-encounter", en: "One postcard. Two choices.", zh: "一張明信片，兩個人的選擇" },
  profile: { file: "05-profile", en: "Little details that feel like you", zh: "把喜歡的細節，留在個人頁" },
  sticker: { file: "06-sticker", en: "Something only you could draw", zh: "只有你會這樣畫" },
  chat: { file: "07-chat", en: "A conversation you both choose", zh: "彼此都想繼續的對話" },
  reaction: { file: "08-reaction", en: "A reaction in your own words", zh: "用自己的話，回應一句話" },
} as const;

const groups = {
  moments: {
    ids: ["feed", "camera", "now"],
    en: { label: "Inside drift / 01", title: "Small moments.\nSomething in common.", copy: "A photograph from today. A song playing now. A small reaction that says you noticed, too." },
    zh: { label: "App 裡的日常 / 01", title: "從一個片刻，\n看見一點相似。", copy: "今天拍的照片、此刻聽的歌，還有在貼文上彈跳的小反應。喜歡的事，會替你開一點話題。" },
  },
  character: {
    ids: ["encounter", "profile"],
    en: { label: "Inside drift / 02", title: "A little curiosity.\nA little character.", copy: "Begin with a postcard. Discover the tags, symbols, and small details someone chose to leave behind." },
    zh: { label: "App 裡的相識 / 02", title: "一點好奇，\n慢慢有了輪廓。", copy: "從交會的一張明信片，到個人頁的自訂標籤與個性表情。不急著定義誰，先看看彼此喜歡什麼。" },
  },
  conversation: {
    ids: ["sticker", "chat", "reaction"],
    en: { label: "Inside drift / 03", title: "Make it\nyour kind of conversation.", copy: "Draw a sticker. Leave a reaction in your own words. Keep talking when you both want to." },
    zh: { label: "App 裡的對話 / 03", title: "把對話，\n聊成你們的樣子。", copy: "手繪一張貼圖，用自己的字或表情回應。各有五句話，彼此都願意，再讓對話繼續。" },
  },
} as const;

export function AppScreens({ group, locale }: { group: Group; locale: Locale }) {
  const zh = locale === "zh-TW";
  const config = groups[group];
  const copy = config[zh ? "zh" : "en"];
  const rail = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [active, setActive] = useState(0);
  const items = config.ids.map((id) => screens[id]);
  const note = zh
    ? "取自 App Store 的 iOS 英文版實際畫面；App 支援繁體中文。"
    : "Actual iOS screens from our App Store gallery.";

  useEffect(() => {
    if (selected === null) return;
    const modal = dialog.current;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    modal?.showModal();
    return () => {
      modal?.close();
      document.body.style.overflow = overflow;
      opener.current?.focus({ preventScroll: true });
    };
  }, [selected]);

  function move(direction: number) {
    const next = Math.max(0, Math.min(items.length - 1, active + direction));
    const item = rail.current?.children[next] as HTMLElement | undefined;
    if (rail.current && item) {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      rail.current.scrollTo({ left: item.offsetLeft - 4, behavior: reduced ? "auto" : "smooth" });
    }
  }

  return (
    <section className="app-screens" aria-labelledby={`screens-${group}`}>
      <header className="app-screens__intro" data-reveal>
        <p className="eyebrow">{copy.label}</p>
        <h2 id={`screens-${group}`}>{copy.title}</h2>
        <p>{copy.copy}</p>
        <small>{note}</small>
      </header>
      <div className="app-screens__gallery">
        <div className="app-screens__controls">
          <span>{zh ? "左右滑動，點圖放大" : "Swipe to explore. Tap to enlarge."}</span>
          <div>
            <button type="button" onClick={() => move(-1)} disabled={active === 0} aria-label={zh ? "上一張 App 畫面" : "Previous app screen"}>←</button>
            <span aria-live="polite" aria-atomic="true">{active + 1} / {items.length}</span>
            <button type="button" onClick={() => move(1)} disabled={active === items.length - 1} aria-label={zh ? "下一張 App 畫面" : "Next app screen"}>→</button>
          </div>
        </div>
        <div className="app-screens__rail" ref={rail} onScroll={() => {
          const el = rail.current;
          if (!el) return;
          const width = (el.children[0] as HTMLElement)?.offsetWidth ?? 1;
          setActive(Math.min(items.length - 1, Math.round(el.scrollLeft / (width + 20))));
        }}>
          {items.map((screen, index) => {
            const caption = screen[zh ? "zh" : "en"];
            return (
              <figure key={screen.file}>
                <button type="button" className="app-screens__open" aria-label={`${zh ? "放大" : "Enlarge"}: ${caption}`} onClick={(event) => {
                  opener.current = event.currentTarget;
                  setSelected(index);
                }}>
                  <img src={`${ASSET_PREFIX}/app-screens/${screen.file}.webp`} alt={caption} width={1320} height={2868} loading="lazy" decoding="async" />
                </button>
                <figcaption><span>{String(index + 1).padStart(2, "0")}</span>{caption}</figcaption>
              </figure>
            );
          })}
        </div>
      </div>
      {selected !== null && (
        <dialog ref={dialog} className="screen-dialog" aria-label={items[selected][zh ? "zh" : "en"]} onCancel={() => setSelected(null)} onClose={() => setSelected(null)} onClick={(event) => { if (event.target === event.currentTarget) setSelected(null); }}>
          <div className="screen-dialog__content">
            <div className="screen-dialog__bar">
              <p>{items[selected][zh ? "zh" : "en"]}</p>
              <button type="button" autoFocus onClick={() => setSelected(null)}>{zh ? "關閉" : "Close"} ×</button>
            </div>
            <img src={`${ASSET_PREFIX}/app-screens/${items[selected].file}.webp`} alt={items[selected][zh ? "zh" : "en"]} width={1320} height={2868} />
            <p className="screen-dialog__note">{note}</p>
          </div>
        </dialog>
      )}
    </section>
  );
}
