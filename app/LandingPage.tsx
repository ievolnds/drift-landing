/* eslint-disable @next/next/no-img-element -- pre-optimized editorial WebP assets are rendered directly */
"use client";

import { useEffect, type ReactNode } from "react";

const APP_STORE_URL = "https://apps.apple.com/us/app/drift-dting/id6788133398";
const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.howard.drift&hl=en_US&gl=US";
const ASSET_PREFIX = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

type Store = "apple" | "google";

type TrackingValue = string | undefined;

type DriftWindow = typeof window & {
  dataLayer?: Array<Record<string, TrackingValue>>;
  fbq?: (
    action: "trackCustom",
    eventName: "StoreClick",
    parameters: Record<string, TrackingValue>,
  ) => void;
};

const ATTRIBUTION_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

function getAttribution() {
  const search = new URLSearchParams(window.location.search);

  return Object.fromEntries(
    ATTRIBUTION_KEYS.map((key) => [key, search.get(key) ?? undefined]),
  );
}

function trackStoreClick(store: Store, placement: string) {
  const detail = {
    event: "store_click",
    store,
    placement,
    page_path: window.location.pathname,
    ...getAttribution(),
  };
  window.dispatchEvent(new CustomEvent("drift:store-click", { detail }));
  const driftWindow = window as DriftWindow;
  driftWindow.dataLayer?.push(detail);
  driftWindow.fbq?.("trackCustom", "StoreClick", detail);
}

function StoreLink({
  store,
  placement,
}: {
  store: Store;
  placement: string;
}) {
  const apple = store === "apple";
  const label = apple ? "Download on the App Store" : "Get it on Google Play";

  return (
    <a
      className={`store-badge store-badge--${store}`}
      href={apple ? APP_STORE_URL : PLAY_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackStoreClick(store, placement)}
      aria-label={label}
    >
      <img
        src={`${ASSET_PREFIX}/store-badges/${apple ? "app-store.svg" : "google-play.png"}`}
        alt={label}
      />
    </a>
  );
}

function Brand({ dark = false }: { dark?: boolean }) {
  return (
    <span className={`brand${dark ? " brand--dark" : ""}`} aria-label="drift">
      drift<span>.</span>
    </span>
  );
}

