#!/usr/bin/env python3
"""Generates the industry card illustrations in public/images/industries/*.svg (brand palette)."""
import os

OUT = os.path.join(os.path.dirname(__file__), "..", "public", "images", "industries")
CREAM, LIGHT, SOFT, MED, GOLD = "#f1ebdf", "#ded2bc", "#cfc09f", "#c3ac7f", "#b99a60"
COCOA, COCOA2, MUTED, WHITE = "#4a3831", "#6b5d56", "#8b817d", "#ffffff"
KRAFT, KRAFT_D, KRAFT_L = "#c9a971", "#a98a57", "#dcc293"

def box(x, y, w, h, d, front, side, top, extra=""):
    t = d * 0.55
    return (f'<g>{shadow(x + w / 2 + d / 2, y + h + 2, w * 0.62 + d)}'
            f'<path d="M{x} {y}L{x + d} {y - t}H{x + w + d}L{x + w} {y}Z" fill="{top}"/>'
            f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{front}"/>'
            f'<path d="M{x + w} {y}L{x + w + d} {y - t}V{y + h - t}L{x + w} {y + h}Z" fill="{side}"/>{extra}</g>')

def shadow(cx, cy, rx):
    return f'<ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{rx * 0.13}" fill="{COCOA}" opacity=".16"/>'

def bottle(x, y, w, h, body, cap, label=None, neck=0.3):
    nw = w * neck
    nx = x + (w - nw) / 2
    s = shadow(x + w / 2, y + h + 2, w * 0.7)
    s += f'<rect x="{nx}" y="{y - h * 0.18}" width="{nw}" height="{h * 0.2}" rx="2" fill="{cap}"/>'
    s += f'<path d="M{nx} {y}H{nx + nw}L{x + w} {y + h * 0.22}V{y + h - 6}Q{x + w} {y + h} {x + w - 6} {y + h}H{x + 6}Q{x} {y + h} {x} {y + h - 6}V{y + h * 0.22}Z" fill="{body}"/>'
    s += f'<rect x="{x + w * 0.14}" y="{y + h * 0.1}" width="{w * 0.1}" height="{h * 0.75}" rx="3" fill="{WHITE}" opacity=".28"/>'
    if label:
        s += f'<rect x="{x + w * 0.15}" y="{y + h * 0.45}" width="{w * 0.7}" height="{h * 0.3}" rx="2" fill="{label}"/><rect x="{x + w * 0.25}" y="{y + h * 0.54}" width="{w * 0.5}" height="2.5" rx="1" fill="{GOLD}"/><rect x="{x + w * 0.32}" y="{y + h * 0.62}" width="{w * 0.36}" height="2" rx="1" fill="{MUTED}"/>'
    return s

def can(x, y, w, h, body, band):
    return (shadow(x + w / 2, y + h + 2, w * 0.7) +
            f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="5" fill="{body}"/>'
            f'<ellipse cx="{x + w / 2}" cy="{y + 1}" rx="{w / 2}" ry="5" fill="{LIGHT}"/>'
            f'<rect x="{x}" y="{y + h * 0.35}" width="{w}" height="{h * 0.3}" fill="{band}"/>'
            f'<rect x="{x + w * 0.14}" y="{y + 6}" width="{w * 0.1}" height="{h - 14}" rx="3" fill="{WHITE}" opacity=".25"/>')

def bag(x, y, w, h, body, handle=COCOA2):
    d = w * 0.18
    t = d * 0.55
    hh = h * 0.28
    return (shadow(x + w / 2 + d / 2, y + h + 2, w * 0.7) +
            f'<path d="M{x + w * 0.28} {y} Q{x + w * 0.5} {y - hh} {x + w * 0.72} {y}" stroke="{handle}" stroke-width="2.5" fill="none" stroke-linecap="round"/>'
            f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{body}"/>'
            f'<path d="M{x + w} {y}L{x + w + d} {y + t * 0.4}V{y + h - t * 0.6}L{x + w} {y + h}Z" fill="{COCOA}" opacity=".22"/>'
            f'<circle cx="{x + w * 0.28}" cy="{y + 7}" r="2.2" fill="{CREAM}"/><circle cx="{x + w * 0.72}" cy="{y + 7}" r="2.2" fill="{CREAM}"/>')

def logo(cx, cy, s, color=GOLD):
    return f'<path d="M{cx} {cy - s}L{cx + s * 0.87} {cy - s * 0.5}V{cy + s * 0.5}L{cx} {cy + s}L{cx - s * 0.87} {cy + s * 0.5}V{cy - s * 0.5}Z" fill="none" stroke="{color}" stroke-width="2"/><path d="M{cx - s * 0.87} {cy - s * 0.5}L{cx} {cy}L{cx + s * 0.87} {cy - s * 0.5}M{cx} {cy}V{cy + s}" stroke="{color}" stroke-width="2" fill="none"/>'

