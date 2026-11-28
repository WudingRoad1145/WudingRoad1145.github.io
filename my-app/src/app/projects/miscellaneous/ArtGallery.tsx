"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { artworks, type Artwork } from "@/data/artworks";
import s from "./art.module.css";

export default function ArtGallery() {
  const [views, setViews] = useState<Record<string, number>>({});
  const [selected, setSelected] = useState<number | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const art = selected === null ? null : artworks[selected];

  useEffect(() => {
    if (selected === null) return;
    if (!dialog.current?.open) dialog.current?.showModal();
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [selected]);

  function chooseView(item: Artwork, index: number) {
    setViews((old) => ({ ...old, [item.id]: index }));
    setZoomed(false);
  }

  function close() {
    dialog.current?.close();
    setSelected(null);
    setZoomed(false);
  }

  function thumbnails(item: Artwork) {
    if (item.images.length < 2) return null;
    return (
      <div className={s.views} aria-label={`Views of ${item.title}`}>
        {item.images.map((picture, index) => (
          <button
            key={picture.src}
            type="button"
            aria-label={`View ${index + 1} of ${item.title}: ${picture.alt}`}
            aria-pressed={(views[item.id] || 0) === index}
            onClick={() => chooseView(item, index)}
          >
            <Image
              {...picture}
              alt={picture.alt}
              width={44}
              height={44}
              sizes="44px"
            />
          </button>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className={s.galleryLabel} id="artworks">
        <span>{artworks.length} more things to spend a little time with</span>
        <span className={s.handwritten}>click a piece, come closer. ↙</span>
      </div>
      <div className={s.gallery}>
        {artworks.map((item, index) => {
          const picture = item.images[views[item.id] || 0];
          return (
            <article
              id={item.id}
              key={item.id}
              className={`${s.artwork} ${item.feature ? s.feature : ""}`}
            >
              <div className={s.object}>
                <button
                  type="button"
                  className={s.imageButton}
                  onClick={() => {
                    setSelected(index);
                    setZoomed(false);
                  }}
                  aria-label={`Take a closer look at ${item.title}`}
                >
                  <Image
                    {...picture}
                    alt={picture.alt}
                    sizes={
                      item.feature
                        ? "(max-width: 700px) 88vw, 550px"
                        : "(max-width: 700px) 88vw, 480px"
                    }
                  />
                  <span className={s.closer}>come closer. ↗</span>
                </button>
                {thumbnails(item)}
                {item.note && <span className={s.objectNote}>{item.note}</span>}
              </div>
              <div className={s.caption}>
                <div className={s.catalogue}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span>{item.year}</span>
                </div>
                <h2>{item.title}</h2>
                <p className={s.medium}>{item.medium}</p>
                {item.story?.map((paragraph) => (
                  <p className={s.story} key={paragraph}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>
          );
        })}
      </div>
      <dialog
        ref={dialog}
        className={s.dialog}
        aria-labelledby="art-detail-title"
        onClose={() => {
          setSelected(null);
          setZoomed(false);
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        onKeyDown={(event) => {
          if (!art || !["ArrowLeft", "ArrowRight"].includes(event.key)) return;
          event.preventDefault();
          const offset = event.key === "ArrowRight" ? 1 : -1;
          chooseView(
            art,
            ((views[art.id] || 0) + offset + art.images.length) %
              art.images.length,
          );
        }}
      >
        {art && (
          <div className={s.detail}>
            <header className={s.detailHeader}>
              <span>
                {art.year} / {art.title}
              </span>
              <button
                autoFocus
                onClick={close}
                type="button"
                aria-label="Close artwork"
              >
                close ×
              </button>
            </header>
            <div className={s.detailBody}>
              <div>
                <div className={`${s.detailImage} ${zoomed ? s.zoomed : ""}`}>
                  <Image
                    {...art.images[views[art.id] || 0]}
                    alt={art.images[views[art.id] || 0].alt}
                    sizes="(max-width: 700px) 90vw, 65vw"
                    quality={90}
                  />
                </div>
                <div className={s.imageTools}>
                  <button
                    type="button"
                    onClick={() => setZoomed(!zoomed)}
                    aria-pressed={zoomed}
                  >
                    {zoomed
                      ? "fit the whole piece −"
                      : "look a little closer +"}
                  </button>
                  <span>
                    {(views[art.id] || 0) + 1} / {art.images.length}
                  </span>
                </div>
                {thumbnails(art)}
              </div>
              <div className={s.detailCopy}>
                <span className={s.eyebrow}>{art.date}</span>
                <h2 id="art-detail-title">{art.title}</h2>
                <p className={s.medium}>{art.medium}</p>
                <p className={s.dimensions}>{art.size}</p>
                {art.story?.map((p) => (
                  <p key={p} className={s.story}>
                    {p}
                  </p>
                ))}
                <nav className={s.pieceNavigation} aria-label="More artworks">
                  <button
                    type="button"
                    onClick={() => {
                      setSelected(
                        (selected! - 1 + artworks.length) % artworks.length,
                      );
                      setZoomed(false);
                    }}
                  >
                    ← previous piece
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelected((selected! + 1) % artworks.length);
                      setZoomed(false);
                    }}
                  >
                    next piece →
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
