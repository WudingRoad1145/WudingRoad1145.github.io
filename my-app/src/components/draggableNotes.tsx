"use client"
import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Note {
  src: string;
  position: { x: number; y: number };
  rotation: number;
}

interface Position {
  x: number;
  y: number;
}

interface Project {
  title: string;
  intro: string;
  image: string;
  slug: string;
  notes?: Note[];
}

export default function DraggableNotes({ project }: { project: Project }) {
  const [notes, setNotes] = useState(project.notes || []);
  const [draggingNote, setDraggingNote] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const initialMousePos = useRef<Position | null>(null);
  const initialNotePos = useRef<Position | null>(null);

  const handleMouseDown = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    setDraggingNote(index);
  
    const container = containerRef.current!.getBoundingClientRect();
    const note = notes[index];
    const noteX = (note.position.x / 100) * container.width;
    const noteY = (note.position.y / 100) * container.height;
  
    initialMousePos.current = { x: e.clientX, y: e.clientY };
    initialNotePos.current = { x: note.position.x, y: note.position.y };
  };
  

  const handleMouseMove = (e: React.MouseEvent) => {
    if (
      draggingNote === null ||
      !initialMousePos.current ||
      !initialNotePos.current ||
      !containerRef.current
    ) {
      return;
    }
  
    const container = containerRef.current.getBoundingClientRect();
    const deltaX = e.clientX - initialMousePos.current.x;
    const deltaY = e.clientY - initialMousePos.current.y;
  
    // Adjust position based on the container size to maintain percentages
    const newX = initialNotePos.current.x + (deltaX / container.width) * 100;
    const newY = initialNotePos.current.y + (deltaY / container.height) * 100;
  
    setNotes((prev) =>
      prev.map((note, i) =>
        i === draggingNote
          ? {
              ...note,
              position: {
                x: Math.min(Math.max(0, newX), 100), // Constrain within container bounds
                y: Math.min(Math.max(0, newY), 100),
              },
            }
          : note
      )
    );
  };
  

  const handleMouseUp = () => {
    setDraggingNote(null);
    initialMousePos.current = null;
    initialNotePos.current = null;
  };

  return (
    <div className="grid grid-cols-2 gap-8 max-w-6xl mx-auto p-8">
      <div 
        ref={containerRef}
        className="relative" 
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <Image 
          src={project.image} 
          alt={project.title}
          width={800}
          height={600}
          className="w-full h-[70vh] object-cover"
        />
        {notes.map((note, index) => (
          <Image
            key={index}
            src={note.src}
            alt={`Note ${index + 1}`}
            width={200}
            height={200}
            className="absolute cursor-move hover:scale-105 transition-transform"
            style={{
              left: `${note.position.x}%`,
              top: `${note.position.y}%`,
              transform: `rotate(${note.rotation}deg)`,
              zIndex: draggingNote === index ? 20 : 10,
              pointerEvents: 'auto',
              userSelect: 'none'
            }}
            onMouseDown={(e) => handleMouseDown(e, index)}
            draggable={false}
          />
        ))}
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