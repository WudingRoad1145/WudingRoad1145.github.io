"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Movable from "./Movable";
export default function PersonalDesk() {
  const router = useRouter();
  const [reset, setReset] = useState(0);
  return (
    <div className="desk-wrap">
      <div
        className="desk"
        key={reset}
        aria-label="A few things from Yan’s world"
      >
        <span className="desk-scribble">a few things from my world</span>
        <Movable
          label="Open BabyMilu’s story"
          x={8}
          y={14}
          angle={-12}
          className="desk-milu"
          onOpen={() => router.push("/projects/babymilu")}
        >
          <img
            src="/babymilu/original-plush.png"
            alt="BabyMilu with its original character face"
          />
          <span>our baby, Milu</span>
        </Movable>
        <Movable
          label="Open my adventures"
          x={48}
          y={9}
          angle={9}
          className="desk-photo"
          onOpen={() => router.push("/adventures")}
        >
          <img
            src="/images/hiking.jpg"
            alt="Monkeydokey and me at the top of Kilimanjaro"
          />
          <span>It’s Monkay’s 10 yo summit day!</span>
        </Movable>
        <Movable
          label="Read the Wiser letters"
          x={54}
          y={40}
          angle={-9}
          className="desk-letter"
          onOpen={() => router.push("/projects/wiser")}
        >
          <img
            src="/images/notes/note1.jpg"
            alt="A green handwritten letter that says Yen the Queen"
          />
          <span>something i’m never forgetting</span>
        </Movable>
        <Movable
          label="Open Big Woman"
          x={5}
          y={70}
          angle={6}
          className="desk-sticker"
          onOpen={() => router.push("/projects/big-woman")}
        >
          <span>
            BIG
            <br />
            WOMAN
          </span>
          <small>takes up space.</small>
        </Movable>
      </div>
      <div className="desk-instructions">
        <span>Move things around. Click to wander.</span>
        <button type="button" onClick={() => setReset((r) => r + 1)}>
          Put everything back
        </button>
      </div>
    </div>
  );
}
