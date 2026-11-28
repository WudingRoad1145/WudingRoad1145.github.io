import { ReturnLink } from "@/components/HomeReturn";
import s from "./bridge.module.css";
import BridgePhotos from "./BridgePhotos";
import BridgeSpeech from "./BridgeSpeech";

export const metadata = {
  title: "Bridge 桥 — Yán Fēng",
  description:
    "A 2016 community project helping older adults use smartphones, through research, a booklet, and regular teaching sessions.",
};

export default function BridgePage() {
  return (
    <main className={s.page}>
      <header className={s.opening}>
        <div className={s.openingTop}>
          <ReturnLink>← Back to Work</ReturnLink>
          <span>2016 · Freshman year of high school</span>
        </div>
        <div className={s.hero}>
          <div className={s.heroCopy}>
            <span className={s.eyebrow}>Bridge / 桥</span>
            <h1>
              A little closer,
              <br />
              <em>one tap at a time</em>
            </h1>
            <p>
              Helping older adults become more comfortable with smartphones and
              everyday apps, through research, a booklet, and regular community
              teaching.
            </p>
          </div>
          <div className={s.heroKeepsakes}>
            <BridgePhotos
              layout="hero"
              photos={[
                {
                  file: "trying-the-phone.webp",
                  alt: "An older participant trying the steps on her smartphone",
                  caption: "one step at a time.",
                },
              ]}
            />
            <aside
              className={s.heroMemory}
              aria-label="A memory from our classes"
            >
              <p>
                I still vividly remember a grandma rushing in mid-lecture,
                grabbing me and asking:
              </p>
              <blockquote>
                “Why didn’t you announce that you were starting early today? I’m
                skipping my daily grocery shopping to be here!”
              </blockquote>
              <p>
                That was the moment I realized that what we were doing was
                really delivering value.
              </p>
            </aside>
          </div>
        </div>
        <dl className={s.facts}>
          <div>
            <dt>My role</dt>
            <dd>Team lead</dd>
          </div>
          <div>
            <dt>Our team</dt>
            <dd>Five students</dd>
          </div>
          <div>
            <dt>The work</dt>
            <dd>Research, a booklet, community teaching</dd>
          </div>
        </dl>
        <nav className={s.contents} aria-label="Bridge story sections">
          <a href="#bridge-listen">Begin with people</a>
          <a href="#bridge-booklet">The booklet</a>
          <a href="#bridge-community">Learning together</a>
          <a href="#bridge-tv">A little recognition</a>
        </nav>
      </header>

      <section
        className={`${s.chapter} ${s.listen}`}
        id="bridge-listen"
        aria-labelledby="listen-title"
      >
        <div className={s.chapterHeading}>
          <span className={s.eyebrow}>01 / Listen</span>
          <h2 id="listen-title">
            Begin with the person
            <br />
            <em>holding the phone</em>
          </h2>
        </div>
        <div className={s.prose}>
          <p>
            In 2016, my freshman year of high school, I led a team of five on a
            project called Bridge 桥. We wanted to help older adults use the
            technology that was becoming part of everyday life.
          </p>
          <p>
            We began by researching the difficulties people encountered with
            mobile phones and apps. That work became the foundation for a
            booklet and the teaching we did in the community. In hindsight, it
            feels like a very early, human-led version of today’s “computer
            use”: guiding older adults to tap the right things on screen, step
            by step.
          </p>
          <p>
            Looking back, this was an early experience of learning to explain
            something from a starting point different from my own. We had to
            think about what someone needed to understand before taking the next
            step.
          </p>
        </div>
      </section>

      <section
        className={`${s.chapter} ${s.booklet}`}
        id="bridge-booklet"
        aria-labelledby="booklet-title"
      >
        <div className={s.chapterHeading}>
          <span className={s.eyebrow}>02 / Make it useful</span>
          <h2 id="booklet-title">
            Something to
            <br />
            <em>come back to</em>
          </h2>
          <span className={s.handNote}>
            a guide can stay after a conversation ends.
          </span>
        </div>
        <div className={s.prose}>
          <p>We published a booklet explaining smartphone and app use.</p>
          <p>
            Making it meant turning familiar actions into instructions another
            person could follow. It gave our research a practical form:
            something people could return to, read at their own pace, and use
            alongside the teaching sessions.
          </p>
          <p>
            For the community classes, we also made a slide deck with each step
            on its own slide. We covered both Android and iPhone settings,
            because the phones people brought were different.
          </p>
        </div>
        <div className={s.teachingMaterials}>
          <BridgePhotos
            layout="single"
            photos={[
              {
                file: "teaching-slides.webp",
                alt: "Overview of the original Bridge teaching slides, with individual smartphone steps on separate slides",
                caption: "our teaching slides · 2017 community archive.",
              },
            ]}
          />
          <div className={s.translation}>
            <span className={s.eyebrow}>From our preparation notes</span>
            <blockquote lang="zh">
              将步骤拆分到每一页ppt，获得最清晰的效果
            </blockquote>
            <p>
              “Break the steps down onto individual slides, to make them as
              clear as possible.”
            </p>
            <a
              href="https://mp.weixin.qq.com/s/5GyBmu4ArQn-YwPtDRxLHQ"
              target="_blank"
              rel="noreferrer"
            >
              Read the original class notes ↗
            </a>
          </div>
        </div>
      </section>

      <section
        className={`${s.chapter} ${s.community}`}
        id="bridge-community"
        aria-labelledby="community-title"
      >
        <div className={s.chapterHeading}>
          <span className={s.eyebrow}>03 / Keep showing up</span>
          <h2 id="community-title">
            Learning together,
            <br />
            <em>in the community</em>
          </h2>
        </div>
        <div className={s.prose}>
          <p>
            Alongside the booklet, we held regular community sessions
            introducing mobile-phone functions and helping older adults learn to
            use apps.
          </p>
          <p>
            Our November 2017 account of a session at Zhenxi Xincun records
            nearly 20 participants and two hours of teaching. We included a quiz
            with small everyday prizes, and participants asked us to hold more
            sessions.
          </p>
          <p>
            This is the part of Bridge I most want to preserve: the people, the
            time we spent together, and the ordinary work of making something
            unfamiliar a little more approachable.
          </p>
        </div>
        <div className={s.communityPhotos}>
          <BridgePhotos
            photos={[
              {
                file: "participants.webp",
                alt: "Older adults listening together at a Bridge community session",
                caption: "a room full of questions.",
              },
              {
                file: "presenting.webp",
                alt: "Bridge students presenting smartphone instructions with a laptop and microphone",
                caption: "our turn to explain.",
              },
              {
                file: "community-room.webp",
                alt: "A wider view of the community room with participants using their phones",
                caption: "time to try it for yourself.",
              },
            ]}
          />
          <a
            className={s.archiveLink}
            href="https://mp.weixin.qq.com/s/5GyBmu4ArQn-YwPtDRxLHQ"
            target="_blank"
            rel="noreferrer"
          >
            Photos from Bridge’s community-class account · November 4, 2017 ↗
          </a>
        </div>
        <div className={s.communityNote}>
          <span className={s.handNote}>
            a phone, a question, a little time together.
          </span>
          <svg viewBox="0 0 280 40" aria-hidden="true">
            <path d="M4 29 Q130 3 276 19 M14 35 Q140 17 266 28" />
          </svg>
        </div>
      </section>

      <section
        className={`${s.chapter} ${s.recognition}`}
        id="bridge-tv"
        aria-labelledby="tv-title"
      >
        <div className={s.chapterHeading}>
          <span className={s.eyebrow}>A happy part of the story</span>
          <h2 id="tv-title">
            And yes,
            <br />
            <em>I ended up on TV</em>
          </h2>
        </div>
        <div className={s.prose}>
          <p>
            Bridge received a gold award at China Thinks Big, and I appeared on
            television because of the project.
          </p>
          <p>
            Both are happy parts of the story we made together. I’m glad to have
            those moments to look back on alongside the work itself.
          </p>
          <span className={s.award}>China Thinks Big · Gold award</span>
        </div>
        <BridgeSpeech />
      </section>

      <section className={s.closing} aria-labelledby="closing-title">
        <span className={s.eyebrow}>Looking back</span>
        <h2 id="closing-title">
          The things I build
          <br />
          <em>have changed</em>
        </h2>
        <div className={s.prose}>
          <p>
            I still care about whether they help someone do something that
            matters to them.
          </p>
          <p>
            Bridge showed me that I could research a problem, bring a team
            together, make something useful, and follow through in the
            community. Work that looked small could still be worth doing
            carefully.
          </p>
          <p>
            Our mission grew into a school club. Four years later, when I
            graduated, my peers kept it going — and Bridge continued after I
            left.
          </p>
          <p>
            With thanks to my teammates and the community members who shared
            their time with us.
          </p>
        </div>
        <BridgePhotos
          layout="single"
          photos={[
            {
              file: "community-group.jpg",
              alt: "A large group of Bridge participants and student volunteers together in the community classroom",
              caption: "our community, together.",
            },
          ]}
        />
        <span className={s.handNote}>I’m glad we made Bridge.</span>
        <div className={s.archiveLinks}>
          <span className={s.eyebrow}>From the Bridge archive</span>
          <a
            href="https://mp.weixin.qq.com/s/5GyBmu4ArQn-YwPtDRxLHQ"
            target="_blank"
            rel="noreferrer"
          >
            重阳公益课堂纪实 · Community class notes, 2017 ↗
          </a>
          <a
            href="https://mp.weixin.qq.com/s/kOxKaHi2H6DOwKKgeZRNFQ"
            target="_blank"
            rel="noreferrer"
          >
            你尝试过没有智能手机生活吗？ · Our project film, 2017 ↗
          </a>
        </div>
        <ReturnLink className={s.back}>
          Back to the things I’m making ↗
        </ReturnLink>
      </section>
    </main>
  );
}
