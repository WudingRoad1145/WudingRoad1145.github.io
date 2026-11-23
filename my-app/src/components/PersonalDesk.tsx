"use client";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Movable from "./Movable";
import NamePronunciation from "./NamePronunciation";
import DeskInvitation from "./DeskInvitation";
export default function PersonalDesk() {
  const router = useRouter();
  const [reset, setReset] = useState(0);
  const [foundInvitation, setFoundInvitation] = useState(false);
  const uncoverInvitation = useCallback(() => setFoundInvitation(true), []);
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
          You can catch me prototyping crazy stuff in my attic and at{" "}
          <a href="https://joininteract.com/">Interact Studio</a>, asking stupid
          questions at <a href="https://www.southparkcommons.com/">SPC</a>, or
          simping over dogs on the street
        </p>
        <p>
          Otherwise, I’m hooping at{" "}
          <a href="https://www.google.com/maps/search/?api=1&query=Koret+Health+and+Recreation+Center+San+Francisco">
            Koret
          </a>
          , hanging out with my CrossFit friends at{" "}
          <a href="https://www.google.com/maps/search/?api=1&query=3545+Geary+Boulevard+San+Francisco+CA+94118">
            TC Fitness
          </a>
          , or swimming with seals at{" "}
          <a href="https://www.google.com/maps/search/?api=1&query=Aquatic+Park+Cove+San+Francisco">
            Aquatic Park
          </a>{" "}
          (and GGTC friends who are probably faster)
        </p>
        <p className="desk-invitation">Recently: my first IRONMAN 70.3!</p>
        <div className="desk-intro-links">
          <Link href="/about">A little more about me</Link>
          <a href="mailto:yanffyy@gmail.com">Say hello</a>
        </div>
        <span className="desk-play-prompt">
          psst — click things, drag things, have a little play
          <em>I got you an easter egg!</em>
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
          label="Open my robotics explorations"
          x={76}
          y={8}
          angle={9}
          className="desk-photo"
          onOpen={() => router.push("/projects/robotics")}
        >
          <Image
            src="/robotics/real-arm.png"
            alt="My pink SO101 robot arm, blue tape, and a paper target on the workbench"
            width={1000}
            height={1000}
            sizes="(max-width: 700px) 40vw, (max-width: 900px) 240px, 250px"
          />
          <span>
            teaching this little arm a few things
            <small>(and importantly what you can’t do)</small>
          </span>
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
          y={52}
          angle={6}
          className="desk-sticker desk-runner"
          onOpen={() => router.push("/projects/big-woman")}
          onExplore={uncoverInvitation}
        >
          <Image
            src="/images/yan-triathlon-cutout.png"
            alt="Me smiling and making two peace signs during my first IRONMAN 70.3"
            width={1024}
            height={1536}
            sizes="(max-width: 900px) 35vw, 250px"
          />
          <span className="runner-spark" aria-hidden="true">
            ✳
          </span>
          <span className="runner-tag">
            BIG
            <br />
            WOMAN<small>takes up space</small>
          </span>
          <span className="runner-caption">my first 70.3!</span>
        </Movable>
        <DeskInvitation found={foundInvitation} />
      </div>
      <div className="desk-instructions">
        <span>Move things around Click to wander</span>
        <button
          type="button"
          onClick={() => {
            setReset((r) => r + 1);
            setFoundInvitation(false);
          }}
        >
          Put everything back
        </button>
      </div>
    </div>
  );
}
