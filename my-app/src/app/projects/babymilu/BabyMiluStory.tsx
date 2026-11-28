"use client";

import { useEffect, useRef, useState } from "react";
import { ReturnLink } from "@/components/HomeReturn";
import CinemaOpening from "./CinemaOpening";
import DailyLife from "./DailyLife";
import CadViewer from "./CadViewer";
import s from "./story.module.css";

const asset = (name: string) => `/babymilu/${name}`;
const chapters = [
  ["beginning", "The beginning"],
  ["daily-life", "Everyday life"],
  ["making", "Making it real"],
  ["factory", "The factory"],
  ["promise", "The promise"],
];

const artifacts = [
  {
    image: "prototype.webp",
    title: "The very first possibility",
    category: "Prototype",
    caption:
      "July 2025 · A GoPro inside a Kuromi plushie. The character animation was simulated.",
  },
  {
    image: "sketch.webp",
    title: "Thinking with a pencil",
    category: "Hardware",
    caption: "July 2025 · Early dimensioned enclosure sketch",
  },
  {
    image: "core.webp",
    title: "A body around the electronics",
    category: "Hardware",
    caption: "September 2025 · A removable-core construction study",
  },
  {
    image: "hanger-test.webp",
    title: "The little carrying loop",
    category: "Hardware",
    caption:
      "April 2026 · Printed mounting trial, with screw posts and attachment sketches",
  },
  {
    image: "alarm-app.webp",
    title: "Giving the interaction a purpose",
    category: "Interaction",
    caption: "Alarm design from Figma · App design by Tammy Chen",
  },
  {
    image: "factory-batch.webp",
    title: "One becomes many",
    category: "Factory",
    caption: "June 2026 file metadata · A still from production footage",
  },
  {
    image: "box.webp",
    title: "A finished DVT unit",
    category: "Factory",
    caption:
      "June 28, 2026 · Box labeled BM-DVT-001. The photograph of the remembered first-box moment is still to identify.",
  },
  {
    image: "hero.webp",
    title: "Different ways to be Milu",
    category: "Prototype",
    caption:
      "Product photography · Two plush designs. Shoot date not recorded in this archive.",
  },
];

function DeliveryStudy() {
  const [channel, setChannel] = useState("App");
  return (
    <div className={s.deliveryStudy}>
      <span className={s.eyebrow}>An interaction, up close</span>
      <h3>Company should be a choice</h3>
      <p>
        A beta participant wanted Milu to stay quiet at work. Choosing where a
        reminder arrives makes that boundary tangible.
      </p>
      <div
        className={s.deliveryControls}
        role="group"
        aria-label="Reminder delivery preview"
      >
        {["App", "Plushie", "Both"].map((option) => (
          <button
            type="button"
            key={option}
            aria-pressed={channel === option}
            onClick={() => setChannel(option)}
          >
            {option}
          </button>
        ))}
      </div>
      <div className={s.deliveryResult} aria-live="polite">
        <span className={s.miniFace} aria-hidden="true">
          {channel === "App" ? "−ᴗ−" : "•ᴗ•"}
        </span>
        <div>
          <strong>
            {channel === "App"
              ? "A phone notification"
              : channel === "Plushie"
                ? "A familiar voice"
                : "A voice, and a notification"}
          </strong>
          <span>
            {channel === "App"
              ? "Your phone gets the reminder Milu stays quiet"
              : channel === "Plushie"
                ? "Milu speaks Your phone stays quiet"
                : "The reminder reaches your phone and Milu"}
          </span>
        </div>
      </div>
      <small>
        Interactive illustration of the delivery choices in our app App design:
        Tammy Chen
      </small>
    </div>
  );
}

