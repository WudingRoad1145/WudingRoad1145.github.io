import Link from "next/link";
import Image from "next/image";
import NamePronunciation from "@/components/NamePronunciation";
export const metadata = { title: "About — Yán Fēng" };
export default function AboutPage() {
  return (
    <main className="about-page">
      <header className="page-heading">
        <span className="small-label">Nice to meet you</span>
        <h1>
          Yán Fēng <span lang="zh">颜丰</span>
        </h1>
        <div className="about-name">
          <p>Yan is my family name Feng is my given name</p>
          <NamePronunciation />
        </div>
      </header>
      <div className="about-grid">
        <figure>
          <Image
            src="/images/flex.jpg"
            alt="Yan flexing her arms in front of Duke Chapel"
            width={640}
            height={880}
            priority
          />
          <figcaption>A work in progress, in every sense</figcaption>
        </figure>
        <div className="about-prose">
          <p className="lead">
            I care about building deeply humanizing products—and genuine
            connections that shape us into better humans
          </p>
          <p>
            As cofounder and CTO of BabyMilu, I worked across hardware,
            firmware, and the experience of bringing an AI companion into
            everyday life
          </p>
          <p>
            My background includes computer science at Duke, product work at
            rabbit, and research in multi-agent systems and blockchain
          </p>
          <p>
            Ideally, I’m one or several of the following: an enthusiastic
            mountaineer, avid basketball player, spontaneous painter,
            adventurous cook, unreasonable dog person, and a first-time IRONMAN 70.3 finisher
          </p>
          <p>
            If you want to talk about fun things, play sports, or plan an
            adventure, please say hello
          </p>
          <a className="text-link" href="mailto:yanffyy@gmail.com">
            yanffyy@gmail.com
          </a>
          <div className="about-more">
            <Link href="/adventures">Adventures</Link>
            <Link href="/humans">Humans</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
