"use client";
import { useEffect, useRef, useState } from "react";
const notes = [1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14];
export default function WiserNotes() {
  const [selected, setSelected] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (selected !== null && !dialog.current?.open) dialog.current?.showModal();
  }, [selected]);
  const close = () => {
    dialog.current?.close();
    setSelected(null);
  };
  return (
    <section className="notes-collection">
      <div className="notes-heading">
        <h2>The things I kept.</h2>
        <p>
          Letters, drawings, and handwritten memories. Open one to look closer.
        </p>
      </div>
      <div className="notes-grid">
        {notes.map((note, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Open Wiser keepsake ${i + 1}`}
            onClick={() => setSelected(i)}
          >
            <img
              src={`/images/notes/note${note}.jpg`}
              alt={`Handwritten Wiser keepsake ${i + 1}`}
              loading="lazy"
            />
          </button>
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
              <span>A keepsake from Wiser</span>
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