function ArtifactArchive() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (selected !== null) dialog.current?.showModal();
  }, [selected]);
  const close = () => {
    dialog.current?.close();
    setSelected(null);
  };
  return (
    <section id="archive" className={`${s.section} ${s.archive}`}>
      <div className={s.sectionTop}>
        <div>
          <span className={s.eyebrow}>The things we kept</span>
          <h2>A small archive</h2>
        </div>
        <p>
          Sketches, experiments, and the parts that made their way into the
          world.
        </p>
      </div>
      <div
        className={s.filters}
        role="group"
        aria-label="Filter project artifacts"
      >
        {["All", "Prototype", "Hardware", "Interaction", "Factory"].map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>
      <div className={s.artifactGrid}>
        {artifacts.map(
          (a, index) =>
            (filter === "All" || filter === a.category) && (
              <button
                className={s.artifact}
                type="button"
                key={a.title}
                aria-label={`Inspect ${a.title}`}
                onClick={() => setSelected(index)}
              >
                <div>
                  <img
                    src={asset(a.image)}
                    alt={a.title}
                    loading="lazy"
                    width="500"
                    height="500"
                    className={
                      a.category === "Interaction"
                        ? s.screenArtifact
                        : undefined
                    }
                  />
                  <span className={s.inspect}>View artifact</span>
                </div>
                <span>{a.category}</span>
                <h3>{a.title}</h3>
              </button>
            ),
        )}
      </div>
      <dialog
        ref={dialog}
        className={s.lightbox}
        aria-labelledby="artifact-dialog-title"
        onCancel={() => setSelected(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        {selected !== null && (
          <div className={s.lightboxInner}>
            <button type="button" onClick={close} className={s.close}>
              Close
            </button>
            <img
              src={asset(artifacts[selected].image)}
              alt={artifacts[selected].title}
            />
            <h3 id="artifact-dialog-title">{artifacts[selected].title}</h3>
            <p>{artifacts[selected].caption}</p>
          </div>
        )}
      </dialog>
    </section>
  );
}

export default function BabyMiluStory() {
  const [activeChapter, setActiveChapter] = useState("");
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const original = document.documentElement.style.scrollBehavior;
    const update = () => {
      document.documentElement.style.scrollBehavior = media.matches
        ? "auto"
        : original;
    };
    update();
    media.addEventListener("change", update);
    return () => {
      media.removeEventListener("change", update);
      document.documentElement.style.scrollBehavior = original;
    };
  }, []);
  useEffect(() => {
    const sections = chapters
      .map(([id]) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActiveChapter(entry.target.id);
      },
      { rootMargin: "-15% 0px -60% 0px", threshold: 0 },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  return (
    <div className={s.page}>
      <a className={s.skipLink} href="#beginning">
        Skip to the story
      </a>
      <main>
        <CinemaOpening />
        <section className={s.filmCredits} aria-label="Project credits">
          <div className={s.projectMeta}>
            <span>
              <strong>My role</strong>Cofounder & CTO
            </span>
            <span>
              <strong>The work</strong>Interaction, hardware & systems
            </span>
            <span>
              <strong>The journey</strong>2025–2026
            </span>
            <span>
              <strong>App design</strong>Tammy Chen
            </span>
          </div>
        </section>
        <nav className={s.chapterNav} aria-label="Story chapters">
          {chapters.map(([id, name]) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={activeChapter === id ? "location" : undefined}
            >
              {name}
            </a>
          ))}
        </nav>

        <section id="beginning" className={`${s.section} ${s.origin}`}>
          <div className={s.originImages}>
            <figure className={s.prototypePhoto}>
              <img
                src={asset("prototype.webp")}
                alt="A dismantled Kuromi plushie with a GoPro screen fitted into its face"
                width="800"
                height="1067"
                loading="lazy"
              />
              <figcaption>The first prototype. Yes, that’s a GoPro.</figcaption>
            </figure>
            <span className={s.photoNote}>poor Kuromi</span>
          </div>
          <div className={s.prose}>
            <span className={s.eyebrow}>San Francisco · The beginning</span>
            <h2>
              It started with
              <br />a little make-believe
            </h2>
            <p>
              We took apart a poor Kuromi plushie and squashed my GoPro inside
              to fake an emotional Tamagotchi.
            </p>
            <p>
              Then we took it to Japantown and stopped people to ask what they
              thought. That rough little object made a possibility feel real.
            </p>
            <p>
              We filmed character-alarm ideas with the same prototype. The
              TikToks took off. Our Discord grew. We found our first backers.
            </p>
            <p className={s.pullLine}>Suddenly, people were waiting for it.</p>
            <div className={s.marginNote}>
              The animation was simulated What we were testing was the
              invitation: would you want this character in your life?
            </div>
          </div>
        </section>

        <section className={s.intent}>
          <span className={s.eyebrow}>The question we kept coming back to</span>
          <p>How could AI become a welcome part of someone’s day?</p>
          <span>
            We were building for women aged 20–40, a community we belonged to
          </span>
        </section>
        <DailyLife />

        <section className={`${s.section} ${s.learning}`}>
          <div>
            <span className={s.eyebrow}>Learning from life with Milu</span>
            <h2>
              Delight had to
              <br />
              survive an ordinary day
            </h2>
            <p>
              One participant talked through her morning routine. Another kept
              Milu beside her bed but didn’t know what to say. Someone else
              needed it to stay quiet at work.
            </p>
            <p>
              The invitation mattered. So did the effort, the timing, and
              permission to stop.
            </p>
          </div>
          <DeliveryStudy />
        </section>

        <section id="making" className={`${s.section} ${s.making}`}>
          <div className={s.sectionTop}>
            <div>
              <span className={s.eyebrow}>From a possibility to a product</span>
              <h2>Now it had to work</h2>
            </div>
            <p>
              I had never developed firmware. I started the stack from zero and
              kept returning to Shenzhen with a huge backpack and a lot to
              learn.
            </p>
          </div>
          <div className={s.makingGrid}>
            <figure>
              <img
                src={asset("core.webp")}
                alt="An early BabyMilu enclosure with a removable electronic core"
                width="960"
                height="1200"
                loading="lazy"
              />
              <figcaption>
                A removable-core construction study · September 2025
              </figcaption>
            </figure>
            <div className={s.prose}>
              <blockquote>
                “I know nothing,
                <br />
                but I learn fast”
              </blockquote>
              <p>
                That was what I told vendors. After five prototypes, and many
                trips between factories, I found a path toward production.
              </p>
              <p>
                Back home, I printed parts, assembled PCBAs, connected sensors,
                and tested the device with our voice server and app. We shipped
                a hundred beta units in about two months.
              </p>
              <p>
                Between assembly sessions, I was on calls and in Discord DMs,
                helping people connect to Wi-Fi and finding the rough edges.
              </p>
              <div className={s.missingFilm}>
                <span aria-hidden="true">▤</span>
                <div>
                  <strong>A day of turning screws</strong>
                  <span>
                    Assembly time-lapse · a place for the original film
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className={s.systemStrip}>
            <span>The experience depended on all of it</span>
            <div>
              <b>A touch</b>
              <i>+</i>
              <b>A listening device</b>
              <i>+</i>
              <b>A timely response</b>
              <i>+</i>
              <b>A familiar voice</b>
            </div>
            <p>
              Firmware, voice server, app, and evaluation were how we worked on
              one continuous interaction.
            </p>
          </div>
        </section>

        <section id="factory" className={s.factory}>
          <div className={s.factoryInner}>
            <div className={s.factoryOpening}>
              <span className={s.eyebrow}>
                Dongguan, and the people who helped make it real
              </span>
              <h2>
                A place on the
                <br />
                <em>factory floor</em>
              </h2>
              <p>
                In February, I flew to Dongguan and ate and slept in the
                workshop while we tried to get the first batch ready. So many
                small details were still unresolved.
              </p>
            </div>
            <figure className={s.factoryPeople}>
              <img
                src={asset("factory-people.webp")}
                alt="Two people smiling together in yellow factory smocks and caps"
                width="1600"
                height="1200"
                loading="lazy"
              />
              <figcaption>
                A moment from a later factory visit · April 16, 2026
              </figcaption>
            </figure>
            <div className={s.loopStory}>
              <div>
                <span className={s.eyebrow}>
                  One very small, very real problem
                </span>
                <h3>The little loop</h3>
                <p>
                  Someone picks Milu up by its hanger. The fabric lifts. The
                  electronic core has weight. Suddenly, a tiny detail connects
                  the whole product.
                </p>
                <p>
                  I worked through different mounting approaches with mechanical
                  and factory collaborators: how to carry the load, protect the
                  core, sew it together, and keep the face usable.
                </p>
                <p>
                  Their experience helped turn sketches into parts we could
                  hold, test, and change.
                </p>
              </div>
              <div className={s.loopPhotos}>
                <figure>
                  <img
                    src={asset("hanger-sketch.webp")}
                    alt="Handwritten dimensions and a printed carrying-loop mount"
                    width="600"
                    height="800"
                    loading="lazy"
                  />
                  <figcaption>Think with a sketch.</figcaption>
                </figure>
                <figure>
                  <img
                    src={asset("hanger-test.webp")}
                    alt="Underside of a printed mount showing screw posts"
                    width="600"
                    height="800"
                    loading="lazy"
                  />
                  <figcaption>Then with a part.</figcaption>
                </figure>
                <p>Mounting trials · April 2026</p>
              </div>
            </div>
            <CadViewer />
            <div className={s.factoryClosing}>
              <span>
                Making one work
                <br />
                Learning to make many
              </span>
              <p>
                Assembly, inspection, sensors, test procedures, and matching
                each device to its box. The factory made every part of the
                experience concrete.
              </p>
            </div>
          </div>
        </section>

        <section className={`${s.section} ${s.firstBox}`}>
          <figure>
            <img
              src={asset("box.webp")}
              alt="BabyMilu retail packaging held in a hand, labeled BM-DVT-001"
              width="900"
              height="1200"
              loading="lazy"
            />
            <figcaption>
              A boxed DVT unit · June 2026
              <br />
              The exact first-box photograph is still to identify.
            </figcaption>
          </figure>
          <div>
            <span className={s.eyebrow}>A moment I want to keep</span>
            <h2>
              “Our baby is ready
              <br />
              to see the world”
            </h2>
            <p>
              When the first unit with its final look was assembled and placed
              in our packaging, I pretty much cried.
            </p>
            <p>
              I had carried so many unfinished versions. Now one was in its box.
            </p>
          </div>
        </section>

        <section id="promise" className={`${s.section} ${s.promise}`}>
          <span className={s.eyebrow}>After the plan changed</span>
          <h2>
            A promise
            <br />
            is a promise
          </h2>
          <div className={s.promiseCopy}>
            <p>
              More conventions led us to question whether the market we were
              reaching could sustain the company. We moved toward software. I
              still insisted that we honor the shipping we had promised.
            </p>
            <p>
              We also reconsidered what a good relationship with Milu could look
              like. Daily engagement wasn’t automatically the goal. A less
              frequent, more natural interaction could matter more.
            </p>
            <p>
              We are now working to open-source BabyMilu. I want the prototypes,
              mistakes, collaborators, and lessons to remain available to the
              people who come after us.
            </p>
          </div>
          <span className={s.openNote}>
            The story continues · Open-source work in progress
          </span>
        </section>
        <ArtifactArchive />
        <footer className={s.footer}>
          <div>
            <img
              src={asset("logo.svg")}
              alt="BabyMilu"
              width="90"
              height="49"
            />
            <p>
              Made with a lot of people.
              <br />
              Remembered with a lot of love.
            </p>
          </div>
          <div>
            <p>
              <strong>Lanruo Xie</strong> · Cofounder & CEO
              <br />
              <strong>Yán Fēng</strong> · Cofounder & CTO
              <br />
              <strong>Tammy Chen</strong> · App design
              <br />
              <strong>Jackson Xie</strong> · Engineering
              <br />
              <strong>Blossom Okonkwo</strong> · Marketing
            </p>
            <p>
              And our engineering, design, mechanical, factory,
              <br />
              and community collaborators.
            </p>
            <p>
              Thanks to Gopal, Evan, Lizz, Joy, Miffy, Jiayue, Aaron, Anwei,
              Charlotte, David, Elaina for believing in this dream with us.
            </p>
          </div>
          <ReturnLink>Back to selected work</ReturnLink>
        </footer>
      </main>
    </div>
  );
}
