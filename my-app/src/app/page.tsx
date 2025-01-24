"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Draggable from "react-draggable";

interface Note {
  src: string;
  position: { x: number; y: number };
  rotation: number;
  size?: {width:number; height:number};
}

interface Project {
  title: string;
  intro: string;
  image: string;
  slug: string;
  notes?: Note[];
}

const projects: Project[] = [
  {
    title: "HiPo",
    intro: "In today's increasingly polarized political landscape, it seems inevitable to fall into echo chambers and information cocoons, fueled by recommendation engines that prioritize engagement over balance. Yet, listening to and understanding opposing perspectives is more critical than ever. Inspired by Dean Sue's class on thinking in a polarized age, I created Hipo, a Chrome plugin that surfaces hidden biases and offers opposing viewpoints to help users navigate the overwhelming sea of information. Riding the wave of AI development and alignment efforts, Hipo strives to leverage technology to provide fair and thoughtful analysis of online content, fostering honest dialogue and civil engagement.",
    image: "/images/hipo.jpg",
    slug: "hipo"
  },
  {
    title: "rabbit r1",
    intro: "Leading product development for r1, a first of its kind AI hardware device, reimagining human-machine interaction.",
    image: "/images/rabbit.jpg",
    slug: "rabbit-r1"
  },
  {
    title: "wiser",
    intro: "At 19, I spent two transformative months in Muhuru Bay, Kenya, promoting STEM education at an all-girls high school. These young women, waking at 4 a.m. and studying until 10 p.m., embodied resilience, dreaming of college as their path to a brighter future. Yet, I witnessed a heartbreaking disconnect: a job market misaligned with education, leaving even the brightest jobless and many trapped in cycles of poverty...",
    image: "/images/wiser.jpg",
    slug: "wiser",
    notes: [
      { src: "/images/notes/note1.jpg", position: { x: 700, y: -800 }, rotation: -500 },
      { src: "/images/notes/note2.jpg", position: { x: -160, y: -660 }, rotation: 3, size: { width: 300, height: 300 } },
      { src: "/images/notes/note4.jpg", position: { x: 450, y: -370 }, rotation: 3, size: { width: 350, height: 350 } },
      { src: "/images/notes/note3.jpg", position: { x: 260, y: -650 }, rotation: 3, size: { width: 300, height: 300 } },
      { src: "/images/notes/note5.jpg", position: { x: -60, y: -60 }, rotation: 3, size: { width: 350, height: 350 } },
      
      { src: "/images/notes/note7.jpg", position: { x: 960, y: -750 }, rotation: 3, size: { width: 300, height: 300 } },
      { src: "/images/notes/note6.jpg", position: { x: 750, y: -300 }, rotation: 3, size: { width: 350, height: 350 } },
      { src: "/images/notes/note8.jpg", position: { x: 340, y: -100 }, rotation: 3 },
    ]
  },
  {
    title: "account abstraction wallets",
    intro: "I was fortunate enough to travel around the world to hack around blockcahin related ideas and build products for better UX",
    image: "/images/aa.jpg",
    slug: "AA"
  }
  ,
  {
    title: "multi-agent collaboration research",
    intro: "At the intersection of AI alignment and real-world deployment, I found myself grappling with a critical question: how can we design systems that navigate the complexities of human preferences while avoiding unintended harms? Inspired by the rapid advancements in large-scale models and the challenges they pose, I embarked on this research sponsored by Flashbots to explore scalable methods for aligning AI systems with nuanced human values.This paper examines the effectiveness of Commitment Devices in fostering cooperative behavior among LLM agents within game-theoretic contexts. Accepted and Presented at 2024 ICML Agentic Markets workshop.",
    image: "/images/agent.jpg",
    slug: "multi-agent"
  }, 
  {
    title: "Big Woman",
    intro: "Growing up in a culture that idealized frailty, I once wished to change my muscular body. Today, I celebrate it. Through sports and strength training, I’ve learned that aesthetics are not innate—they are learned. Here, I share my journey of embracing strength as beauty and inspire others to live strong, capable, and free. Join me in discovering the joy of strength.",
    image: "/images/flex.jpg",
    slug: "big-woman"
  },
  {
    title: "because it is there",
    intro: "A personal journey through technology and human experience.",
    image: "/images/hiking.jpg",
    slug: "because-it-is-there"
  }
];

