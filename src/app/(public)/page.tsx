import { getImageProps } from "next/image";
import { IndustriesDirectory } from "@/components/sections/IndustriesDirectory";
import { IndustriesServed } from "@/components/sections/IndustriesServed";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { ProcessJourney } from "@/components/sections/ProcessJourney";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { SITE } from "@/lib/content";

const faqs = [
  ["What packaging services do you offer?", "We support packaging consultancy, structural and print design, sourcing, manufacturing coordination, and end-to-end project execution. We tailor the scope to your product, budget, and volumes."],
  ["Can you help with a new product launch?", "Yes. We can help develop your packaging from the initial brief through material selection, prototypes, sampling, and production coordination."],
  ["Is there a minimum order quantity?", "Minimum quantities depend on the material, structure, finishes, and manufacturing partner. Share your estimated quantity and we’ll help identify suitable options."],
  ["Do you work with businesses outside India?", "Box Theory serves brands in India, the GCC, and international markets. Contact us to discuss your destination and project requirements."],
  ["How do I get a quote?", "Send us your product details, dimensions, estimated quantity, and any design references. We’ll discuss the requirements with you before recommending the next steps."],
];

function BoxIcon({ variant = 0 }: { variant?: number }) {
  return <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m20 5 14 8v15l-14 8-14-8V13L20 5Z"/><path d="m6 13 14 8 14-8M20 21v15M13 9l14 8"/>{variant % 2 === 0 && <path d="m25 25 5-3M25 29l5-3"/>}</svg>;
}

const MARQUEE_ITEMS = ["Packaging Consultancy", "Packaging Design & Development", "Manufacturing Coordination", "Packaging Sourcing", "End-to-End Project Execution", "B2B Packaging Solutions"];

const HERO_ALT = "Box Theory delivery truck at a warehouse dock with a branded carton and tape roll in warm light";

export default function Page() {
  const common = { alt: HERO_ALT, fill: true, priority: true, quality: 80 } as const;
  const { props: heroDesktop } = getImageProps({ ...common, src: "/images/hero_section/desktop_banner_img1.png", sizes: "100vw" });
  const { props: heroMobile } = getImageProps({ ...common, src: "/images/hero_section/mobile_banner.png", sizes: "100vw" });
  return (
    <div className="roofer-home">
      <section className="roofer-hero" aria-labelledby="hero-title">
        <picture>
          <source media="(max-width: 767px)" srcSet={heroMobile.srcSet} />
          <source media="(min-width: 768px)" srcSet={heroDesktop.srcSet} />
          <img {...heroDesktop} alt={HERO_ALT} className="roofer-hero-image" />
        </picture>
        <div className="roofer-container roofer-hero-content">
          <p className="roofer-eyebrow"><span /> PACKAGING CONSULTANCY & EXECUTION</p>
          <h1 id="hero-title">Better packaging.<br />From idea<br />to delivery.</h1>
          <p className="roofer-hero-copy">Intelligent packaging for ambitious brands. We bring design, sourcing, and manufacturing together — so you can focus on what’s inside.</p>
          <div className="roofer-actions"><a className="roofer-button" href="#enquire">Let’s Build Your Packaging <span aria-hidden="true">↗</span></a><a className="roofer-text-link" href="#services">Explore Our Services <span aria-hidden="true">↗</span></a></div>
          <div className="roofer-hero-note"><span className="roofer-note-icon"><BoxIcon /></span><p>One partner. Every detail.<small>Serving India, GCC & international markets</small></p></div>
        </div>
        <div className="roofer-hero-caption" aria-hidden="true">THOUGHTFULLY DESIGNED. EXPERTLY DELIVERED.</div>
      </section>

      <section className="roofer-marquee" aria-label="What we do">
        <div className="roofer-marquee-track">
          {[0, 1].map(copy => (
            <ul key={copy} className="roofer-marquee-group" aria-hidden={copy === 1 ? "true" : undefined}>
              {MARQUEE_ITEMS.map(item => (
                <li key={item}><svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m20 5 14 8v15l-14 8-14-8V13L20 5Z"/><path d="m6 13 14 8 14-8M20 21v15"/></svg>{item}</li>
              ))}
            </ul>
          ))}
        </div>
      </section>

      <WhyChooseUs />

      <IndustriesServed />

      <IndustriesDirectory />

      <ProcessJourney />

      <FeaturedProducts />

      <section className="roofer-section roofer-faq"><div className="roofer-container roofer-split"><div><p className="roofer-eyebrow">A LITTLE MORE CLARITY</p><h2>Good questions.<br />Straight answers.</h2><p className="roofer-intro">Every packaging project is different. Here are a few things to know before we get started.</p><a className="roofer-text-link" href={`mailto:${SITE.email}`}>Ask Us Something Else <span aria-hidden="true">↗</span></a></div><div>{faqs.map(([question, answer], index) => <details className="roofer-faq-item" key={question} open={index === 0}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></div></section>

      <section className="roofer-enquiry" id="enquire"><div className="roofer-container"><div><p className="roofer-eyebrow">LET’S MAKE IT HAPPEN</p><h2>Your next great product<br />deserves great packaging.</h2><p>Tell us what you’re packaging. We’ll help you figure out what comes next.</p></div><div className="roofer-enquiry-actions"><a className="roofer-button" href={`mailto:${SITE.email}?subject=Packaging%20project%20enquiry`}>Start a Conversation <span aria-hidden="true">↗</span></a><a href={`tel:${SITE.phoneHref}`}>Or call {SITE.phone}</a></div></div></section>
    </div>
  );
}
