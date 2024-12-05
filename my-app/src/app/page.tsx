"use client"
import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import DraggableNotes from '@/components/DraggableNotes';

interface Project {
  title: string;
  intro: string;
  image: string;
  slug: string;
  notes?: {
    src: string;
    position: { x: number; y: number };
    rotation: number;
  }[];
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
    intro: "Leading product development for r1, a revolutionary AI hardware device.",
    image: "/images/rabbit.jpg",
    slug: "rabbit-r1"
  },
  {
    title: "because it is there",
    intro: "A personal journey through technology and human experience.",
    image: "/images/hiking.jpg",
    slug: "because-it-is-there"
  },
  {
    title: "wiser",
    intro: "A personal journey through technology and human experience.",
    image: "/images/wiser.jpg",
    slug: "wiser",
    notes: [
      { src: "/images/notes/test.jpg", position: { x: 70, y: 20 }, rotation: -5 },
      { src: "/images/notes/test.jpg", position: { x: 20, y: 60 }, rotation: 3 }
    ]
  }
];

function ProjectSection({ project }: { project: Project }) {
  return project.slug === 'wiser' ? (
    <DraggableNotes project={project} />
  ) : (
    <div className="relative grid grid-cols-2 gap-8 max-w-6xl mx-auto p-8">
      <div className="relative">
        <Image 
          src={project.image} 
          alt={project.title}
          width={800}
          height={600}
          className="w-full h-[70vh] object-cover"
        />
      </div>
      <div className="flex flex-col justify-center">
        <h2 className="text-6xl mb-8">{project.title}</h2>
        <p className="text-xl mb-8">{project.intro}</p>
        <Link href={`/projects/${project.slug}`} className="text-xl underline">
          Read more
        </Link>
      </div>
    </div>
  );
}

export default function HomePage() {
  const sectionRefs = {
    about: useRef<HTMLDivElement>(null),
    projects: useRef<HTMLDivElement>(null),
    adventures: useRef<HTMLDivElement>(null),
    humans: useRef<HTMLDivElement>(null)
  };

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="snap-y snap-mandatory h-screen overflow-scroll">
      {/* Hero Section */}
      <section className="snap-start h-screen flex items-center justify-center">
        <h1 className="text-7xl font-bold">make better humans</h1>
        <nav className="fixed top-8 right-8 flex gap-6">
          {Object.entries(sectionRefs).map(([key, ref]) => (
            <button
              key={key}
              onClick={() => scrollToSection(ref)}
              className="text-black hover:underline uppercase"
            >
              {key}
            </button>
          ))}
        </nav>
      </section>

      {/* About Section */}
      <section ref={sectionRefs.about} className="snap-start h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl mb-8">About Yán Fēng 颜丰</h2>
          <div className="space-y-6">
            <p>welcome! I appreciate you taking the time to get to know me</p>
            <p>I'm a builder and I care about building deeply humanizing products that shape us into better humans</p>
            <p>currently, I am studying computer science at Duke University</p>
            <p>previously, I worked as product at rabbit. I also spent a significant amount of time in multi-agent and blockchain research</p>
            <br />
            <p>DON&apos;T hesitate if you want to talk about fun things, do sports together, or plan an adventure with me!</p>
            <p>just leave a msg here: <span className="font-bold">yanffyy at gmail dot com</span> or catch me in the wild :D</p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section ref={sectionRefs.projects} className="snap-start">
        {projects.map((project, index) => (
          <section key={index} className="snap-start h-screen">
            <ProjectSection project={project} />
          </section>
        ))}
      </section>

      {/* Adventures Section */}
      <section ref={sectionRefs.adventures} className="snap-start h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl mb-8">ADVENTURES</h2>
          <div className="columns-2 gap-8">
            <ul className="space-y-4 list-none">
              {[
                "fortunate enough to have roadtripped to 31/34 provinces in China with my parents",
                "climbed the ABC treks in Nepal with my parents",
                "solo traveled from Nairobi to Moshi, Tanzania",
                "climbed mountain Kilimanjaro",
                "ran a 5k in under 22 minutes",
                "finished my first utmb at the Canyons Endurance Runs",
                "kayaked in Venice",
                "trained muay thai in Phuket"
              ].map((adventure, index) => (
                <li key={index} className="border-t pt-4">{adventure}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Humans Section */}
      <section ref={sectionRefs.humans} className="snap-start h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl mb-8">HUMANS</h2>
          <div className="space-y-4">
            <p>I am more than grateful to folks who I felt love from, some I know their names, some I don't</p>
            <p>THANK YOU for making me a better human</p>
            <p>Those who felt comfortable to be publicly associated with me /smirk are here:</p>
            <p>Robin and Shally Yan - well, thanks mum and dad for making me a human to begin with and thank you for making me unapologetically myself</p>
            <p>Lin Zhao, Patrick Merrigan, Victoria Zhang, ShaoBo Zhang, Nan Jiang, Qitian Hu, Sandy Wang, Jerry Jiang, Angie Xie, Henri Mattise, Steve Jobs, Jared Maccain, Ming Yao...</p>
          </div>
        </div>
      </section>
    </div>
  );
}