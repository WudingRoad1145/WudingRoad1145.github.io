"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Movable from "./Movable";
const notes = [1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14];
const positions = [
  [3, 8, -13],
  [21, 2, 7],
  [44, 7, -5],
  [66, 3, 10],
  [80, 23, -8],
  [4, 39, 6],
  [27, 31, -9],
  [57, 34, 12],
  [77, 58, 5],
  [3, 64, -6],
  [23, 64, 10],
  [45, 68, -8],
  [63, 61, 13],
];
export default function WiserNotes({ home = false }: { home?: boolean }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [reset, setReset] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (selected !== null && !dialog.current?.open) dialog.current?.showModal();
  }, [selected]);
  const close = () => {
    dialog.current?.close();
    setSelected(null);
  };
  return (
    <section
      className="wiser-scatter"
      aria-labelledby={home ? "wiser-home-title" : "wiser-notes-title"}
    >
      <div className="wiser-scatter-intro">
        <span className="handwritten">from the girls, with love</span>
        <h2 id={home ? "wiser-home-title" : "wiser-notes-title"}>
          Some things I’ll
          <br />
          never throw away
        </h2>
        <p>Two months in Muhuru Bay These letters came home with me</p>
        {home && (
          <Link href="/projects/wiser" className="text-link">
            The story of Wiser
          </Link>
        )}
      </div>
      <div
        className="letter-pile"
        key={reset}
        aria-label="Scattered draggable Wiser letters"
      >
        <div className="pile-center" aria-hidden="true">
          <img src="/images/wiser.jpg" alt="" />
          <span>Wiser, 2022</span>
        </div>
        {notes.map((note, i) => (
          <Movable
            key={note}
            x={positions[i][0]}
            y={positions[i][1]}
            angle={positions[i][2]}
            label={`Open Wiser keepsake ${i + 1}`}
            className="loose-letter"
            onOpen={() => setSelected(i)}
          >
            <img
              src={`/images/notes/note${note}.jpg`}
              alt={`Handwritten keepsake ${i + 1} from Wiser`}
              loading="lazy"
            />
          </Movable>
        ))}
      </div>
      <div className="pile-tools">
        <p>
          Drag a letter out of the pile Tap to read it
          <br />
          <small>You can also move a focused letter with the arrow keys</small>
        </p>
        <div>
          <button type="button" onClick={() => setSelected(0)}>
            Read one by one
          </button>
          <button type="button" onClick={() => setReset((r) => r + 1)}>
            Scatter again
          </button>
        </div>
      </div>
      <dialog
        ref={dialog}
        className="note-dialog"
        aria-label="Wiser keepsakes"
        onCancel={() => setSelected(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        {selected !== null && (
          <>
            <header>
              <span>A letter I brought home</span>
              <button type="button" onClick={close}>
                Close
              </button>
            </header>
            <img
              src={`/images/notes/note${notes[selected]}.jpg`}
              alt={`Handwritten Wiser keepsake ${selected + 1}`}
            />
            <footer>
              <button
                type="button"
                onClick={() =>
                  setSelected((selected + notes.length - 1) % notes.length)
                }
              >
                Previous
              </button>
              <span aria-live="polite">
                {selected + 1} of {notes.length}
              </span>
              <button
                type="button"
                onClick={() => setSelected((selected + 1) % notes.length)}
              >
                Next
              </button>
            </footer>
          </>
        )}
      </dialog>
    </section>
  );
}
