"use client"
import { useRef } from 'react';
import Link from 'next/link';

// Font setup
const helveticaFont = {
  fontFamily: 'Helvetica, Arial, sans-serif',
  fontWeight: 'normal'
};

const helveticaBold = {
  fontFamily: 'Helvetica, Arial, sans-serif',
  fontWeight: 'bold'
};

// Types
interface Project {
  title: string;
  intro: string;
  image: string;
  slug: string;
}

const projects: Project[] = [
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
    image: "/images/wiser.JPG",
    slug: "wiser"
  }
];

export default function HomePage() {
  const sectionRefs = {
    about: useRef<HTMLDivElement>(null),
    projects: useRef<HTMLDivElement>(null),
    adventures: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null)
  };

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="grid grid-cols-12 gap-4 min-h-screen bg-white">
      {/* Hero Section */}
      <section className="col-span-12 h-screen flex items-center justify-center">
        <h1 className="text-7xl" style={helveticaBold}>
          make better humans
        </h1>
        <nav className="fixed top-8 right-8 flex gap-6">
          {Object.entries(sectionRefs).map(([key, ref]) => (
            <button
              key={key}
              onClick={() => scrollToSection(ref)}
              className="text-black hover:underline uppercase"
              style={helveticaFont}
            >
              {key}
            </button>
          ))}
        </nav>
      </section>

      {/* About Section */}
      <section
        ref={sectionRefs.about}
        className="col-span-12 min-h-screen grid grid-cols-12 gap-4 p-8"
      >
        <div className="col-start-2 col-span-8">
          <h2 className="text-5xl mb-8" style={helveticaFont}>
            About Yán Fēng 颜丰
          </h2>
          <div className="space-y-6" style={helveticaFont}>
            <p>welcome! I appreciate you taking the time to get to know me.</p>
            <p>I'm a builder and I care about building deeply humanizing products that shape us into better humans.</p>
            <p>currently, I am studying computer science at Duke University.</p>
            <p>previously, I worked as product at rabbit. I also spent a significant amount of time in multi-agent and blockchain research.</p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section ref={sectionRefs.projects} className="col-span-12">
      {projects.map((project, index) => (
        <section key={index} className="snap-start h-screen flex items-center justify-center">
          <div className="grid grid-cols-2 gap-8 max-w-6xl mx-auto p-8">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-[70vh] object-cover"
            />
            <div className="flex flex-col justify-center">
              <h2 className="text-6xl mb-8">{project.title}</h2>
              <p className="text-xl mb-8">{project.intro}</p>
              <Link href={`/projects/${project.slug}`} className="text-xl underline">
                Read more
              </Link>
            </div>
          </div>
        </section>
      ))}
      </section>

      {/* Contact Section */}
      <section
        ref={sectionRefs.contact}
        className="col-span-12 min-h-screen grid grid-cols-12 gap-4 p-8"
      >
        <div className="col-start-2 col-span-8">
          <h2 className="text-5xl mb-8" style={helveticaFont}>Contact</h2>
          <div className="space-y-4" style={helveticaFont}>
            <p>Don't hesitate if you want to talk about fun things, do sports together, or plan an adventure with me!</p>
            <p>Just leave me something here: <span className="font-bold">yanffyy at gmail dot com</span></p>
            <p>Or catch me in the wild!</p>
          </div>
        </div>
      </section>
    </div>
  );
}