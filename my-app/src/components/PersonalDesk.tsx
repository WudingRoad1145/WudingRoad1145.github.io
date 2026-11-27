"use client";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import Image from "next/image";
import RunnerCutout from "./RunnerCutout";
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
        <h2 id="keepsakes-title">
          hi, I’m Yán Fēng <span lang="zh">颜丰</span>
        </h2>
        <div className="desk-name">
          <span>
            Yan is my family name, Feng is my given name — so you’ve probably
            come across my name in English as Feng Yan.
          </span>
          <span>
            But this is my little corner of the internet, so bear with my
            stubbornness about keeping the original order.
          </span>
          <NamePronunciation />
        </div>
        <p>
          I care about building deeply humanizing products and the connections
          that shape us into better humans.
        </p>
        <p>
          I’m the cofounder and CTO of BabyMilu, previously product at rabbit,
          with roots in computer science at Duke.
        </p>
        <p>
          You can catch me prototyping crazy stuff in my attic and at{" "}
          <a href="https://joininteract.com/">Interact Studio</a>, asking stupid
          questions at <a href="https://www.southparkcommons.com/">SPC</a>, or
          simping over dogs on the street.
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
          (and <a href="https://ggtc.org/">GGTC</a> friends who are probably
          faster than the seals).
        </p>
        <div className="desk-intro-links">
          <span>
            Say hi any time — or{" "}
            <a href="mailto:yanffyy@gmail.com">shoot me a message here</a>
          </span>
        </div>
        <span className="desk-play-prompt">
          <span className="desk-mouse-hint">
            psst — click things, drag things, have a little play
            <em>I got you an easter egg!</em>
          </span>
          <span className="desk-touch-hint">
            psst — tap things, have a little play
          </span>
        </span>
      </div>
      <div
        className="desk"
        key={reset}
        aria-label="A few things from Yan’s world"
      >
        <Movable
          staticOnMobile
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
          staticOnMobile
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
          staticOnMobile
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
          <span>inner strength that kept me going</span>
        </Movable>
        <Movable
          staticOnMobile
          label="Open Big Woman"
          x={3}
          y={52}
          angle={6}
          className="desk-sticker desk-runner"
          onOpen={() => router.push("/projects/big-woman")}
          onExplore={uncoverInvitation}
        >
          <RunnerCutout />
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
        <span>
          <span className="desk-mouse-hint">
            Move things around · Click to wander
          </span>
          <span className="desk-touch-hint">
            Swipe to scroll · Tap to explore
          </span>
        </span>
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
