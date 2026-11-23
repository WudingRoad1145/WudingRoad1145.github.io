"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  ["/projects", "Work"],
  ["/about", "About"],
  ["/adventures", "Adventures"],
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
  const navigation = home
    ? [
        ["/about", "About"],
        ["/projects", "Projects"],
        ["/adventures", "Adventures"],
        ["/humans", "Humans"],
      ]
    : links;
  return (
    <div className={home ? "home-canvas" : undefined}>
      <a className="skip-link" href="#page-content">
        Skip to content
      </a>
      <header className="site-header">
        <Link href="/" className="wordmark" aria-label="Yán Fēng, home">
          Yán Fēng <span lang="zh">颜丰</span>
        </Link>
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
          {navigation.map(([href, label]) => (
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
        {children}
      </div>
      {!milu && (
        <footer className="site-footer">
          <div>
            <Link href="/" className="wordmark">
              Yán Fēng <span lang="zh">颜丰</span>
            </Link>
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
