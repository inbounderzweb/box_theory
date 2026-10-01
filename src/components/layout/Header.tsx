"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type CSSProperties, type KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";
import { NAV_ITEMS, SITE } from "@/lib/content";
import styles from "./Header.module.css";

function BoxGlyph() {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden="true" className={styles.boxGlyph}>
      <path d="M8 18 20 12l12 6v14l-12 6-12-6Z" fill="currentColor" opacity=".12" />
      <path d="m8 18 12 6 12-6v14l-12 6-12-6V18Zm12 6v14" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path className={styles.glyphLeft} d="m8 18 12-6 0 12Z" fill="currentColor" fillOpacity=".24" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path className={styles.glyphRight} d="m20 12 12 6-12 6Z" fill="currentColor" fillOpacity=".12" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function Parcel() {
  return (
    <div className={styles.parcelStage} aria-hidden="true">
      <span className={styles.orbit} />
      <span className={styles.parcelCoordinate}>DESIGNED TO OPEN POSSIBILITIES</span>
      <svg viewBox="0 0 360 300" className={styles.parcel}>
        <ellipse cx="185" cy="262" rx="109" ry="15" fill="#4a3831" opacity=".09" />
        <g className={styles.parcelBackFlaps}>
          <path d="m180 109-74 37-42-55 76-35Z" fill="#cfc09f" stroke="#b99a60" />
          <path d="m180 109 74 37 43-55-77-35Z" fill="#ded2bc" stroke="#b99a60" />
        </g>
        <path d="m106 146 74-37 74 37-74 39Z" fill="#4a3831" />
        <path d="m180 118-61 30 61 30 62-30Z" fill="#4a3831" />
        <path d="m106 146 74 39v77l-74-40Z" fill="#c3ac7f" stroke="#b99a60" />
        <path d="m180 185 74-39v76l-74 40Z" fill="#cfc09f" stroke="#b99a60" />
        <path d="m212 169 14-7v77l-14 7Z" fill="#ded2bc" opacity=".8" />
        <path d="m119 190 24 13m-24-5 24 13m-24-5 16 9" stroke="#6b5d56" strokeWidth="2" />
        <g className={styles.parcelFrontFlaps}>
          <path d="m106 146 74 39-39 37-75-40Z" fill="#ded2bc" stroke="#b99a60" />
          <path d="m180 185 74-39 41 36-75 40Z" fill="#f1ebdf" stroke="#b99a60" />
        </g>
        <path className={styles.parcelSpark} d="M179 52v20m-10-10h20M87 124v12m-6-6h12m192-19v12m-6-6h12" fill="none" stroke="#b99a60" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

function containFocus(event: KeyboardEvent<HTMLDialogElement>) {
  if (event.key !== "Tab") return;
  const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"))
    .filter(element => element.getClientRects().length > 0 && !element.closest("[inert]"));
  const first = controls[0];
  const last = controls[controls.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last?.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first?.focus();
  }
}

export function Header() {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const frame = useRef<number | null>(null);
  const unlockScroll = useRef<(() => void) | null>(null);
  const lastPath = useRef(pathname);

  const resetTransientState = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    closeTimer.current = null;
    frame.current = null;
    unlockScroll.current?.();
    unlockScroll.current = null;
  }, []);

  const finishClose = useCallback(() => {
    resetTransientState();
    dialog.current?.close();
    trigger.current?.focus({ preventScroll: true });
  }, [resetTransientState]);

  const closeMenu = useCallback(() => {
    if (!dialog.current?.open || closeTimer.current) return;
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = null;
    setExpanded(false);
    closeButton.current?.focus({ preventScroll: true });
    // Leave the native modal active until the 720ms carton closing transition finishes.
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    closeTimer.current = setTimeout(finishClose, reducedMotion ? 0 : 800);
  }, [finishClose]);

  const openMenu = () => {
    if (!dialog.current || dialog.current.open) return;
    setExpanded(false);
    const body = document.body;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbar > 0) body.style.paddingRight = `${parseFloat(getComputedStyle(body).paddingRight) + scrollbar}px`;
    body.style.overflow = "hidden";
    unlockScroll.current = () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
    };
    dialog.current.showModal();
    closeButton.current?.focus({ preventScroll: true });
    // Paint the closed carton first, then unfold its four hinged panels.
    frame.current = requestAnimationFrame(() => {
      frame.current = requestAnimationFrame(() => {
        frame.current = null;
        if (dialog.current?.open) setExpanded(true);
      });
    });
  };

  useEffect(() => {
    if (lastPath.current !== pathname) {
      lastPath.current = pathname;
      // History navigation can change the route without clicking a menu link.
      if (dialog.current?.open) finishClose();
    }
  }, [pathname, finishClose]);

  useEffect(() => resetTransientState, [resetTransientState]);

  const isActive = (href: string) => href === "/" ? pathname === "/" : (pathname === href || pathname.startsWith(`${href}/`));

  return (
    <header className={`${styles.header} ${pathname === "/" ? styles.overlay : ""}`}>
      <a className={styles.skip} href="#main">Skip to content</a>
      <div className={styles.bar}>
        <Link href="/" aria-label="Box Theory home" className={styles.brand}>
          <span className={styles.brandIcon}><BoxGlyph /></span>
          <span>Box Theory<small>PACKAGING, UNFOLDED.</small></span>
        </Link>
        <nav className={styles.quickNav} aria-label="Primary navigation">
          {NAV_ITEMS.map(item => (
            <Link key={item.href} href={item.href} className={styles.tab} aria-current={isActive(item.href) ? "page" : undefined}>
              <span className={styles.tabFlap} aria-hidden="true" />
              <span>{item.label}</span><span className={styles.tabDot} aria-hidden="true" />
            </Link>
          ))}
        </nav>
        <div className={styles.actions}>
          <Link className={styles.enquire} href="/#enquire">Let’s talk <span aria-hidden="true">↗</span></Link>
          <button ref={trigger} type="button" className={styles.menuTrigger} onClick={openMenu} aria-haspopup="dialog" aria-expanded={expanded} aria-controls="box-navigation" aria-label="Open menu">
            <svg className={styles.hamburger} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            {/* <span>Menu</span> */}
          </button>
        </div>
      </div>

      <dialog ref={dialog} id="box-navigation" className={`${styles.dialog} ${expanded ? styles.expanded : ""}`} aria-labelledby="box-navigation-title" onKeyDown={containFocus} onCancel={event => { event.preventDefault(); closeMenu(); }} onClick={event => { if (event.target === event.currentTarget) closeMenu(); }} onClose={() => { if (!dialog.current?.open) { setExpanded(false); resetTransientState(); } }}>
        <div className={styles.dialogShell}>
          <div className={styles.dialogTop}>
            <div><span className={styles.statusDot} /><h2 id="box-navigation-title">A world inside the box.</h2></div>
            <button ref={closeButton} type="button" onClick={closeMenu} className={styles.closeButton} aria-label="Close navigation box"><span>Close box</span><span aria-hidden="true">×</span></button>
          </div>
          <div className={styles.carton}>
            <div className={styles.interior} inert={!expanded}>
              <div className={styles.menuLayout}>
                <nav className={styles.menuLinks} aria-label="Full navigation">
                  <p className={styles.microLabel}>EXPLORE BOX THEORY</p>
                  {NAV_ITEMS.map((item, index) => (
                    <Link key={item.href} href={item.href} onClick={closeMenu} className={styles.menuLink} aria-current={isActive(item.href) ? "page" : undefined} style={{ "--item": index } as CSSProperties}>
                      <span className={styles.linkNumber}>0{index + 1}</span><span className={styles.linkLabel}>{item.label}</span><span className={styles.linkArrow} aria-hidden="true">↗</span>
                    </Link>
                  ))}
                </nav>
                <aside className={styles.feature}>
                  <p className={styles.microLabel}>GOOD THINGS START WITH A BOX.</p>
                  <Parcel />
                  <h3>Think outside.<br /><span>We’ll handle the box.</span></h3>
                  <Link href="/#enquire" className={styles.featureCta} onClick={closeMenu}>Let’s build something <span aria-hidden="true">↗</span></Link>
                </aside>
              </div>
              <div className={styles.menuFooter}><a href={`mailto:${SITE.email}`}>{SITE.email} <span aria-hidden="true">↗</span></a><p>INDIA <span>·</span> GCC <span>·</span> BEYOND</p><span className={styles.handlingMark} aria-hidden="true">↑↑ &nbsp; HANDLE WITH IDEAS</span></div>
            </div>
            <div className={`${styles.flap} ${styles.flapLeft}`} aria-hidden="true" />
            <div className={`${styles.flap} ${styles.flapRight}`} aria-hidden="true" />
            <div className={`${styles.flap} ${styles.flapTop}`} aria-hidden="true"><span className={styles.flapWordmark}>Box Theory</span><span className={styles.foldLine} /></div>
            <div className={`${styles.flap} ${styles.flapBottom}`} aria-hidden="true"><span className={styles.seal}>PACKED WITH POSSIBILITIES</span></div>
          </div>
          <div className={styles.dialogFootnote} aria-hidden="true"><span>THOUGHTFULLY DESIGNED. EXPERTLY DELIVERED.</span><span>BOX THEORY / EST. FOR YOUR NEXT IDEA</span></div>
        </div>
      </dialog>
    </header>
  );
}
