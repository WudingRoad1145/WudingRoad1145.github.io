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
  return (
    <>
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
        {children}
      </div>
      {!milu && (
        <footer className="site-footer">
          <div>
            <Link href="/" className="wordmark">
              Yán Fēng <span lang="zh">颜丰</span>
            </Link>
            <p>Making things. Becoming human.</p>
          </div>
          <div>
            <span className="small-label">Leave a little hello</span>
            <a href="mailto:yanffyy@gmail.com">yanffyy@gmail.com</a>
          </div>
          <a href="#page-content" className="back-to-top">
            Back to top
          </a>
        </footer>
      )}
    </>
  );
}
