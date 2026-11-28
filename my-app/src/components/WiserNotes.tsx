"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import Movable from "./Movable";
const notes = [1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14];
type Position = [number, number, number];
function scatter(): Position[] {
  const slots = notes.map((_, i) => i);
  for (let i = slots.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [slots[i], slots[j]] = [slots[j], slots[i]];
  }
  return slots.map((slot) => [
    5 + (slot % 3) * 22 + Math.random() * 13,
    3 + Math.floor(slot / 3) * 17 + Math.random() * 9,
    Math.random() * 30 - 15,
  ]);
}
export default function WiserNotes({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [reset, setReset] = useState(0);
  const [positions, setPositions] = useState<Position[] | null>(null);
  useEffect(() => {
    setPositions(scatter());
  }, []);
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
          move the letters around or click a letter to feel the love.
        </p>
        <div>
          <button type="button" onClick={() => setLettersVisible((v) => !v)}>
            {lettersVisible ? "Read without letters" : "Bring the letters back"}
          </button>
          <button
            type="button"
            onClick={() => {
              setPositions(scatter());
              setReset((r) => r + 1);
              setLettersVisible(true);
            }}
          >
            Random scatter
          </button>
        </div>
      </div>
      <div className="letter-pile" aria-describedby="wiser-letter-hint">
        <div className="wiser-story">{children}</div>
        {positions &&
          notes.map((note, i) => (
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