function ProjectSection({ project }: { project: Project }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return project.slug === "wiser" ? (
    <div className="relative grid grid-cols-2 gap-8 max-w-6xl mx-auto p-8">
      <div className="relative">
      <div className="relative z-10">
        <Image
          src={project.image}
          alt={project.title}
          width={800}
          height={600}
          className="w-full h-[50vh] md:h-[70vh] object-cover"
        />
        </div>
        {!isMobile && project.notes?.map((note, index) => (
          <Draggable
            key={index}
            defaultPosition={{
              x: isMobile ? 0 :  note.position.x,
              y: isMobile ? 0 :  note.position.y
            }}
            disabled={isMobile}
          >
            <div
              className="draggable-note"
              style={{
                transform: `rotate(${note.rotation}deg)`,
                zIndex: 20,
                display: "inline-block",
              }}
            >
              <Image
                src={note.src}
                alt={`Note ${index + 1}`}
                width={note.size?.width || 200}
                height={note.size?.width || 200}
                className="cursor-pointer shadow-lg"
                draggable={false}
              />
            </div>
          </Draggable>
        ))}
      </div>
      <div className="flex flex-col justify-center">
        <h2 className="text-3xl md:text-6xl mb-4 md:mb-8">{project.title}</h2>
        <p className="text-base md:text-xl mb-4 md:mb-8">{project.intro}</p>
        <Link href={`/projects/${project.slug}`} className="text-xl underline">
          Read more
        </Link>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center min-h-screen py-4 md:py-8"> 
    <div className="grid grid-cols-1 md:grid-cols-10 gap-4 md:gap-8 max-w-6xl mx-auto px-4 md:px-8">
      {/* Image Section */}
      <div className="col-span-1 md:col-span-3">
        <Image
          src={project.image}
          alt={project.title}
          width={400} // Adjusted size for smaller images
          height={267} // Maintain golden ratio (400/1.618)
          className="w-full rounded-lg shadow-md object-cover"
        />
      </div>
      {/* Title + Intro Section */}
      <div className="col-span-1 md:col-span-7 flex flex-col justify-center space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold">{project.title}</h2>
        <p className="text-base md:text-lg">{project.intro}</p>
        <Link
          href={
            project.slug === "rabbit-r1"
              ? "https://www.rabbit.tech/" // Custom external link
              : `/projects/${project.slug}`
          }
          className="text-lg underline"
          target={project.slug === "rabbit-r1" ? "_blank" : "_self"} // Open external links in a new tab
        >
          Read more
        </Link>
      </div>
    </div>
    </div>
  );
}

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const sectionRefs = {
    about: useRef<HTMLDivElement>(null),
    projects: useRef<HTMLDivElement>(null),
    adventures: useRef<HTMLDivElement>(null),
    humans: useRef<HTMLDivElement>(null)
  };

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <div className="snap-y snap-mandatory h-screen overflow-scroll">
      {/* Hero Section */}
      <section className="snap-start h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl md:text-7xl font-bold text-center">make better humans</h1>
        {/* Mobile Menu Button */}
        <button 
          className="fixed top-4 right-4 z-50 md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>

        {/* Navigation */}
        <nav className={`
          fixed md:top-8 md:right-8 flex 
          ${isMenuOpen 
            ? 'top-0 right-0 h-screen w-screen bg-white flex-col items-center justify-center gap-8' 
            : 'hidden md:flex'} 
          md:gap-6
        `}>
          {Object.entries(sectionRefs).map(([key, ref]) => (
            <button
              key={key}
              onClick={() => scrollToSection(ref)}
              className="text-black hover:underline uppercase text-xl md:text-base"
            >
              {key}
            </button>
          ))}
        </nav>
      </section>

      {/* About Section */}
      <section ref={sectionRefs.about} className="snap-start min-h-screen p-4 md:p-8 flex items-center justify-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl mb-4 md:mb-8">About Yán Fēng 颜丰</h2>
          <div className="space-y-4 md:space-y-6 text-base md:text-lg">
            <p>Welcome! I appreciate you taking the time to get to know me</p>
            <p>I would appreciate you even more if you try to call me by Yan(last name) Feng(first name) as in its original Chinese sequence  🔈
              <button
                onClick={() => {
                  const audio = document.getElementById("name-audio") as HTMLAudioElement;
                  audio.play();
                }}
                style={{
                  color: "#808080",
                }}
                className="hover:text-blue-800"
              >
                Pronounce my name
              </button>
              <audio id="name-audio" src="pronounce.m4a" />
            </p>
            <p>
              I care about building deeply humanizing products
              as well as genuine connections that shape us into better humans
            </p>
            <p>Currently, I am studying computer science at Duke University 😈</p>
            <p>
              Previously, I worked as product at rabbit. I also spent a
              significant amount of time in multi-agent and blockchain research
            </p>
            <p>
              Ideally, I am one or multiple of the following: enthusiastic mountaineer, avid basketball player, spontaneous painter, adventurous cook, unreasonable dog person, yet-to-be triathlete 🤞
            </p>

            <br />
            <p>
              DON&apos;T hesitate if you want to talk about fun things, do
              sports together, or plan an adventure with me!
            </p>
            <p>
              Just leave a msg here:{" "}
              <span className="font-bold">yanffyy at gmail dot com</span> or
              catch me in the wild :D
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section ref={sectionRefs.projects} className="snap-start">
        {projects.map((project, index) => (
          <section key={index} className="snap-start min-h-screen">
            <ProjectSection project={project} />
          </section>
        ))}
        {/* Portal to All Projects */}
        <section className="snap-start min-h-screen flex items-center justify-center p-4">
          <div className="text-center space-y-4 md:space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold">All Projects</h2>
            <p className="text-base md:text-lg">Discover the details of all my projects here</p>
            <Link
              href="/projects"
              className="text-lg md:text-xl underline font-bold hover:text-gray-700"
            >
              View All Projects
            </Link>
          </div>
        </section>
      </section>

      {/* Adventures Section */}
      <section ref={sectionRefs.adventures} className="snap-start min-h-screen p-4 md:p-8 flex items-center justify-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl mb-4 md:mb-8">ADVENTURES</h2>
          <div className="columns-1 md:columns-2 gap-4 md:gap-8">
            <ul className="space-y-4 list-none">
              {[
                "fortunate enough to have roadtripped to 31/34 provinces in China with my parents",
                "climbed the ABC treks in Nepal with my parents and survived 7 days without showering",
                "solo traveled from Nairobi to Moshi, Tanzania through border points in a van that had no doors like in a movie",
                "crossing the Kenya-Tanzania border with my pika buddy to teach elementary school students",
                "climbed mountain Kilimanjaro",
                "ran a 5k in under 22 minutes",
                "guided my grandma through her first snorkeling experience, where she saw the tropical fish in her childhood dreams",
                "finished my first UTMB series ultra at the Canyons Endurance Runs 2023",
                "sleped in a tent for a month for the Duke and UNC basketball game with our raising mccain crew GO DUKE",
                "fell in a well in Tulum and had army people coming to send me to the hospital",
                "as an Ethereum Scholar, attended Devcon 6 in Bogotá, Colombia and stayed with an amazing hacker house",
                "kayaked in Venice and attended the 2021 La Biennale di Venezia",
                "had Yıldırım usta fish wrap 4 days in a roll in Istanbul",
                "trained muay thai in Phuket and lost a fight, still proud",
                "meditated 7 days in a buddhist temple",
              ].map((adventure, index) => (
                <li key={index} className="border-t pt-4">{adventure}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Humans Section */}
      <section ref={sectionRefs.humans} className="snap-start min-h-screen p-4 md:p-8 flex items-center justify-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl mb-4 md:mb-8">HUMANS</h2>
          <div className="space-y-4 text-base md: text-lg">
            <p>
              I am more than grateful to folks who I felt love from, some I know
              their names, some I don't 💙
            </p>
            <p>THANK YOU for making me a better human</p>
            <p>
              Those who felt comfortable to be publicly associated with me
              😏 are here:
            </p>
            <p>
              Robin and Shally Yan - well, thanks mum and dad for making me a
              human to begin with and thank you for making me unapologetically
              myself
            </p>
            <p>
              Lin Zhao, Patrick Merrigan, Victoria Zhang, ShaoBo Zhang, Nan
              Jiang, Qitian Hu, Sandy Wang, Jerry Jiang, Angie Xie, Henri
              Mattise, Steve Jobs, Jared Maccain, Ming Yao...
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
