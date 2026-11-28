"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import styles from "./BeliefOpening.module.css";

type SharedReply = {
  answer: string;
  previous: string[];
  mode: "local" | "shared";
};

export default function BeliefOpening() {
  const [open, setOpen] = useState(false);
  const [answer, setAnswer] = useState("");
  const [reply, setReply] = useState<SharedReply | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const good = useRef<HTMLButtonElement>(null);
  const opening = useRef<HTMLElement>(null);
  const discovered = useRef(false);

  const rememberNote = useCallback(() => {
    discovered.current = true;
    try {
      sessionStorage.setItem("portfolio-good-note-seen", "yes");
    } catch {
      /* The in-memory guard still works when storage is unavailable */
    }
  }, []);

  useEffect(() => {
    try {
      discovered.current =
        sessionStorage.getItem("portfolio-good-note-seen") === "yes";
    } catch {
      /* Storage is optional */
    }
    let sawOpening = false;
    const check = (allowReveal: boolean) => {
      const rect = opening.current?.getBoundingClientRect();
      if (!rect) return;
      if (rect.bottom > 0 && rect.top < innerHeight) sawOpening = true;
      if (
        allowReveal &&
        sawOpening &&
        rect.bottom <= Math.min(100, innerHeight * 0.15) &&
        !discovered.current
      ) {
        rememberNote();
        setOpen(true);
      }
    };
    const onScroll = () => check(true);
    check(false);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [rememberNote]);

  const dismiss = useCallback(() => {
    setOpen(false);
    if (document.activeElement?.closest("#good-conversation")) {
      good.current?.focus({ preventScroll: true });
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    const onEscape = (event: KeyboardEvent) => {
      if (
        event.key === "Escape" &&
        !event.defaultPrevented &&
        !document.querySelector("dialog[open]")
      )
        dismiss();
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [open, dismiss]);

  function reveal(focus = false) {
    rememberNote();
    setOpen(true);
    if (focus) requestAnimationFrame(() => input.current?.focus());
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending || !answer.trim()) return;
    setPending(true);
    setError("");
    try {
      const response = await fetch("/api/good-responses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answer }),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(
          data.error || "Your thought couldn’t be saved Please try again",
        );
      setReply(data);
    } catch (reason) {
      setError(
        reason instanceof Error
          ? reason.message
          : "Your thought couldn’t be saved Please try again",
      );
    } finally {
      setPending(false);
    }
  }

  return (
    <section
      ref={opening}
      className={styles.opening}
      aria-labelledby="intro-title"
    >
      <div className={styles.page}>
        <div className={styles.makeNote}>
          <span className={styles.connect}>
            connect! <span>connect!</span> connect!
          </span>
          <p>
            Play! Break things! Put them back together. Get dirty. Talk to
            people!
          </p>
          <p>
            Mean well. Follow through.
            <br />
            My way of loving this world.
          </p>
          <svg
            className={styles.curl}
            viewBox="0 0 75 85"
            fill="none"
            aria-hidden="true"
          >
            <path d="M18 3 C-7 42 44 41 29 23 C10 3 9 68 62 70 M49 57 L64 71 L48 78" />
          </svg>
        </div>
        <h1 id="intro-title" className={styles.title}>
          <span>make</span>{" "}
          <button
            ref={good}
            type="button"
            onPointerEnter={(event) => {
              if (event.pointerType === "mouse") reveal();
            }}
            onClick={() => reveal(true)}
            aria-expanded={open}
            aria-controls="good-conversation"
          >
            good
          </button>{" "}
          <span className={styles.humans}>
            humans
            <svg viewBox="0 0 390 26" fill="none" aria-hidden="true">
              <path d="M4 12 Q185 0 383 11 M8 22 Q201 10 376 23" />
            </svg>
          </span>
        </h1>
        <div className={styles.goodSpace}>
          {open && (
            <div
              className={styles.conversation}
              id="good-conversation"
              role="region"
              aria-labelledby="good-question"
            >
              <button
                className={styles.close}
                type="button"
                aria-label="Close this note"
                onClick={dismiss}
              >
                ×
              </button>
              {!reply ? (
                <form onSubmit={submit}>
                  <p className={styles.threeWords}>
                    quality, character, virtue.
                  </p>
                  <label id="good-question" htmlFor="good-answer">
                    What is good to you?
                  </label>
                  <div className={styles.answerLine}>
                    <input
                      ref={input}
                      id="good-answer"
                      name="answer"
                      value={answer}
                      onChange={(event) => setAnswer(event.target.value)}
                      placeholder="A word, or a few"
                      maxLength={160}
                      required
                      autoComplete="off"
                      disabled={pending}
                    />
                    <button
                      type="submit"
                      aria-label={
                        pending
                          ? "Saving your thought"
                          : "Share your meaning of good"
                      }
                      disabled={pending || !answer.trim()}
                    >
                      {pending ? "↻" : "↵"}
                    </button>
                  </div>
                  {error && (
                    <p className={styles.error} role="alert">
                      {error}
                    </p>
                  )}
                </form>
              ) : (
                <div className={styles.response} aria-live="polite">
                  <p className={styles.thanks} id="good-question">
                    Thank you for leaving a little of yourself.
                  </p>
                  <blockquote>“{reply.answer}”</blockquote>
                  <p className={styles.myTurn}>as for me.</p>
                  <p>
                    I don’t know. But the idea of knowing I was a good person by
                    my own standard keeps coming back to me. I’m trying to live
                    up to my standards, and that has been giving me peace.
                  </p>
                  <div className={styles.previous}>
                    {reply.previous.length ? (
                      <>
                        <p>
                          {reply.previous.length === 3
                            ? "The last 3 visitors shared:"
                            : reply.previous.length === 1
                              ? "The visitor before you shared:"
                              : "The last 2 visitors shared:"}
                        </p>
                        <ul>
                          {reply.previous.map((thought, i) => (
                            <li key={i}>“{thought}”</li>
                          ))}
                        </ul>
                      </>
                    ) : (
                      <p>You’re the first to leave a thought here.</p>
                    )}
                  </div>
                  {reply.mode === "local" && (
                    <p className={styles.sharing}>
                      Local preview · these replies stay on this computer.
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
        <div className={styles.humanNote}>
          <p>why we make, pursue, exist.</p>
          <p>
            The one thing we are and will always be better at: being human and
            loving humanity.
          </p>
        </div>
      </div>
      <a href="#my-world" className={styles.below}>
        a little of my world, below.
      </a>
    </section>
  );
}
