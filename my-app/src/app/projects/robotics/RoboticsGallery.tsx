"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import s from "./robotics.module.css";

const images = [
  {
    src: "/robotics/simulation.png",
    label: "Simulation",
    caption: "MuJoCo · simulation reference frame",
    alt: "Simulated SO101 arm beside blue tape and a paper target",
    width: 640,
    height: 640,
  },
  {
    src: "/robotics/real-arm.png",
    label: "Workbench",
    caption: "SO101 · the real workbench",
    alt: "Pink SO101 arm with blue tape and a hand-drawn target",
    width: 1000,
    height: 1000,
  },
  {
    src: "/robotics/bb-safety-so101.png",
    label: "Safety setup",
    caption: "BB gun safety project · SO101 setup",
    alt: "Pink SO101 beside a BB gun on a wooden workbench",
    width: 1920,
    height: 1080,
  },
  {
    src: "/robotics/bb-safety-lab.png",
    label: "Piper lab",
    caption: "Piper lab · two camera views on the laptop",
    alt: "Piper robot arms and a laptop displaying the lab camera views",
    width: 1280,
    height: 1707,
  },
  {
    src: "/robotics/bb-safety-camera.png",
    label: "Camera view",
    caption: "BB gun safety project · camera perspective",
    alt: "Wide-angle camera view of the BB gun and gripper at the lab bench",
    width: 960,
    height: 720,
  },
];

export default function RoboticsGallery() {
  const [active, setActive] = useState(2);
  const dialog = useRef<HTMLDialogElement>(null);
  const photo = images[active];
  return (
    <section
      className={s.gallery}
      aria-label="Robotics photographs and simulation"
    >
      <div className={s.galleryBar}>
        <span>Field images</span>
        <span>{String(active + 1).padStart(2, "0")} / 05</span>
      </div>
      <button
        className={s.imageStage}
        onClick={() => dialog.current?.showModal()}
        aria-label={`Enlarge ${photo.label}`}
        type="button"
      >
        <Image
          key={photo.src}
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(max-width: 700px) 92vw, 1080px"
          priority
        />
        <span className={s.enlarge}>Enlarge ↗</span>
      </button>
      <p className={s.imageCaption} aria-live="polite">
        {photo.caption}
      </p>
      <div className={s.thumbnails} aria-label="Choose an image">
        {images.map((image, i) => (
          <button
            type="button"
            key={image.src}
            onClick={() => setActive(i)}
            aria-pressed={active === i}
            aria-label={`Show ${image.label}`}
          >
            <Image
              src={image.src}
              alt=""
              width={160}
              height={90}
              sizes="160px"
            />
            <span>{image.label}</span>
          </button>
        ))}
      </div>
      <dialog
        ref={dialog}
        className={s.imageDialog}
        aria-label={photo.caption}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        <button type="button" onClick={() => dialog.current?.close()} autoFocus>
          Close image ×
        </button>
        <Image
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          sizes="95vw"
        />
        <p>{photo.caption}</p>
      </dialog>
    </section>
  );
}
