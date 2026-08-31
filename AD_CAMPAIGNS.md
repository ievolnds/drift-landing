# drift — US launch creative pack

## The strategic idea

drift should not compete on “more matches.” That is the language of large swipe apps, and it turns a small early community into a weakness. The sharper promise is: **you can be noticed without having to market yourself.**

The initial audience is 23–34, urban, culturally curious, and already fluent in dating apps—but tired of profile optimization, repetitive openers, and collecting matches that go nowhere. They are likely to value independent cafés, books, live music, photography, design, neighborhood culture, and a quieter digital life. “Introvert” is not the targeting label; it is the emotional recognition in the creative.

The product advantages to repeat consistently are:

1. **A real moment comes before a profile.** Camera-first, limited posting makes the feed feel current rather than curated.
2. **Every hello has context.** A conversation begins from something a person actually noticed.
3. **Interest must be mutual.** Five messages each and a two-person unlock create a natural, low-pressure decision point.
4. **The city is part of the product.** Time of day, Now, Encounter, and postcards make connection feel local and serendipitous.

For the first US test, concentrate spend in one dense city cluster instead of targeting the entire country. The recommended pilot is Chicago, beginning with the connected North Side neighborhoods where the intended audience already moves between cafés, music venues, bookstores, universities, and transit. The working cap is **$10/day total**. Run one concept at a time long enough to judge qualified store traffic, then rotate the creative instead of splitting this small budget into several underfunded ad sets.

Optimize for **qualified App Store / Google Play clicks from the landing page**. Cross-check daily first-time downloads in App Store Connect and Google Play Console, but keep Meta’s funnel website-first; it does not depend on an app campaign or the Meta App SDK. A high ad click-through rate is not a win if `StoreClick` events do not follow.

---

## Ad 01 — Dating-app fatigue

**Audience insight:** They are not tired of people. They are tired of turning people into profiles.

**Image:** `public/ads/ad-01-less-swiping.png`

**Primary text**  
Maybe you’re not tired of meeting people. Maybe you’re tired of turning people into profiles. drift starts with one real moment in your city—and lets the rest unfold slowly.

**Headline**  
Less swiping. More noticing.

**On-image hook**
Less swiping. More noticing.

**Description**  
Meet people, not profiles.

**CTA**  
Download

**Visual rationale:** A shared train platform creates proximity and possibility without manufacturing a romance. The large blue-hour sky gives Meta’s interface room to breathe.

---

## Ad 02 — Quiet, creative people

**Audience insight:** They do not struggle to express themselves; they dislike being asked to perform on command.

**Image:** `public/ads/ad-02-no-performance.png`

**Primary text**  
Some people aren’t hard to know. They’re just tired of performing. On drift, a photo from right now can say more than a perfect profile ever could.

**Headline**  
You don’t have to perform here.

**On-image hook**
You don’t have to perform here.

**Description**  
Share a moment. Say hi.

**CTA**  
Download

**Visual rationale:** The café window turns two observers into one quiet moment. The subject reads as thoughtful and contemporary, not lonely or aspirationally polished.

---

## Ad 03 — City discovery

**Audience insight:** New residents and long-time locals want the city to feel personal again—not like a list of venues or profiles.

**Image:** `public/ads/ad-03-same-city.png`

**Primary text**  
The city feels different when someone notices the same small things you do. See it through people with a sensibility like yours, and let one honest moment become a conversation.

**Headline**  
Same city. Similar sensibility.

**On-image hook**
Same city. Similar sensibility.

**Description**  
Meet people through taste.

**CTA**  
Download

**Visual rationale:** Two people independently photograph the same after-rain light. It makes the city—not conventional attraction—the first shared interest.

---

## Ad 04 — Mutual, low-pressure connection

**Audience insight:** A smaller number of intentional conversations feels safer and more valuable than an endless queue of matches.

**Image:** `public/ads/ad-04-mutual-choice.png`

**Primary text**  
A little curiosity. Five messages each. Then the conversation opens only if you both choose it. No pressure. No collecting matches you’ll never meet.

**Headline**  
Five messages. Two yeses.

**On-image hook**
Five messages. Two yeses.

**Description**  
Keep talking when it’s mutual.

**CTA**  
Download

**Visual rationale:** The bookstore glance communicates mutual curiosity and inclusive possibility without showing intimacy that has not been earned.

---

## Execution notes

- Run each concept as its own ad so the emotional hook can be measured cleanly.
- Each 4:5 creative carries one short hook, the drift wordmark, and a restrained download cue. The ad must communicate its emotional promise even when the viewer never opens the caption.
- Keep body copy out of the image. The image earns attention; Meta’s primary text explains the product after the pause.
- Use the landing page for all Meta traffic, then let visitors choose App Store or Google Play.
- Do not lead with feature lists. Lead with recognition, then let the landing page explain the five-message and mutual-unlock mechanics.
- Avoid broad claims such as “find your person” or “the safest dating app.” drift’s credibility comes from precise product behavior, not promises it cannot guarantee.
- Meta Pixel `1807919130381082` sends `PageView` and custom `StoreClick` events. Keep UTM fields on every ad URL so store intent can be traced back to each concept.
