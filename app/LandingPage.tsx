/* eslint-disable @next/next/no-img-element -- pre-optimized editorial WebP assets are rendered directly */
"use client";

import { useEffect, type ReactNode } from "react";

const APP_STORE_URL = "https://apps.apple.com/us/app/drift-dting/id6788133398";
const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.howard.drift&hl=en_US&gl=US";
const ASSET_PREFIX = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

type Store = "apple" | "google";

function trackStoreClick(store: Store, placement: string) {
  const detail = { event: "store_click", store, placement };
  window.dispatchEvent(new CustomEvent("drift:store-click", { detail }));
  const dataLayer = (
    window as typeof window & { dataLayer?: Array<Record<string, string>> }
  ).dataLayer;
  dataLayer?.push(detail);
}

function StoreLink({
  store,
  placement,
  quiet = false,
}: {
  store: Store;
  placement: string;
  quiet?: boolean;
}) {
  const apple = store === "apple";

  return (
    <a
      className={`store-link${quiet ? " store-link--quiet" : ""}`}
      href={apple ? APP_STORE_URL : PLAY_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackStoreClick(store, placement)}
      aria-label={apple ? "Download drift for iPhone" : "Download drift for Android"}
    >
      <span>{apple ? "iPhone" : "Android"}</span>
      <b>Download free</b>
      <i aria-hidden="true">↗</i>
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
    document.documentElement.classList.add("js");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealNodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal], [data-scene]"),
    );

    if (reducedMotion) {
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
          href={APP_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackStoreClick("apple", "nav")}
        >
          Get drift <span>↗</span>
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
          <p className="eyebrow" data-reveal>A quieter social app for your city</p>
          <h1 data-reveal>
            Meet people<br />
            <em>before</em> profiles.
          </h1>
          <p className="hero__body" data-reveal>
            Share one real moment. Notice someone nearby. Let a conversation begin
            without having to sell yourself first.
          </p>
          <div className="store-row" data-reveal>
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
          Most social apps ask you to become a profile.
          <br />
          <em>drift asks what you noticed today.</em>
        </p>
        <div className="statement__aside" data-reveal>
          <span>Less presentation.</span>
          <span>More presence.</span>
        </div>
      </section>

      <Scene
        image={`${ASSET_PREFIX}/scenes/rain-cafe.webp`}
        alt="A thoughtful person sits by a rain-covered café window"
        eyebrow="A real moment comes first"
        title={<>No perfect profile.<br />Just something true.</>}
        copy="Post a photo from right now—the rainy window, the song still playing, the walk home you wanted to remember. A small moment is enough to be seen."
        align="left"
        position="58% center"
      />

      <section className="interlude interlude--dark">
        <div className="interlude__label">HOW IT STARTS</div>
        <div className="interlude__words" data-reveal>
          <span>Someone posts.</span>
          <span>Something resonates.</span>
          <em>A hello already has somewhere to begin.</em>
        </div>
      </section>

      <Scene
        image={`${ASSET_PREFIX}/scenes/after-rain.webp`}
        alt="Two people notice the same city light after rain"
        eyebrow="The city is part of the story"
        title={<>Someone nearby<br />noticed it too.</>}
        copy="See honest moments from people living in the same city. Distance stays approximate. The first connection is what caught your eye—not a résumé."
        align="right"
        position="center center"
      />

      <section className="details">
        <div className="details__intro" data-reveal>
          <p className="eyebrow">Quiet by design</p>
          <h2>Attention should<br />feel like something.</h2>
          <p>
            drift keeps the noise low so curiosity can stay human. There is less to
            collect, less to perform, and more reason to mean what you send.
          </p>
        </div>
        <div className="details__list">
          <article data-reveal>
            <span>01</span>
            <h3>Real-time posts</h3>
            <p>What is happening now, not a camera roll built to impress.</p>
          </article>
          <article data-reveal>
            <span>02</span>
            <h3>Approximate distance</h3>
            <p>Close enough to share a city. Private enough to keep your place.</p>
          </article>
          <article data-reveal>
            <span>03</span>
            <h3>No popularity contest</h3>
            <p>No follower counts, no like rankings, no endless queue to win.</p>
          </article>
        </div>
      </section>

      <Scene
        image={`${ASSET_PREFIX}/scenes/bookstore.webp`}
        alt="Two strangers exchange a glance in an independent bookstore"
        eyebrow="A slower way into conversation"
        title={<>Five messages each.<br />Then two yeses.</>}
        copy="You each have five messages to find out whether the feeling is real. The conversation opens only when both people choose to keep going."
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
          <p className="eyebrow">For the hours in between</p>
          <h2>Not every connection needs an opening line.</h2>
          <p>
            Sometimes it begins with the same late train. The same weather. The same
            oddly beautiful laundromat at 11:40 p.m. drift gives those moments somewhere
            to go.
          </p>
          <blockquote>“For people who still notice people.”</blockquote>
        </div>
      </section>

      <section className="final-scene">
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
          <h2>Your city is full<br />of almost hellos.</h2>
          <p>Notice one.</p>
          <div className="store-row">
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
      </footer>

      <a
        className="mobile-download"
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackStoreClick("apple", "mobile_sticky")}
      >
        <span><Brand dark /></span>
        <b>Download free</b>
        <i aria-hidden="true">↗</i>
      </a>
    </main>
  );
}