def tape(x, y, w, h=8):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{WHITE}" opacity=".78"/>'

def frame(inner, uid):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="48 30 330 270" preserveAspectRatio="xMidYMax slice">
<defs>
<linearGradient id="w{uid}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="{CREAM}"/><stop offset="1" stop-color="{LIGHT}"/></linearGradient>
<linearGradient id="f{uid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="{SOFT}"/><stop offset="1" stop-color="{MED}"/></linearGradient>
<linearGradient id="l{uid}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="{WHITE}" stop-opacity=".55"/><stop offset="1" stop-color="{WHITE}" stop-opacity="0"/></linearGradient>
</defs>
<rect width="400" height="300" fill="url(#w{uid})"/>
<path d="M250 0H330L190 235H110Z" fill="url(#l{uid})"/><path d="M335 0H370L240 235H205Z" fill="url(#l{uid})" opacity=".6"/>
<rect y="232" width="400" height="68" fill="url(#f{uid})"/><rect y="232" width="400" height="2" fill="{WHITE}" opacity=".5"/>
<ellipse cx="60" cy="262" rx="120" ry="14" fill="{WHITE}" opacity=".18"/>
<g transform="translate(215 234) scale(.74) translate(-215 -234)">{inner}</g>
</svg>
'''

def scenes():
    S = {}
    # Food & Beverage: kraft pouch, takeaway box, bottle
    pouch = (shadow(120, 234, 52) + f'<path d="M84 96H156L162 226Q162 234 154 234H86Q78 234 78 226Z" fill="{KRAFT}"/>'
             f'<path d="M84 96H156L157 108H83Z" fill="{KRAFT_D}"/><rect x="84" y="112" width="72" height="2" fill="{COCOA}" opacity=".35"/>'
             f'<rect x="102" y="140" width="36" height="44" rx="6" fill="{CREAM}" opacity=".9"/><path d="M110 170q10-26 20-20-2 18-20 20Z" fill="#7d8f55"/>'
             f'<rect x="96" y="196" width="48" height="3" rx="1.5" fill="{COCOA2}"/><rect x="106" y="205" width="28" height="2.5" rx="1" fill="{COCOA2}" opacity=".6"/>')
    tb = box(190, 190, 84, 44, 26, KRAFT_L, KRAFT_D, KRAFT, f'<rect x="212" y="204" width="40" height="14" rx="3" fill="{CREAM}" opacity=".85"/><rect x="220" y="209" width="24" height="3" rx="1.5" fill="{GOLD}"/>')
    S["food-beverage"] = pouch + tb + bottle(302, 150, 38, 84, "#8a5a3b", COCOA, CREAM) + f'<path d="M345 232q-4-30 14-36 4 22-14 36Z" fill="#7d8f55"/><path d="M345 232q4-20 22-22-2 14-22 22Z" fill="#94a56a"/>'
    # FMCG
    S["fmcg"] = (can(70, 140, 54, 94, GOLD, COCOA) + can(134, 120, 58, 114, COCOA, GOLD) + can(202, 150, 50, 84, KRAFT, CREAM)
                 + box(266, 160, 62, 74, 20, CREAM, LIGHT, WHITE, f'<rect x="276" y="178" width="42" height="26" rx="3" fill="{GOLD}"/><rect x="282" y="212" width="30" height="3" rx="1.5" fill="{COCOA2}"/>'))
    # Cosmetics
    S["cosmetics"] = (box(80, 100, 78, 134, 24, CREAM, LIGHT, WHITE, f'<rect x="92" y="150" width="54" height="3" rx="1.5" fill="{GOLD}"/>{logo(119, 126, 13)}<rect x="100" y="170" width="38" height="3" rx="1.5" fill="{COCOA2}"/>')
                     + bottle(200, 140, 40, 94, "#d9b99a", GOLD, CREAM) + f'<rect x="262" y="196" width="48" height="38" rx="7" fill="{COCOA}"/><rect x="258" y="184" width="56" height="16" rx="5" fill="{GOLD}"/><rect x="326" y="170" width="20" height="64" rx="4" fill="{GOLD}"/><path d="M326 170h20l-4-30q-6-8-12 0Z" fill="#c4654f"/><rect x="326" y="176" width="20" height="4" fill="{COCOA}"/>')
    # Retail & ecommerce: open box with tissue, bag, tape roll
    S["retail-ecommerce"] = (f'<path d="M96 170L76 130H176L184 170Z" fill="{KRAFT_D}"/><path d="M176 170L184 130L226 118L222 160Z" fill="{KRAFT_D}" opacity=".7"/>'
                             + box(96, 170, 130, 64, 36, KRAFT_L, KRAFT_D, KRAFT)
                             + f'<path d="M104 170q30-22 60-6t60-8l-6 14H110Z" fill="{WHITE}" opacity=".9"/><path d="M120 168q20-14 38-4" stroke="{GOLD}" stroke-width="3" fill="none"/>'
                             + bag(270, 140, 56, 94, COCOA) + f'<rect x="282" y="180" width="32" height="3" fill="{GOLD}"/>' + logo(298, 206, 8)
                             + f'<circle cx="352" cy="214" r="18" fill="{WHITE}" opacity=".85"/><circle cx="352" cy="214" r="9" fill="{KRAFT}"/><circle cx="352" cy="214" r="18" fill="none" stroke="{GOLD}" stroke-width="2"/>')
    # Apparel: box with folded shirt + hanger
    S["apparel"] = (box(110, 160, 170, 74, 34, KRAFT_L, KRAFT_D, KRAFT, f'<rect x="130" y="186" width="56" height="3" fill="{COCOA2}" opacity=".5"/>{logo(250, 196, 10, COCOA2)}')
                    + f'<path d="M120 160L170 142L270 142L294 150L250 164Z" fill="{CREAM}"/><path d="M160 152h74" stroke="{LIGHT}" stroke-width="3"/>'
                    + f'<g stroke="{COCOA}" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M310 86a6 6 0 1 0-6-6"/><path d="M310 86v8l40 26q3 5-2 5h-76q-5 0-2-5l40-26"/></g>'
                    + f'<path d="M278 120l38-24 38 24z" fill="{GOLD}" opacity=".35"/>')
    # Consumer products: three bags
    S["consumer-products"] = (bag(82, 120, 72, 114, COCOA) + bag(176, 100, 78, 134, GOLD, COCOA) + bag(276, 132, 64, 102, KRAFT)
                              + logo(118, 178, 12, GOLD) + logo(215, 170, 13, COCOA) + logo(308, 180, 10, COCOA2)
                              + f'<rect x="96" y="200" width="44" height="3" rx="1.5" fill="{GOLD}"/><rect x="196" y="196" width="38" height="3" rx="1.5" fill="{COCOA}"/>')
    # Electronics
    S["electronics"] = (box(90, 120, 130, 114, 30, "#3c3330", "#2c2522", "#524843", f'{logo(155, 168, 16, GOLD)}<rect x="124" y="204" width="62" height="3" rx="1.5" fill="{GOLD}" opacity=".7"/><rect x="134" y="212" width="42" height="2.5" rx="1" fill="{MUTED}"/>')
                      + f'<rect x="262" y="150" width="62" height="84" rx="12" fill="{COCOA}"/><rect x="268" y="158" width="50" height="62" rx="7" fill="{GOLD}" opacity=".85"/><circle cx="293" cy="226" r="3" fill="{CREAM}"/>'
                      + f'<g fill="none" stroke="{COCOA2}" stroke-width="3"><ellipse cx="236" cy="226" rx="20" ry="7"/><ellipse cx="236" cy="222" rx="20" ry="7"/><ellipse cx="236" cy="218" rx="20" ry="7"/></g>'
                      + f'<rect x="334" y="214" width="26" height="18" rx="9" fill="{CREAM}"/>')
    # Healthcare
    S["healthcare"] = (box(80, 130, 110, 104, 28, WHITE, LIGHT, CREAM, f'<rect x="124" y="156" width="22" height="58" rx="3" fill="{GOLD}"/><rect x="106" y="174" width="58" height="22" rx="3" fill="{GOLD}"/><rect x="104" y="218" width="62" height="3" rx="1.5" fill="{MUTED}" opacity=".6"/>')
                       + f'<rect x="232" y="176" width="46" height="58" rx="8" fill="{KRAFT}"/><rect x="228" y="160" width="54" height="22" rx="6" fill="{COCOA}"/><rect x="238" y="192" width="34" height="28" rx="3" fill="{CREAM}"/><rect x="243" y="200" width="24" height="3" fill="{GOLD}"/>'
                       + f'<g transform="translate(300 196)"><rect width="60" height="38" rx="6" fill="{WHITE}" stroke="{SOFT}" stroke-width="2"/>'
                       + "".join(f'<circle cx="{14 + c * 16}" cy="{12 + r * 14}" r="5" fill="{GOLD}" opacity="{0.9 - r * 0.2}"/>' for c in range(3) for r in range(2)) + '</g>')
    # Industrial: crate on pallet with straps
    S["industrial-products"] = (f'<g>{shadow(200, 236, 150)}<rect x="70" y="214" width="250" height="14" fill="#9a7a49"/><rect x="70" y="228" width="40" height="8" fill="#85673a"/><rect x="180" y="228" width="40" height="8" fill="#85673a"/><rect x="280" y="228" width="40" height="8" fill="#85673a"/></g>'
                                + box(90, 120, 150, 94, 52, KRAFT_L, KRAFT_D, KRAFT, f'<rect x="150" y="120" width="10" height="94" fill="{COCOA}" opacity=".75"/><rect x="190" y="120" width="10" height="94" fill="{COCOA}" opacity=".75"/><rect x="104" y="150" width="30" height="30" fill="{CREAM}" opacity=".85"/><path d="M110 158h18M110 166h14" stroke="{COCOA2}" stroke-width="2"/>')
                                + f'<path d="M96 120L148 94" stroke="{COCOA}" stroke-width="0"/>' + box(262, 150, 56, 64, 20, KRAFT_L, KRAFT_D, KRAFT, tape(278, 150, 10, 64).replace('opacity=".78"', 'opacity=".6"')))
    # Export businesses: stacked cartons + globe
    S["export-businesses"] = (box(70, 180, 88, 54, 24, KRAFT_L, KRAFT_D, KRAFT, tape(104, 180, 14, 54)) + box(160, 180, 88, 54, 24, KRAFT_L, KRAFT_D, KRAFT, tape(194, 180, 14, 54))
                              + box(112, 126, 88, 54, 24, KRAFT_L, KRAFT_D, KRAFT, tape(146, 126, 14, 54) + f'<rect x="124" y="148" width="26" height="22" fill="{CREAM}" opacity=".9"/><path d="M128 154h18M128 160h12" stroke="{COCOA2}" stroke-width="2"/>')
                              + f'<g transform="translate(318 110)"><circle r="42" fill="{CREAM}" stroke="{GOLD}" stroke-width="3"/><g fill="none" stroke="{GOLD}" stroke-width="2"><ellipse rx="42" ry="16"/><ellipse rx="16" ry="42"/><path d="M-42 0H42"/></g><path d="M-30-18q10-8 18 0t4 14-14 4Z" fill="{MED}"/><path d="M8 4q12-4 18 8t-10 14-8-12Z" fill="{MED}"/></g>'
                              + f'<path d="M262 190q30-30 54-34" stroke="{COCOA2}" stroke-width="2.5" fill="none" stroke-dasharray="5 6" stroke-linecap="round"/><path d="M312 150l8 5-9 3Z" fill="{COCOA2}"/>')
    # Premium: rigid black box with gold ribbon
    S["premium-brands"] = (box(90, 150, 190, 84, 42, "#3b2e29", "#2a1f1b", "#4a3a34", f'<rect x="90" y="150" width="190" height="6" fill="{GOLD}"/>{logo(185, 192, 18, GOLD)}<rect x="144" y="218" width="82" height="2.5" rx="1" fill="{GOLD}" opacity=".7"/>')
                           + f'<path d="M90 150L132 129H322L280 150Z" fill="#4a3a34"/><path d="M215 129L173 150" stroke="{GOLD}" stroke-width="0"/>'
                           + f'<g fill="{GOLD}"><path d="M200 134l-34-16q-10 6 4 14l28 4Z"/><path d="M200 134l34-16q10 6-4 14l-28 4Z"/><circle cx="200" cy="136" r="6" fill="#d3b981"/></g>'
                           + f'<rect x="306" y="196" width="46" height="38" rx="4" fill="{CREAM}"/><path d="M306 206h46" stroke="{GOLD}" stroke-width="3"/>')
    # D2C: mailer box with label, sticker, tape
    S["d2c-startups"] = (box(86, 150, 180, 84, 38, KRAFT_L, KRAFT_D, KRAFT, f'{logo(176, 190, 16, COCOA)}<rect x="126" y="214" width="100" height="3" rx="1.5" fill="{COCOA2}" opacity=".7"/>')
                         + f'<path d="M86 150L124 131H304L266 150Z" fill="{KRAFT}"/><path d="M118 150L156 131" stroke="{KRAFT_D}"/>'
                         + f'<g transform="translate(290 168)"><rect width="70" height="52" rx="4" fill="{WHITE}"/><rect x="8" y="8" width="28" height="4" fill="{COCOA2}"/><rect x="8" y="17" width="40" height="3" fill="{MUTED}"/><rect x="8" y="24" width="34" height="3" fill="{MUTED}"/><g fill="{COCOA}">' + "".join(f'<rect x="{8 + i * 5}" y="34" width="{2 + (i % 3)}" height="12"/>' for i in range(11)) + '</g></g>'
                         + f'<circle cx="332" cy="140" r="16" fill="{GOLD}"/><path d="M332 149c-9-6-10-12-6-15 3-2 5 0 6 2 1-2 3-4 6-2 4 3 3 9-6 15Z" fill="{CREAM}"/>')
    return S

for i, (name, inner) in enumerate(scenes().items()):
    with open(os.path.join(OUT, f"{name}.svg"), "w") as f:
        f.write(frame(inner, i))
print("wrote", i + 1, "illustrations")
