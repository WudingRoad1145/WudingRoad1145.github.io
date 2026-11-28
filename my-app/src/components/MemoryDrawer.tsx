"use client";
import { useState } from "react";
import { memories } from "@/data/memories";
export default function MemoryDrawer() {
  const [index, setIndex] = useState(0);
  return (
    <section className="memory-drawer" aria-label="Yan’s adventure memories">
      <div>
        <span className="handwritten">little bits of a life.</span>
        <h2>
          I said yes
          <br />
          Here’s what happened
        </h2>
        <button
          type="button"
          onClick={() =>
            setIndex(
              (i) =>
                (i + 1 + Math.floor(Math.random() * (memories.length - 1))) %
                memories.length,
            )
          }
        >
          Pull out another memory
        </button>
      </div>
      <article className="memory-ticket" aria-live="polite">
        <span>A memory I’m keeping</span>
        <p>{memories[index]}</p>
        <small>No grand lesson required.</small>
      </article>
    </section>
  );
}
