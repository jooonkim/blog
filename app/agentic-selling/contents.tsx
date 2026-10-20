'use client';

import { useEffect, useState } from 'react';

type Section = { id: string; title: string; level: number };

export default function Contents() {
  const [sections, setSections] = useState<Section[]>([]);
  const [active, setActive] = useState('');

  useEffect(() => {
    const headings = Array.from(
      document.querySelectorAll<HTMLElement>('.agentic-post h2, .agentic-post h3')
    );
    const used = new Set<string>();
    const entries = headings.map((heading) => {
      const title = heading.textContent || '';
      const base = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      let id = base;
      let suffix = 2;
      while (used.has(id)) id = `${base}-${suffix++}`;
      used.add(id);
      heading.id = id;
      return { id, title, level: Number(heading.tagName.slice(1)) };
    });
    setSections(entries);
    let frame = 0;
    const update = () => {
      frame = 0;
      let current = headings[0]?.id || '';
      for (const heading of headings) {
        if (heading.getBoundingClientRect().top <= 160) current = heading.id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    // IDs are assigned after hydration, so restore direct section links.
    const hash = decodeURIComponent(window.location.hash.slice(1));
    if (hash && used.has(hash)) document.getElementById(hash)?.scrollIntoView();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const links = (
    <ol>
      {sections.map((section) => (
        <li key={section.id} className={section.level === 3 ? 'contents-subsection' : ''}>
          <a
            href={`#${section.id}`}
            aria-current={active === section.id ? 'location' : undefined}
            onClick={(event) => {
              event.currentTarget.closest('details')?.removeAttribute('open');
              setActive(section.id);
            }}
          >
            {section.title}
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <>
      <nav className="post-contents-desktop" aria-label="Article contents">
        <p>On this page</p>
        {links}
      </nav>
      <details className="post-contents-mobile">
        <summary>On this page</summary>
        <nav aria-label="Article contents">{links}</nav>
      </details>
    </>
  );
}
