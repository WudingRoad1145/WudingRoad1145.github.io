import { memories } from "@/data/memories";
import s from "./courage.module.css";

export const metadata = { title: "Courage — Yán Fēng" };

export default function AdventuresPage() {
  return (
    <main className={s.page}>
      <header className={s.heading}>
        <h1>On courage</h1>
        <p>A few things I want to remember</p>
      </header>
      <ul className={s.memories} aria-label="Personal memories">
        {memories.map((memory) => (
          <li key={memory}>{memory}</li>
        ))}
      </ul>
    </main>
  );
}
