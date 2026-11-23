import type { Metadata } from "next";
import BabyMiluStory from "./BabyMiluStory";

export const metadata: Metadata = {
  title: "BabyMilu — Bringing a character home | Yan Feng",
  description:
    "A personal account of designing and building BabyMilu: from a GoPro inside Kuromi to prototypes, factory floors, and a promise to our community",
};

export default function BabyMiluPage() {
  return <BabyMiluStory />;
}
