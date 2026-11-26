"use client";

import Image from "next/image";
import { createElement, useEffect, useRef, useState } from "react";
import type { ModelViewerElement } from "@google/model-viewer";
import s from "./CadViewer.module.css";

const model = "/babymilu/cad/top-cover-loop.glb";
const initialOrbit = "220deg 65deg 110%";

export default function CadViewer() {
  const viewer = useRef<ModelViewerElement>(null);
  const alive = useRef(true);
  const [enabled, setEnabled] = useState(false);
  const [retry, setRetry] = useState(0);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">(
    "idle",
  );

  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
    };
  }, []);

  useEffect(() => {
    const element = viewer.current;
    if (!enabled || !element) return;
    const loaded = () => setStatus("ready");
    const failed = () => {
      setStatus("error");
      setEnabled(false);
    };
    element.addEventListener("load", loaded);
    element.addEventListener("error", failed);
    if (element.loaded) loaded();
    return () => {
      element.removeEventListener("load", loaded);
      element.removeEventListener("error", failed);
    };
  }, [enabled]);

  const start = async () => {
    if (status === "error") setRetry((count) => count + 1);
    setStatus("loading");
    try {
      // Neither the WebGL library nor the geometry is requested until invited.
      await import("@google/model-viewer");
      if (alive.current) setEnabled(true);
    } catch {
      if (alive.current) setStatus("error");
    }
  };
  const reset = () => {
    if (!viewer.current) return;
    viewer.current.cameraOrbit = initialOrbit;
    viewer.current.cameraTarget = "auto auto auto";
    viewer.current.fieldOfView = "30deg";
    viewer.current.jumpCameraToGoal();
  };
  const turn = (degrees: number) => {
    const element = viewer.current;
    if (!element) return;
    const orbit = element.getCameraOrbit();
    element.cameraOrbit = `${orbit.theta + (degrees * Math.PI) / 180}rad ${orbit.phi}rad ${orbit.radius}m`;
    element.jumpCameraToGoal();
  };
  const zoom = (steps: number) => {
    const element = viewer.current;
    if (!element) return;
    const orbit = element.getCameraOrbit();
    element.cameraOrbit = `${orbit.theta}rad ${orbit.phi}rad ${orbit.radius * Math.pow(0.8, steps / 2)}m`;
    element.jumpCameraToGoal();
  };

  return (
    <section id="cad" className={s.study} aria-labelledby="cad-title">
      <div className={s.copy}>
        <span className={s.date}>May 2026 · A closer look</span>
        <h3 id="cad-title">A little part you can turn over</h3>
        <p>
          The top cover and carrying loop, from our CAD files. Turn it around to
          see how the pieces sit together.
        </p>
      </div>
      <div className={s.frame}>
        {enabled ? (
          createElement("model-viewer", {
            ref: viewer,
            class: s.model,
            src: retry ? `${model}?retry=${retry}` : model,
            alt: "BabyMilu top cover and carrying loop, a three-part CAD model",
            "camera-controls": "",
            "camera-orbit": initialOrbit,
            "camera-target": "auto auto auto",
            "field-of-view": "30deg",
            "touch-action": "pan-y",
            "disable-zoom": "",
            "disable-pan": "",
            "disable-tap": "",
            "interaction-prompt": "none",
            "interpolation-decay": "0",
            "shadow-intensity": "0.3",
            exposure: "0.85",
            loading: "eager",
          })
        ) : (
          <div className={s.poster}>
            <Image
              src="/babymilu/cad/top-cover-loop.webp"
              alt="Preview of the BabyMilu top cover and carrying loop CAD model"
              width={758}
              height={418}
              sizes="(max-width: 600px) 90vw, 760px"
              loading="lazy"
            />
            <button
              type="button"
              onClick={start}
              disabled={status === "loading"}
            >
              {status === "loading"
                ? "Loading 3D…"
                : status === "error"
                  ? "Try 3D again"
                  : "Turn it around in 3D"}
            </button>
          </div>
        )}
        {enabled && status === "loading" && (
          <p className={s.loading} role="status">
            Loading the model…
          </p>
        )}
      </div>
      <div className={s.controls}>
        {status === "ready" && (
          <>
            <div
              className={s.buttons}
              role="group"
              aria-label="3D model controls"
            >
              <button type="button" onClick={() => turn(-30)}>
                Turn left
              </button>
              <button type="button" onClick={() => turn(30)}>
                Turn right
              </button>
              <button type="button" onClick={() => zoom(2)}>
                Zoom in
              </button>
              <button type="button" onClick={() => zoom(-2)}>
                Zoom out
              </button>
              <button type="button" onClick={reset}>
                Reset view
              </button>
            </div>
            <span>Drag to turn · swipe up or down to keep reading</span>
          </>
        )}
        <p
          role="status"
          aria-live="polite"
          className={status === "error" ? s.error : s.status}
        >
          {status === "error"
            ? "The 3D view couldn’t load. You can still see the part in the preview above."
            : status === "ready"
              ? "3D view ready. Use the model or the controls to explore."
              : ""}
        </p>
      </div>
      <p className={s.caption}>
        CAD geometry shown in a neutral finish. The color here isn’t a material
        specification.
      </p>
    </section>
  );
}