function Scene({
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

export function LandingPage() {
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

  return (
    <main id="top">
      <nav className="nav" aria-label="Primary navigation">
        <a href="#top" className="nav__brand"><Brand /></a>
        <a href="#what-is-drift" className="nav__about">What is drift?</a>
        <a
          className="nav__cta"
          href="#download"
        >
          Get drift <span>↓</span>
        </a>
      </nav>

      <section className="hero">
        <img
          className="hero__image"
          src={`${ASSET_PREFIX}/scenes/station.webp`}
          alt="A woman pauses on a city train platform at night"
        />
        <div className="hero__veil" />
        <div className="hero__copy">
          <p className="eyebrow" data-reveal>A quieter social app for people with taste</p>
          <h1 data-reveal>
            Meet people<br />
            <em>through taste.</em>
          </h1>
          <p className="hero__body" data-reveal>
            Find your kind of people through the songs, places, photographs, and
            small details that make a city feel like yours.
          </p>
          <div className="store-row store-row--hero">
            <StoreLink store="apple" placement="hero" />
            <StoreLink store="google" placement="hero" />
          </div>
        </div>
        <a className="hero__scroll" href="#what-is-drift">
          <span>See how drift feels</span><i aria-hidden="true">↓</i>
        </a>
      </section>

      <section className="statement" id="what-is-drift">
        <div className="statement__index">01 — THE IDEA</div>
        <p className="statement__lead" data-reveal>
          People with taste rarely need to announce it.
          <br />
          <em>You recognize it in what they notice.</em>
        </p>
        <div className="statement__aside" data-reveal>
          <span>Same city.</span>
          <span>Similar sensibility.</span>
        </div>
      </section>

      <Scene
        image={`${ASSET_PREFIX}/scenes/rain-cafe.webp`}
        alt="A thoughtful person sits by a rain-covered café window"
        eyebrow="The daily feed"
        title={<>Taste appears in<br />what you notice.</>}
        copy="Take a photo inside drift—something from today, not an old highlight reel. See your city through people whose eye makes you pause."
        align="left"
        position="58% center"
      />

      <section className="interlude interlude--dark">
        <div className="interlude__label">HOW IT STARTS</div>
        <div className="interlude__words" data-reveal>
          <span>A photograph.</span>
          <span>A song. A place.</span>
          <em>One small sign of taste is enough to begin.</em>
        </div>
      </section>

      <Scene
        image={`${ASSET_PREFIX}/scenes/after-rain.webp`}
        alt="Two people notice the same city light after rain"
        eyebrow="Now · one hour"
        title={<>A song. A place.<br />A passing thought.</>}
        copy="Share what you're listening to, where the evening took you, or a short note. It disappears in an hour—just enough time to find someone on the same wavelength."
        align="right"
        position="center center"
      />

      <section className="details">
        <div className="details__intro" data-reveal>
          <p className="eyebrow">Recognize your people</p>
          <h2>Chemistry begins<br />with taste.</h2>
          <p>
            Before a long conversation, there is usually one small detail that makes
            you wonder who noticed it too.
          </p>
        </div>
        <div className="details__list">
          <article data-reveal>
            <span>01</span>
            <h3>Camera-only posts</h3>
            <p>Photographs taken today. No old archive polished for approval.</p>
          </article>
          <article data-reveal>
            <span>02</span>
            <h3>Resonate</h3>
            <p>A quiet way to say: I noticed that too.</p>
          </article>
          <article data-reveal>
            <span>03</span>
            <h3>Say hi</h3>
            <p>Begin with the moment that caught your attention, not a cold opening line.</p>
          </article>
        </div>
      </section>

      <Scene
        image={`${ASSET_PREFIX}/scenes/bookstore.webp`}
        alt="Two strangers exchange a glance in an independent bookstore"
        eyebrow="Encounter · once a day"
        title={<>A postcard before<br />a profile.</>}
        copy="Make one postcard without knowing who will receive it. drift brings two people together; each decides privately. When both say yes, the conversation opens fully."
        align="left"
        position="center center"
      />

      <section className="human-grid">
        <div className="human-grid__photo human-grid__photo--laundromat" data-reveal>
          <img
            src={`${ASSET_PREFIX}/scenes/laundromat.webp`}
            alt="Two people share a quiet late-night moment in a laundromat"
            loading="lazy"
          />
        </div>
        <div className="human-grid__copy" data-reveal>
          <p className="eyebrow">Conversation, without the rush</p>
          <h2>Five messages each. Then two yeses.</h2>
          <p>
            You each get five messages to see whether the feeling has somewhere to go.
            Unlimited conversation begins only when both people choose it.
          </p>
          <blockquote>“Taste creates curiosity. Mutual choice lets it continue.”</blockquote>
        </div>
      </section>

      <section className="final-scene" id="download">
        <img
          className="final-scene__image"
          src={`${ASSET_PREFIX}/scenes/cinema.webp`}
          alt="Two strangers glance at each other outside a neighborhood cinema"
          loading="lazy"
        />
        <div className="final-scene__veil" />
        <div className="final-scene__copy" data-reveal>
          <Brand />
          <p className="eyebrow">Available now</p>
          <h2>Your city already has<br />your kind of people.</h2>
          <p>You just have to notice each other.</p>
          <div className="store-row store-row--final">
            <StoreLink store="apple" placement="final" />
            <StoreLink store="google" placement="final" />
          </div>
        </div>
      </section>

      <footer className="footer">
        <Brand dark />
        <p>A quieter way to meet people in your city.</p>
        <div>
          <a href="https://ievolnds.github.io/drift-legal/privacy.html" target="_blank" rel="noopener noreferrer">Privacy</a>
          <a href="mailto:howiechen.hc@gmail.com">Contact</a>
          <span>© {new Date().getFullYear()} drift</span>
        </div>
        <small className="footer__legal">
          Apple and the Apple logo are trademarks of Apple Inc., registered in the
          U.S. and other countries. Google Play and the Google Play logo are trademarks
          of Google LLC.
        </small>
      </footer>
    </main>
  );
}
