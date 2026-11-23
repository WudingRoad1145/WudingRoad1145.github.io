"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import styles from "./DailyLife.module.css";

const scenes = [
  {
    label: "Morning",
    title: "A reason to begin",
    copy: "A character alarm gave us a moment to design around: a familiar voice helping someone start the day We explored how timing, tone, and room for a response could make waking up feel personal",
    image: "/babymilu/day-morning.webp",
    alt: "Morning use-case image: a person in a white hoodie asleep under a blanket",
    face: "/babymilu/day-face-morning.webp",
    stillFace: "/babymilu/day-face-morning-still.webp",
    companionAlt:
      "BabyMilu with a smiling, white-haired character on its face screen",
  },
  {
    label: "During the day",
    title: "A little encouragement",
    copy: "We imagined a companion for things someone already wanted to do—a check-in before heading out, or a nudge to follow through The question was whether it helped in that moment",
    image: "/babymilu/day-outside.webp",
    alt: "A pink backpack with BabyMilu in its pocket and charms attached",
    face: "/babymilu/day-face-day.webp",
    stillFace: "/babymilu/day-face-day-still.webp",
    companionAlt: "BabyMilu with a silver-haired character on its face screen",
  },
  {
    label: "Evening",
    title: "Company, on your terms",
    copy: "A goodnight, a quiet presence, or nothing at all Early conversations with users reminded us that feeling accompanied did not have to mean keeping a conversation going",
    image: "/babymilu/day-night.webp",
    alt: "Evening use-case image: a seated person with their knees drawn close",
    face: "/babymilu/day-face-night-still.webp",
    stillFace: "/babymilu/day-face-night-still.webp",
    companionAlt:
      "BabyMilu with a calm, blue-eyed character on its face screen",
  },
] as const;

const desktopQuery = "(min-width: 900px)";

