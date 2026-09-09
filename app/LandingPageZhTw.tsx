/* eslint-disable @next/next/no-img-element -- pre-optimized editorial WebP assets are rendered directly */
"use client";

import { LangSwitch } from "./LangSwitch";
import { AppScreens } from "./AppScreens";
import { Brand, Scene } from "./Sections";
import { ASSET_PREFIX } from "./site";
import { StoreLink } from "./StoreLink";
import { useReveal } from "./useReveal";

// 繁體中文落地頁。沿用英文版版型，台灣素材獨立保存。
//
// 文案紅線（全部依當前原始碼查證，不是依舊文件）：
// ⛔ 不寫「同城」「附近」——feed 全球互通，刻意沒有同城 filter
//    （docs/UIUX_PLAN.md 第 2 節；PostCard.tsx:86 距離已不顯示）。
// ⛔ 不寫「配對」「match」——全專案禁用詞。
// ⛔ 不承諾一定會遇到人、不承諾成功。
// ⛔ 此刻不宣稱「僅雙向解鎖可見」——src/lib/statuses.ts:10 註明 2026-07-15
//    起 Now 全域可見，statuses.ts:231 起改為同一個 region 可見，
//    不是只有雙向解鎖的人看得到。這裡只講「一小時後消失」這個確定為真的事。

