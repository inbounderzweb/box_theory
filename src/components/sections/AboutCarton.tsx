"use client";

import { useEffect, useState } from "react";
import styles from "./AboutCarton.module.css";

/** Each face samples the same photo coordinates, so the final net has no image seams. */
function PhotoFace({ photo, x, width, copy }: { photo: string; x: number; width: number; copy?: "left" | "right" }) {
  return (
    <div className={styles.face}>
      <svg viewBox={`${x} 170 ${width} 290`} preserveAspectRatio="none" aria-hidden="true">
        <image href={photo} x="70" y="170" width="580" height="290" preserveAspectRatio="xMaxYMid slice" />
        {copy && <rect x={x} y="170" width={width} height="290" fill="#33241c" opacity={copy === "left" ? ".5" : ".55"} />}
        <path d={`M${x} 170v290`} stroke="#fff" strokeOpacity=".55" strokeWidth="1.5" />
        {copy === "left" && <g className={styles.panelCopy} fill="#fff" fontWeight="600"><text x="88" y="262" fontSize="17">Better</text><text x="88" y="285" fontSize="17">packaging.</text><text x="88" y="308" fontSize="17">From idea</text><text x="88" y="331" fontSize="17">to delivery.</text><rect x="88" y="344" width="26" height="2" fill="#c3ac7f" /></g>}
        {copy === "right" && <g className={styles.panelCopy} fill="#fff" fontWeight="600"><text x="560" y="300" fontSize="14">Design.</text><text x="560" y="320" fontSize="14">Source.</text><text x="560" y="340" fontSize="14">Deliver.</text><rect x="560" y="352" width="22" height="2" fill="#c3ac7f" /></g>}
      </svg>
    </div>
  );
}

function DustFlap({ bottom = false }: { bottom?: boolean }) {
  return (
    <div className={`${styles.dustFlap} ${bottom ? styles.dustBottom : styles.dustTop}`}>
      <svg viewBox="0 0 130 64" preserveAspectRatio="none" aria-hidden="true"><path d={bottom ? "M23 0h84l-8 60H31Z" : "M23 64h84L99 4H31Z"} fill="#b99a60" stroke="#b99a60" strokeWidth="5" strokeLinejoin="round" /></svg>
    </div>
  );
}

export function AboutCarton({ photo }: { photo: string }) {
  const [ready, setReady] = useState(false);
  const [finished, setFinished] = useState(false);
  const [replay, setReplay] = useState(0);

  useEffect(() => {
    const image = new window.Image();
    // Keep the box closed until its photograph is available, including a cached load.
    const start = () => setReady(true);
    image.onload = start;
    image.onerror = start;
    image.src = photo;
    if (image.complete) start();
    return () => { image.onload = null; image.onerror = null; };
  }, [photo]);

  return (
    <div className={styles.component} data-about-carton>
      <div key={replay} className={styles.scene} data-ready={ready} role="img" aria-label="A Box Theory carton unfolding into a flat packaging template, revealing a photograph across its panels">
        <div className={styles.groundShadow} aria-hidden="true" />
        <div className={styles.world} aria-hidden="true" onAnimationEnd={event => { if (event.target === event.currentTarget) setFinished(true); }}>
          <div className={styles.backFace} />
          <PhotoFace photo={photo} x={375} width={170} />
          <div className={styles.closedPrint}>
            <svg viewBox="0 0 170 290" aria-hidden="true"><path d="m85 101 23 13v26l-23 13-23-13v-26l23-13Zm0 26 23-13m-46 0 23 13v26m-12-45 23 13" fill="none" stroke="currentColor" strokeWidth="1.3" /><text x="85" y="179" textAnchor="middle" fontSize="18" fontWeight="600">Box Theory</text><text x="85" y="197" textAnchor="middle" fontSize="5.7" letterSpacing="1.2">PACKAGING, UNFOLDED.</text><path d="M12 270v-14m-4 4 4-4 4 4m8 10v-14m-4 4 4-4 4 4" fill="none" stroke="currentColor" strokeWidth="1.2" /></svg>
          </div>

          <div className={styles.leftHinge}>
            <div className={styles.backFace} />
            <PhotoFace photo={photo} x={245} width={130} />
            <DustFlap /><DustFlap bottom />
            <div className={styles.rearHinge}>
              <div className={styles.backFace} />
              <PhotoFace photo={photo} x={70} width={175} copy="left" />
              <div className={styles.lidTop}>
                <div className={styles.lidSurface} />
                <div className={styles.topTongue}><svg viewBox="0 0 175 48" preserveAspectRatio="none"><path d="M38 48h104l-8-44H46Z" fill="#b99a60" /></svg></div>
              </div>
              <div className={styles.glueTab}><svg viewBox="0 0 44 290" preserveAspectRatio="none"><path d="M44 66 4 80v168l40 22Z" fill="#b99a60" /></svg></div>
            </div>
          </div>

          <div className={styles.rightHinge}>
            <div className={styles.backFace} />
            <PhotoFace photo={photo} x={545} width={105} copy="right" />
            <DustFlap /><DustFlap bottom />
          </div>
          <div className={styles.lidBottom}>
            <div className={styles.lidSurface} />
            <div className={styles.bottomTongue}><svg viewBox="0 0 170 52" preserveAspectRatio="none"><path d="M23 0h124l-10 48H33Z" fill="#b99a60" /></svg></div>
          </div>
        </div>
      </div>
      <div className={styles.controls}>
        <button type="button" disabled={!finished} onClick={() => { setFinished(false); setReplay(value => value + 1); }} aria-label="Replay box opening animation">
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true"><path d="M4 6a7 7 0 1 1-1 6M4 2v4h4" /></svg> Unfold again
        </button>
      </div>
      <noscript><style>{`[data-about-carton] *{animation:none!important}[data-about-carton] [class*="closedPrint"],[data-about-carton] [class*="controls"]{display:none!important}`}</style></noscript>
    </div>
  );
}