export default function DailyLife() {
  const [activeScene, setActiveScene] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [animationPaused, setAnimationPaused] = useState(false);
  const sceneRefs = useRef<Array<HTMLElement | null>>([]);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const id = useId();
  const headingId = `${id}-heading`;
  const imageId = `${id}-image`;

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(preference.matches);
    updateMotion();
    preference.addEventListener("change", updateMotion);
    return () => preference.removeEventListener("change", updateMotion);
  }, []);

  useEffect(() => {
    const desktop = window.matchMedia(desktopQuery);
    let observer: IntersectionObserver | undefined;

    const observeScenes = () => {
      observer?.disconnect();
      if (!desktop.matches || !("IntersectionObserver" in window)) return;

      const visibleScenes = new Set<number>();
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const index = sceneRefs.current.indexOf(
              entry.target as HTMLElement,
            );
            if (index < 0) return;
            if (entry.isIntersecting) visibleScenes.add(index);
            else visibleScenes.delete(index);
          });

          // A narrow reading band makes the image follow the paragraph being read.
          const readingLine = window.innerHeight * 0.425;
          const closest = Array.from(visibleScenes).sort((a, b) => {
            const aBounds = sceneRefs.current[a]?.getBoundingClientRect();
            const bBounds = sceneRefs.current[b]?.getBoundingClientRect();
            if (!aBounds || !bBounds) return 0;
            return (
              Math.abs(aBounds.top + aBounds.height / 2 - readingLine) -
              Math.abs(bBounds.top + bBounds.height / 2 - readingLine)
            );
          })[0];

          if (closest !== undefined) setActiveScene(closest);
        },
        { rootMargin: "-25% 0px -40% 0px", threshold: [0, 0.15, 0.4] },
      );

      sceneRefs.current.forEach((scene) => {
        if (scene) observer?.observe(scene);
      });
    };

    observeScenes();
    desktop.addEventListener("change", observeScenes);
    return () => {
      observer?.disconnect();
      desktop.removeEventListener("change", observeScenes);
    };
  }, []);

  const selectScene = (index: number) => {
    setActiveScene(index);
    if (!window.matchMedia(desktopQuery).matches) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    sceneRefs.current[index]?.scrollIntoView({
      block: "center",
      // "instant" also overrides the site's global smooth-scroll rule.
      behavior: reduceMotion ? ("instant" as ScrollBehavior) : "smooth",
    });
  };

  const handleSceneKey = (event: KeyboardEvent<HTMLDivElement>) => {
    const focusedIndex = buttonRefs.current.indexOf(
      event.target as HTMLButtonElement,
    );
    if (focusedIndex < 0) return;

    let nextIndex: number;
    if (event.key === "ArrowRight")
      nextIndex = (focusedIndex + 1) % scenes.length;
    else if (event.key === "ArrowLeft")
      nextIndex = (focusedIndex - 1 + scenes.length) % scenes.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = scenes.length - 1;
    else return;

    event.preventDefault();
    buttonRefs.current[nextIndex]?.focus({ preventScroll: true });
    selectScene(nextIndex);
  };

  return (
    <section
      id="daily-life"
      aria-labelledby={headingId}
      className={styles.section}
    >
      <header className={styles.header}>
        <h2 id={headingId}>A familiar voice An ordinary day</h2>
        <p>
          Three early explorations of where a character might fit into everyday
          life
        </p>
      </header>

      <div className={styles.sequence}>
        <div className={styles.stageColumn}>
          <div className={styles.stage}>
            <figure className={styles.figure}>
              <div
                className={styles.visual}
                id={imageId}
                data-scene={activeScene}
              >
                <span className={styles.moment} aria-hidden="true">
                  {scenes[activeScene].label}
                </span>
                {scenes.map((scene, index) => (
                  <div
                    key={scene.label}
                    className={styles.imageLayer}
                    data-active={activeScene === index}
                    data-scene={index}
                    aria-hidden={activeScene !== index}
                  >
                    <Image
                      src={scene.image}
                      alt={scene.alt}
                      fill
                      sizes="(max-width: 899px) 70vw, (max-width: 1280px) 34vw, 400px"
                      className={styles.image}
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  </div>
                ))}
                <div
                  className={styles.companion}
                  role="img"
                  aria-label={scenes[activeScene].companionAlt}
                >
                  <div className={styles.faceScreen}>
                    <Image
                      src={
                        reducedMotion || animationPaused
                          ? scenes[activeScene].stillFace
                          : scenes[activeScene].face
                      }
                      alt=""
                      fill
                      sizes="160px"
                      className={styles.faceImage}
                      unoptimized
                    />
                  </div>
                  <Image
                    src="/babymilu/day-plush-body.webp"
                    alt=""
                    fill
                    sizes="(max-width: 899px) 65vw, 380px"
                    className={styles.plushBody}
                  />
                </div>
              </div>
              <figcaption>Early use-case explorations</figcaption>
            </figure>

            <div
              role="group"
              aria-label="Choose a moment in the day"
              className={styles.controls}
              onKeyDown={handleSceneKey}
            >
              {scenes.map((scene, index) => (
                <button
                  key={scene.label}
                  type="button"
                  ref={(element) => {
                    buttonRefs.current[index] = element;
                  }}
                  aria-pressed={activeScene === index}
                  aria-controls={`${imageId} ${id}-scene-${index}`}
                  onClick={() => selectScene(index)}
                >
                  {scene.label}
                </button>
              ))}
            </div>
            {!reducedMotion &&
              scenes[activeScene].face !== scenes[activeScene].stillFace && (
                <button
                  type="button"
                  className={styles.motionControl}
                  aria-controls={imageId}
                  onClick={() => setAnimationPaused((paused) => !paused)}
                >
                  {animationPaused ? "Play animation" : "Pause animation"}
                </button>
              )}
          </div>
        </div>

        <div className={styles.scenes}>
          {scenes.map((scene, index) => (
            <article
              key={scene.label}
              id={`${id}-scene-${index}`}
              ref={(element) => {
                sceneRefs.current[index] = element;
              }}
              className={styles.scene}
              data-active={activeScene === index}
              aria-labelledby={`${id}-scene-heading-${index}`}
            >
              <div className={styles.sceneCopy}>
                <p className={styles.sceneLabel}>{scene.label}</p>
                <h3 id={`${id}-scene-heading-${index}`}>{scene.title}</h3>
                <p className={styles.body}>{scene.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