export function LandingPageZhTw() {
  useReveal();

  return (
    <main id="top">
      <nav className="nav" aria-label="主要導覽">
        <a href="#top" className="nav__brand"><Brand /></a>
        <a href="#what-is-drift" className="nav__about">drift 是什麼</a>
        <div className="nav__end">
          <LangSwitch current="zh-TW" />
          <a
            className="nav__cta"
            href="#download"
          >
            下載 drift <span>↓</span>
          </a>
        </div>
      </nav>

      <section className="hero">
        <img
          className="hero__image"
          src={`${ASSET_PREFIX}/scenes/tw/bookstore.webp`}
          alt="兩個人在台灣書店裡，各自翻著喜歡的書"
        />
        <div className="hero__veil" />
        <div className="hero__copy">
          <p className="eyebrow" data-reveal>從喜歡的事開始的交友</p>
          <h1 data-reveal>
            有些人，<br />
            <em>從喜歡的事就認得出來。</em>
          </h1>
          <p className="hero__body" data-reveal>
            一首重播的歌、一本捨不得看完的書。從日常裡的品味，慢慢認識一個人。
          </p>
          <div className="store-row store-row--hero">
            <StoreLink store="apple" placement="hero" locale="zh-TW" />
            <StoreLink store="google" placement="hero" locale="zh-TW" />
          </div>
        </div>
        <a className="hero__scroll" href="#what-is-drift">
          <span>看看 drift 是什麼樣子</span><i aria-hidden="true">↓</i>
        </a>
      </section>

      <section className="statement" id="what-is-drift">
        <div className="statement__index">01 — 起點</div>
        <p className="statement__lead" data-reveal>
          品味不太需要說出口。
          <br />
          <em>它會出現在你注意到的東西裡。</em>
        </p>
        <div className="statement__aside" data-reveal>
          <span>從一點喜歡。</span>
          <span>到一點好奇。</span>
        </div>
      </section>

      <Scene
        image={`${ASSET_PREFIX}/scenes/tw/cafe.webp`}
        alt="一個人坐在被雨打濕的咖啡館窗邊"
        eyebrow="當下 · 一天最多兩篇"
        title={<>今天的光，<br />今天拍下來。</>}
        copy="每天最多兩篇照片，都在 drift 裡當下拍攝。不用翻找相簿裡最好的自己，只留下今天讓你停了一下的片刻。"
        align="left"
        position="58% center"
      />

      <AppScreens group="moments" locale="zh-TW" />

      <section className="interlude interlude--dark">
        <div className="interlude__label">從哪裡開始</div>
        <div className="interlude__words" data-reveal>
          <span>一張照片。</span>
          <span>一首歌。一個地方。</span>
          <em>一個關於品味的小線索，就夠開始了。</em>
        </div>
      </section>

      <Scene
        image={`${ASSET_PREFIX}/scenes/after-rain.webp`}
        alt="兩個人同時注意到雨後的城市燈光"
        eyebrow="此刻 · 一小時後消失"
        title={<>一首歌、一個地方、<br />一句沒說完的話。</>}
        copy="分享正在聽的音樂、待著的地方，或一句此刻的心情。點開歌，聽一小段。狀態一小時後消失，把空間留給下一個當下。"
        align="right"
        position="center center"
      />

      <section className="details">
        <div className="details__intro" data-reveal>
          <p className="eyebrow">不用寫自我介紹</p>
          <h2>個人頁是<br />一組線索。</h2>
          <p>
            與其寫一段完美的自介，不如留下幾個真的屬於你的細節。
          </p>
        </div>
        <div className="details__list">
          <article data-reveal>
            <span>01</span>
            <h3>自訂標籤與個性表情</h3>
            <p>替喜歡的事命名、配上顏色，再選一個有你的樣子的表情。個人頁不必長篇大論，也能很像你。</p>
          </article>
          <article data-reveal>
            <span>02</span>
            <h3>手繪貼圖</h3>
            <p>在對話裡手繪一張貼圖傳出去，只有你會畫成那樣。</p>
          </article>
          <article data-reveal>
            <span>03</span>
            <h3>自訂訊息反應</h3>
            <p>用你自己的字回應一則訊息，不必從既定的表情裡挑一個。</p>
          </article>
          <article data-reveal>
            <span>04</span>
            <h3>會彈跳的小共鳴</h3>
            <p>喜歡一篇貼文，就留個反應。小泡泡在照片上彈來彈去，讓一句「我也喜歡」有了自己的樣子。</p>
          </article>
        </div>
      </section>

      <Scene
        image={`${ASSET_PREFIX}/scenes/bookstore.webp`}
        alt="兩位陌生人在獨立書店裡交換了一個眼神"
        eyebrow="交會 · 一天一次"
        title={<>先寫明信片，<br />再認識人。</>}
        copy="在還不知道會寄給誰的時候，先做一張明信片。之後它會和另一個人的明信片相遇，兩邊各自決定要不要繼續；都願意，對話才會打開。"
        align="left"
        position="center center"
      />

      <AppScreens group="character" locale="zh-TW" />

      <section className="human-grid">
        <div className="human-grid__photo human-grid__photo--laundromat" data-reveal>
          <img
            src={`${ASSET_PREFIX}/scenes/laundromat.webp`}
            alt="兩個人在深夜的自助洗衣店裡各自安靜著"
            loading="lazy"
          />
        </div>
        <div className="human-grid__copy" data-reveal>
          <p className="eyebrow">對話不趕時間</p>
          <h2>各五句話，然後兩次同意。</h2>
          <p>
            你們各有五句話，用來確認這份感覺有沒有地方可去。要無限制地聊下去，
            得兩個人都選擇繼續。
          </p>
          <blockquote>「喜歡的事讓人好奇，彼此同意才讓它繼續。」</blockquote>
        </div>
      </section>

      <AppScreens group="conversation" locale="zh-TW" />

      <section className="final-scene" id="download">
        <img
          className="final-scene__image"
          src={`${ASSET_PREFIX}/scenes/cinema.webp`}
          alt="兩位陌生人在社區電影院外看向彼此"
          loading="lazy"
        />
        <div className="final-scene__veil" />
        <div className="final-scene__copy" data-reveal>
          <Brand />
          <p className="eyebrow">現已上線</p>
          <h2>總有人和你<br />喜歡同樣的東西。</h2>
          <p>只是還沒認出彼此。</p>
          <div className="store-row store-row--final">
            <StoreLink store="apple" placement="final" locale="zh-TW" />
            <StoreLink store="google" placement="final" locale="zh-TW" />
          </div>
        </div>
      </section>

      <footer className="footer">
        <Brand dark />
        <p>一個安靜一點的交友方式。</p>
        <div>
          <a href="https://ievolnds.github.io/drift-legal/privacy.html" target="_blank" rel="noopener noreferrer">隱私權政策（另開新視窗）</a>
          <a href="mailto:howiechen.hc@gmail.com">聯絡我們</a>
          <span>© {new Date().getFullYear()} drift</span>
        </div>
        <small className="footer__legal">
          Apple 與 Apple 標誌是 Apple Inc. 在美國及其他國家或地區註冊的商標。
          Google Play 與 Google Play 標誌是 Google LLC 的商標。
        </small>
      </footer>
    </main>
  );
}
