"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
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
export default function WiserNotes({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [reset, setReset] = useState(0);
  const [lettersVisible, setLettersVisible] = useState(true);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (selected !== null && !dialog.current?.open) dialog.current?.showModal();
  }, [selected]);
  const close = () => {
    dialog.current?.close();
    setSelected(null);
  };
  return (
    <section className="wiser-scatter" aria-label="The Wiser story and letters">
      <div className="pile-tools">
        <p id="wiser-letter-hint" className="handwritten">
          the story is underneath — move the letters around
          <br />
          click a letter to enlarge and read
        </p>
        <div>
          <button type="button" onClick={() => setLettersVisible((v) => !v)}>
            {lettersVisible ? "Read without letters" : "Bring the letters back"}
          </button>
          <button
            type="button"
            onClick={() => {
              setReset((r) => r + 1);
              setLettersVisible(true);
            }}
          >
            Scatter again
          </button>
        </div>
        <small>Arrow keys move a focused letter · Enter opens it</small>
      </div>
      <div className="letter-pile" aria-describedby="wiser-letter-hint">
        <div className="wiser-story">{children}</div>
        {notes.map((note, i) => (
          <Movable
            key={`${reset}-${note}`}
            x={positions[i][0]}
            y={positions[i][1]}
            angle={positions[i][2]}
            label={`Open Wiser keepsake ${i + 1}`}
            className={`loose-letter${lettersVisible ? "" : " letter-hidden"}`}
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
