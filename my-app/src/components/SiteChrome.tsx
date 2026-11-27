"use client";

import { HomeLink, ReturnLink } from "./HomeReturn";
import Link from "next/link";
import roboticsStyles from "@/app/projects/robotics/robotics.module.css";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  ["/projects", "Work"],
  ["/adventures", "Courage"],
  ["/humans", "Humans"],
];

export default function SiteChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(false);
  }, [path]);
  const milu = path === "/projects/babymilu";
  const home = path === "/";
  return (
    <div
      className={
        home
          ? "home-canvas"
          : path === "/projects/robotics"
            ? roboticsStyles.shell
            : undefined
      }
    >
      <a className="skip-link" href="#page-content">
        Skip to content
      </a>
      <header className="site-header">
        <HomeLink className="wordmark" aria-label="Yán Fēng, home">
          Yán Fēng <span lang="zh">颜丰</span>
        </HomeLink>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close" : "Menu"}
        </button>
        <nav
          id="site-nav"
          className={open ? "site-nav is-open" : "site-nav"}
          aria-label="Main navigation"
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setOpen(false);
              document
                .querySelector<HTMLButtonElement>(".menu-toggle")
                ?.focus();
            }
          }}
        >
          {links.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              aria-current={
                path === href ||
                (href === "/projects" && path.startsWith("/projects/"))
                  ? "page"
                  : undefined
              }
            >
              {label}
            </Link>
          ))}
        </nav>
      </header>
      <div id="page-content" tabIndex={-1}>
        {[
          "/projects",
          "/projects/big-woman",
          "/projects/babymilu",
          "/humans",
          "/adventures",
        ].includes(path) && (
          <div className="home-return">
            <ReturnLink onlyFromHome />
          </div>
        )}
        {children}
      </div>
      {!milu && (
        <footer className="site-footer">
          <div>
            <HomeLink className="wordmark">
              Yán Fēng <span lang="zh">颜丰</span>
            </HomeLink>
            <p>Making things Becoming human</p>
          </div>
          <div>
            <span className="small-label">Leave a little hello</span>
            <span className="footer-contact">yanffyy at gmail dot com</span>
          </div>
          <a href="#page-content" className="back-to-top">
            Back to top
          </a>
        </footer>
      )}
    </div>
  );
}
