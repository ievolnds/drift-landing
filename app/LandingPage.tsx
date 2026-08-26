"use client";

import { useEffect } from "react";

const APP_STORE_URL =
  "https://apps.apple.com/us/app/drift-dting/id6788133398";
const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.howard.drift&hl=en_US&gl=US";

type StoreLinkProps = {
  store: "apple" | "google";
  className?: string;
  compact?: boolean;
};

function trackStoreClick(store: "apple" | "google", placement: string) {
  const detail = { event: "store_click", store, placement };
  window.dispatchEvent(new CustomEvent("drift:store-click", { detail }));

  const dataLayer = (
    window as typeof window & { dataLayer?: Array<Record<string, string>> }
  ).dataLayer;
  dataLayer?.push(detail);
}

function StoreLink({ store, className = "", compact = false }: StoreLinkProps) {
  const isApple = store === "apple";
  return (
    <a
      className={`store-link ${compact ? "store-link--compact" : ""} ${className}`}
      href={isApple ? APP_STORE_URL : PLAY_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      data-store={store}
      onClick={(event) =>
        trackStoreClick(store, event.currentTarget.dataset.placement ?? "page")
      }
      aria-label={isApple ? "Download drift on the App Store" : "Get drift on Google Play"}
    >
      {isApple ? (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M16.8 12.9c0-2.1 1.7-3.2 1.8-3.3a4 4 0 0 0-3.2-1.8c-1.4-.1-2.7.8-3.4.8-.7 0-1.7-.8-2.9-.8a4.2 4.2 0 0 0-3.5 2.1c-1.5 2.6-.4 6.5 1.1 8.6.7 1 1.6 2.2 2.7 2.1 1.1 0 1.5-.7 2.9-.7 1.3 0 1.7.7 2.9.7s2-1 2.7-2.1a9.4 9.4 0 0 0 1.2-2.5 3.6 3.6 0 0 1-2.3-3.1ZM14.5 6.4c.6-.8 1-1.9.9-3-.9 0-2 .6-2.7 1.4-.6.7-1.1 1.8-1 2.9 1 .1 2.1-.5 2.8-1.3Z" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3.6 2.5a2 2 0 0 0-.5 1.4v16.2c0 .5.2 1 .5 1.4L13 12 3.6 2.5Zm10.7 10.8-2.4 2.4-7.5 4.2 9.9-6.6Zm3.2-3.2-2.1 1.2-2.7-2.7-8.3-4.7 10 6.7 1-.5a2 2 0 0 1 2.1 0Zm0 3.8-2.1-1.2-2.7 2.7-8.3 4.7 10-6.7 1 .5a2 2 0 0 0 2.1 0Z" />
        </svg>
      )}
      <span>
        {!compact && <small>{isApple ? "Download on the" : "GET IT ON"}</small>}
        <strong>{isApple ? "App Store" : "Google Play"}</strong>
      </span>
    </a>
  );
}

function DriftMark({ dark = false }: { dark?: boolean }) {
  return (
    <span className={`drift-mark ${dark ? "drift-mark--dark" : ""}`} aria-label="drift">
      d<span className="drift-mark__dot" />
    </span>
  );
}

function FeedPhone() {
  return (
    <div className="phone phone--hero" aria-label="A preview of the drift feed">
      <div className="phone__island" />
      <div className="phone__topline">
        <DriftMark dark />
        <span>Chicago</span>
        <span className="phone__avatar">M</span>
      </div>
      <div className="post-card">
        <div className="post-card__photo post-card__photo--night">
          <span className="post-card__time">11:42 PM</span>
          <span className="post-card__frame">still awake</span>
          <span className="post-card__moon">◐</span>
        </div>
        <div className="post-card__meta">
          <div>
            <strong>night sparrow</strong>
            <span>0.8 mi · deep night</span>
          </div>
          <button type="button" tabIndex={-1}>say hi</button>
        </div>
        <p>The last train sounds softer when you’re not rushing for it.</p>
        <div className="post-card__reactions">
          <span>resonates · 3</span>
          <span>···</span>
        </div>
      </div>
      <div className="phone__tabs">
        <span className="is-active">nearby</span>
        <span>post</span>
        <span>messages</span>
      </div>
    </div>
  );
}

function ConversationPhone() {
  return (
    <div className="phone phone--conversation" aria-label="A preview of a drift conversation">
      <div className="phone__island" />
      <div className="chat__header">
        <span>‹</span>
        <div>
          <strong>night sparrow</strong>
          <small>3 of 5 messages</small>
        </div>
        <span>•••</span>
      </div>
      <div className="chat__origin">This conversation began with a real moment.</div>
      <div className="chat__day">Tonight</div>
      <div className="bubble bubble--them">Do you always take the last train?</div>
      <div className="bubble bubble--me">Only when the city feels worth staying for.</div>
      <div className="bubble bubble--them">That might be the best reason.</div>
      <div className="unlock-card">
        <span>3 / 5</span>
        <strong>Keep it unhurried.</strong>
        <p>When you both choose to unlock, the conversation can continue.</p>
      </div>
      <div className="chat__composer"><span>Write something true</span><b>↑</b></div>
    </div>
  );
}

function MomentCard({ variant, label, note }: { variant: string; label: string; note: string }) {
  return (
    <article className={`moment-card moment-card--${variant}`}>
      <div className="moment-card__visual">
        <span className="moment-card__grain" />
        <span className="moment-card__label">{label}</span>
      </div>
      <p>{note}</p>
    </article>
  );
}

export function LandingPage() {
  useEffect(() => {
    document.documentElement.classList.add("js");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const reveals = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    if (reducedMotion) {
      reveals.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -7%" },
    );

    reveals.forEach((element) => observer.observe(element));

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
    <main>
      <nav className="nav-shell" aria-label="Primary navigation">
        <a href="#top" className="nav__brand"><DriftMark /></a>
        <div className="nav__links">
          <a href="#how">How it feels</a>
          <a href="#different">Why drift</a>
        </div>
        <StoreLink store="apple" compact className="nav__download" />
      </nav>

      <section className="hero" id="top">
        <div className="hero__orb hero__orb--one" />
        <div className="hero__orb hero__orb--two" />
        <div className="hero__copy">
          <p className="eyebrow" data-reveal>A quieter social app for your city</p>
          <h1 data-reveal>Meet people,<br /><em>not profiles.</em></h1>
          <p className="hero__lede" data-reveal>
            Share what’s happening now. Notice someone living in the same city.
            Say hi without having to perform.
          </p>
          <div className="hero__stores" data-reveal>
            <StoreLink store="apple" />
            <StoreLink store="google" />
          </div>
          <p className="hero__aside" data-reveal>Free to download · Built for iPhone and Android</p>
        </div>
        <div className="hero__device" data-reveal>
          <div className="hero__halo" />
          <FeedPhone />
          <div className="floating-note floating-note--one"><span>◌</span> one honest moment</div>
          <div className="floating-note floating-note--two"><span>+</span> someone nearby noticed</div>
        </div>
        <div className="hero__facts" data-reveal>
          <span><b>02</b> real-time posts a day</span>
          <span><b>05</b> messages each</span>
          <span><b>02</b> people choose what’s next</span>
        </div>
      </section>

      <section className="manifesto">
        <p className="eyebrow" data-reveal>The part most apps skip</p>
        <h2 data-reveal>
          You are more interesting<br />
          <span>before you explain yourself.</span>
        </h2>
        <p className="manifesto__body" data-reveal>
          Drift begins with the small things: the song you kept on repeat, the light
          outside the laundromat, the thought you almost didn’t post. Less presentation.
          More presence.
        </p>
        <div className="moments" data-reveal>
          <MomentCard variant="window" label="late afternoon" note="Light staying a little longer." />
          <MomentCard variant="coffee" label="somewhere quiet" note="No caption needed. Almost." />
          <MomentCard variant="train" label="deep night" note="Still moving through the same city." />
        </div>
      </section>

      <section className="how" id="how">
        <div className="how__intro" data-reveal>
          <p className="eyebrow">A slower way in</p>
          <h2>Nothing to win.<br />Something to notice.</h2>
        </div>
        <div className="steps">
          <article className="step" data-reveal>
            <div className="step__number">01</div>
            <div className="step__copy">
              <h3>Post what is actually happening.</h3>
              <p>Take a photo in the moment. No camera-roll archaeology, no perfect profile to maintain.</p>
            </div>
            <div className="capture-card">
              <div className="capture-card__scene"><i /><span>now</span></div>
              <div className="capture-card__footer"><b>one frame</b><span>captured at 6:18 PM</span></div>
            </div>
          </article>

          <article className="step step--reverse" data-reveal>
            <div className="step__number">02</div>
            <div className="step__copy">
              <h3>Start with what caught your eye.</h3>
              <p>Say hi from a real post, so there is already something human to talk about.</p>
            </div>
            <div className="sayhi-card">
              <span className="sayhi-card__from">from an evening post</span>
              <blockquote>“This feels like a place worth missing your train for.”</blockquote>
              <div><span>night sparrow</span><button type="button" tabIndex={-1}>say hi</button></div>
            </div>
          </article>

          <article className="step" data-reveal>
            <div className="step__number">03</div>
            <div className="step__copy">
              <h3>Let interest be mutual.</h3>
              <p>You each get five messages. The conversation opens only when both people want more.</p>
            </div>
            <div className="unlock-visual">
              <span>you</span><i className="unlock-visual__line" /><b>both chose<br />to continue</b><i className="unlock-visual__line" /><span>them</span>
            </div>
          </article>
        </div>
      </section>

      <section className="different" id="different">
        <div className="different__copy">
          <p className="eyebrow" data-reveal>Quiet by design</p>
          <h2 data-reveal>No follower counts.<br />No like rankings.<br />No endless feed.</h2>
          <p data-reveal>
            Drift gives attention a little weight again. Posts are limited. Distance is
            approximate. Conversations stay small until they feel worth opening.
          </p>
          <ul data-reveal>
            <li><span>now</span> Share a one-hour status with people you’ve unlocked.</li>
            <li><span>resonates</span> Leave a quiet signal without turning it into a score.</li>
            <li><span>postcards</span> Send something that arrives slowly, on purpose.</li>
          </ul>
        </div>
        <div className="different__phone" data-reveal>
          <ConversationPhone />
        </div>
      </section>

      <section className="signal">
        <p data-reveal>Made for the people still paying attention.</p>
        <div className="signal__ticker" aria-hidden="true">
          <div>
            <span>late walkers</span><i>✦</i><span>quiet romantics</span><i>✦</i>
            <span>new-in-town regulars</span><i>✦</i><span>people who notice the light</span><i>✦</i>
            <span>late walkers</span><i>✦</i><span>quiet romantics</span><i>✦</i>
            <span>new-in-town regulars</span><i>✦</i><span>people who notice the light</span><i>✦</i>
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="final-cta__glow" />
        <div data-reveal>
          <DriftMark />
          <h2>Someone in your city<br />noticed it too.</h2>
          <p>Start with a moment. See where it drifts.</p>
          <div className="hero__stores final-cta__stores">
            <StoreLink store="apple" />
            <StoreLink store="google" />
          </div>
        </div>
      </section>

      <footer>
        <DriftMark dark />
        <p>Meet people, not profiles.</p>
        <div>
          <a href="https://ievolnds.github.io/drift-legal/privacy.html" target="_blank" rel="noopener noreferrer">Privacy</a>
          <a href="mailto:howiechen.hc@gmail.com">Contact</a>
          <span>© 2026 drift</span>
        </div>
      </footer>

      <div className="mobile-download">
        <div><DriftMark dark /><span>A quieter way to meet.</span></div>
        <StoreLink store="apple" compact className="mobile-download__button" />
      </div>
    </main>
  );
}
