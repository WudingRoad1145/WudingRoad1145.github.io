"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import Movable from "./Movable";
import NamePronunciation from "./NamePronunciation";
export default function PersonalDesk() {
  const router = useRouter();
  const [reset, setReset] = useState(0);
  return (
    <div className="desk-wrap">
      <div className="desk-introduction">
        <span className="desk-welcome">welcome to my little corner</span>
        <h2 id="keepsakes-title">
          hi, I’m Yán Fēng <span lang="zh">颜丰</span>
        </h2>
        <div className="desk-name">
          <span>Yan is my family name, Feng is my given name</span>
          <NamePronunciation />
        </div>
        <p>
          I care about building deeply humanizing products and the connections
          that shape us into better humans
        </p>
        <p>
          I’m the cofounder and CTO of BabyMilu, previously product at rabbit,
          with roots in computer science at Duke
        </p>
        <p>
          Ideally, I’m one or several of these: enthusiastic mountaineer, avid
          basketball player, spontaneous painter, adventurous cook, unreasonable
          dog person, and yet-to-be triathlete
        </p>
        <p className="desk-invitation">
          Come talk about fun things, play sports, or plan an adventure with me
        </p>
        <div className="desk-intro-links">
          <Link href="/about">A little more about me</Link>
          <a href="mailto:yanffyy@gmail.com">Say hello</a>
        </div>
        <span className="desk-play-prompt">
          psst — click things, drag things, have a little play
        </span>
      </div>
      <div
        className="desk"
        key={reset}
        aria-label="A few things from Yan’s world"
      >
        <Movable
          label="Open BabyMilu’s story"
          x={2}
          y={10}
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
          x={76}
          y={8}
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
          x={79}
          y={46}
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
          x={3}
          y={65}
          angle={6}
          className="desk-sticker"
          onOpen={() => router.push("/projects/big-woman")}
        >
          <span>
            BIG
            <br />
            WOMAN
          </span>
          <small>takes up space</small>
        </Movable>
      </div>
      <div className="desk-instructions">
        <span>Move things around Click to wander</span>
        <button type="button" onClick={() => setReset((r) => r + 1)}>
          Put everything back
        </button>
      </div>
    </div>
  );
}
