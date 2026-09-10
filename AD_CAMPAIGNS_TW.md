# drift 台灣廣告素材與投放規格

更新：2026-09-10。品味 v1 已提交 Meta，行銷活動已開啟並顯示「檢閱中」；其餘三組仍為備用素材。尚無台灣曝光或安裝歸因證據。

## 本次發布與直式素材

- campaign `52588902730522`、adset `52588902730922`、ad `52588902730722`；沿用原單一活動，不新增付費活動。台灣、所有性別、Advantage+ 建議 25–44 歲，詳細興趣空白。
- 3 組版位已替換舊英文圖：動態消息／右欄用 `taste.png`，直式用 `public/ads/tw/taste-reels-v1.png`（941×1672）。手機動態消息、Facebook 插播 Reel 預覽的主標／品牌／圖片 CTA 無介面遮擋，未全面驗收其他版位。
- `/zh-tw`、繁中文案與標題、說明「分享日常，從五句招呼慢慢開始。」、下載 CTA；AI 素材揭露開啟；自動文字／創意強化仍關閉。
- 固定 UTM：`utm_source=meta&utm_medium=paid_social&utm_campaign=tw_taste_202609&utm_content=taste_v1&utm_term=tw_25_44`。年齡標籤代表建議受眾，非強制界線。
- 日預算 US$5.70，Meta 顯示日最高 US$9.98，結束仍為 2026-09-11 08:00 Asia/Taipei，未延長。
- 新直式圖由內建 imagegen 編輯既有 `taste.png`，保留成年女性讀書、背景成年男性及台北雨窗咖啡店。新增直式空間並將字收進安全區；不是程式重繪、不是假 App UI。來源生成檔 `exec-c8e60d9f-3d29-4599-b391-5a6a1e30301e.png`。
- 生成提示詞摘要：preserve the same people and Taipei rainy café photograph; elegant cream Traditional Chinese type; no text in top 17%, bottom 36%, right 16%; brand at 18%, headline at 23–36%, secondary at 39–41%, CTA at 59–61%. Exact text: drift / 有些人，從喜歡的事就認得出來。 / 從日常品味，慢慢認識一個人。 / 品味交友｜立即下載。最終以實際 Meta 預覽驗證，不以提示詞百分比冒充量測。

## 頁面與定位

- 台灣：https://drift-landing-ten.vercel.app/zh-tw
- 美國：https://drift-landing-ten.vercel.app/
- 入口維持網站流量 → 商店 → 安裝；不用 App promotion。
- 品味是起點：書、音樂、攝影、日常觀察與彼此同意。不宣稱附近篩選、交友成功率或已有多少同好。
- 台灣初始假設：25–44 歲、所有性別。單一廣告組合，不把小額預算拆成多個受眾。年齡若只是 Advantage+ 建議，報告必須明確區分，不能宣稱是硬限制。
- 美國近期點擊表現不是台灣安裝意願的證據。先看有效到站、商店點擊、完成註冊與首次發文，再判斷是否保留素材。

## 四組文案

### 1. 品味 — `public/ads/tw/taste.png`

圖片主文：有些人，從喜歡的事就認得出來。

內文：一首重播的歌、一本捨不得看完的書。有些喜歡，不用解釋太多。在 drift，從日常裡的品味，慢慢認識一個人。

標題：從喜歡的事開始認識

### 2. 書店 — `public/ads/tw/book.png`

圖片主文：喜歡同一本書，也許只是開始。

內文：不急著把自己寫成一份自我介紹。先分享今天注意到的片刻，看看誰也喜歡。

標題：把日常，留給懂得欣賞的人

### 3. 音樂 — `public/ads/tw/music.png`

圖片主文：今天這首歌，想讓誰聽見？

內文：有些心情，放一首歌就夠了。用 drift 的「此刻」分享正在聽的音樂，讓認識多一點日常。

標題：今天這首歌，想讓誰聽見？

### 4. 五句 — `public/ads/tw/five.png`

圖片主文：先聊五句。再一起決定。

內文：一句招呼，不必立刻變成無止盡的聊天。在 drift，各有五句話；彼此都願意，再把對話繼續。

標題：先聊五句。再一起決定。

## 投放與量測邊界

- 保留原單一付費 campaign；總額不得超過 US$10／日。
- 既有 daily budget 為 US$5.70，介面最高每日 US$9.98；不得自行增加或延長原結束日。
- 初期只用一組主素材，其餘作後續替換，不同時拆四份預算。
- 網站、素材、商店下載連結與受眾確認前，campaign 保持暫停。不能先開回美國。
- 四張為約 4:5；Reels／Stories 必須檢查裁切與文字安全區，不把自動裁切當作已驗證。
- 建議 UTM：`utm_source=meta&utm_medium=paid_social&utm_campaign=tw_taste_202609&utm_content=taste_v1`，其他素材各自命名。
- 同日、同時區比較花費、曝光、連結點擊、到站；Pixel 的商店點擊不是安裝，profile 建立不是歸因下載。
- 網站既有 StoreClick 新增 locale，不增加第三方追蹤供應商。不向公開網站寫入帳號資料、憑證或個資。

## 素材來源與提示詞規格

六張由內建 image_gen 產生（四張廣告、兩張無字場景），不是用戶照片。英文舊素材完整保留。

共同規格：台灣市場；自然、安靜的編輯攝影；台灣成年人物；雨天咖啡店、獨立書店、聽音樂與日常交會；暖奶油文字與深炭色氣氛；避免抽象風景、假 App UI、誇張肢體與交友成效承諾。

各廣告的逐字主文、品牌 drift 與「品味交友｜立即下載」見上方。場景圖不含任何字：一張雨窗咖啡店閱讀、一張獨立書店兩位成年人各自閱讀。原始完整生成提示詞保留在本次對話工具紀錄；以上為交付規格摘要。

官方徽章來源：

- Apple：`https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/zh-tw?size=250x83`
- Google：`https://play.google.com/intl/en_us/badges/static/images/badges/zh-tw_badge_web_generic.png`

徽章保持原圖，不重繪、不翻譯商標。
