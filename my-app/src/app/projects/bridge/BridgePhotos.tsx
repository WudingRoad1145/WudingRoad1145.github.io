"use client";

import { useEffect, useRef, useState } from "react";
import s from "./bridge.module.css";
import sources from "../../../../public/bridge/sources.json";

type Photo = { file: string; alt: string; caption: string };

export default function BridgePhotos({
  photos,
  layout = "spread",
}: {
  photos: Photo[];
  layout?: "hero" | "spread" | "single";
}) {
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
    <div className={`${s.album} ${s[`${layout}Album`]}`}>
      {photos.map((photo, i) => (
        <figure key={photo.file}>
          <button
            type="button"
            onClick={() => setSelected(i)}
            aria-label={`Enlarge: ${photo.alt}`}
          >
            <img
              src={`/bridge/${photo.file}`}
              alt={photo.alt}
              width={
                sources.find((source) => source.file === photo.file)?.width
              }
              height={
                sources.find((source) => source.file === photo.file)?.height
              }
              loading={layout === "hero" ? "eager" : "lazy"}
            />
            <span className={s.enlarge} aria-hidden="true">
              ↗
            </span>
          </button>
          <figcaption>{photo.caption}</figcaption>
        </figure>
      ))}
      <dialog
        ref={dialog}
        className={s.photoDialog}
        onClose={() => setSelected(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        {selected !== null && (
          <div>
            <button
              type="button"
              className={s.closePhoto}
              onClick={close}
              autoFocus
            >
              Close photograph ×
            </button>
            <img
              src={`/bridge/${photos[selected].file}`}
              alt={photos[selected].alt}
            />
            <p>{photos[selected].caption}</p>
          </div>
        )}
      </dialog>
    </div>
  );
}
