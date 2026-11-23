"use client";

import { useRef, useState } from "react";
import styles from "./DeskInvitation.module.css";

const activities = [
  "CrossFit",
  "Open-water swimming",
  "Bouldering",
  "Top rope",
  "Basketball",
  "Triathlon",
];

export default function DeskInvitation({ found }: { found: boolean }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [activity, setActivity] = useState("");
  const close = () => dialog.current?.close();
  const subject = activity
    ? `Partner in crime for ${activity.toLowerCase()}?`
    : "I found your secret note!";
  const body = `Hi Yan,\n\nI found your little invitation on your website${activity ? ` and I'd love to try ${activity.toLowerCase()} with you` : ""}!\n\n`;

  return (
    <>
      <span className="sr-only" role="status">
        {found ? "You uncovered a secret invitation beneath Big Woman" : ""}
      </span>
      <button
        ref={trigger}
        className={styles.secret}
        hidden={!found}
        onClick={() => dialog.current?.showModal()}
        aria-haspopup="dialog"
      >
        a partner
        <br />
        in crime? <span aria-hidden="true">↗</span>
      </button>
      <dialog
        ref={dialog}
        className={styles.dialog}
        aria-labelledby="secret-invitation-title"
        onClose={() => trigger.current?.focus()}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        <div className={styles.note}>
          <button
            className={styles.close}
            onClick={close}
            aria-label="Close the secret note"
          >
            ×
          </button>
          <span className={styles.eyebrow}>
            a little invitation, just for you
          </span>
          <h2 id="secret-invitation-title">You found me!</h2>
          <p>Thinking about trying any of these, but not sure how to start?</p>
          <div
            className={styles.activities}
            role="group"
            aria-label="Pick something to try together"
          >
            {activities.map((name) => (
              <button
                key={name}
                aria-pressed={activity === name}
                onClick={() => setActivity(activity === name ? "" : name)}
              >
                {name}
              </button>
            ))}
          </div>
          <p>Or simply want a partner in crime?</p>
          <p className={styles.handwritten}>
            You found me
            <br />
            Let’s figure it out together :)
          </p>
          <a
            className={styles.hello}
            href={`mailto:yanffyy@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`}
          >
            Say hello <span aria-hidden="true">↗</span>
          </a>
        </div>
      </dialog>
    </>
  );
}
