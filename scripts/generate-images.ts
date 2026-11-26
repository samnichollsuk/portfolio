/**
 * Renders the social share image and the Apple touch icon into public/.
 * Run with `bun run images` after changing the name, title or brand colours.
 */
import sharp from "sharp";
import { profile } from "../src/data/profile";

// Light-mode tokens from src/styles/global.css.
const colors = {
	bg: "#fbfaf7",
	fg: "#16181d",
	muted: "#4d5261",
	border: "#e1ded5",
	accent: "#2346d1",
	accent2: "#86198f",
};
const sans = "'Helvetica Neue', Helvetica, Arial, sans-serif";
const mono = "Menlo, 'SF Mono', Consolas, monospace";

const brandGradient = (id: string, x1: number, y1: number, x2: number, y2: number) => `
	<linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">
		<stop offset="0" stop-color="${colors.accent}" />
		<stop offset="1" stop-color="${colors.accent2}" />
	</linearGradient>`;

const escapeXml = (text: string) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const ogImage = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
	<defs>
		${brandGradient("brand", 0, 0, 64, 64)}
		${brandGradient("text", 80, 0, 1000, 0)}
		${brandGradient("rule", 80, 0, 120, 0)}
		<radialGradient id="glow1">
			<stop offset="0" stop-color="${colors.accent}" stop-opacity="0.12" />
			<stop offset="1" stop-color="${colors.accent}" stop-opacity="0" />
		</radialGradient>
		<radialGradient id="glow2">
			<stop offset="0" stop-color="${colors.accent2}" stop-opacity="0.09" />
			<stop offset="1" stop-color="${colors.accent2}" stop-opacity="0" />
		</radialGradient>
	</defs>
	<rect width="1200" height="630" fill="${colors.bg}" />
	<circle cx="840" cy="160" r="420" fill="url(#glow1)" />
	<circle cx="1000" cy="300" r="400" fill="url(#glow2)" />

	<g transform="translate(80 72)">
		<rect width="64" height="64" rx="14" fill="url(#brand)" />
		<text x="32" y="41" text-anchor="middle" font-family="${sans}" font-size="24" font-weight="700" fill="#fff">${escapeXml(profile.initials)}</text>
	</g>

	<rect x="80" y="252" width="40" height="3" rx="1.5" fill="url(#rule)" />
	<text x="136" y="260" font-family="${mono}" font-size="22" letter-spacing="1.5" fill="${colors.accent}">${escapeXml(profile.title.toUpperCase())}</text>
	<text x="76" y="352" font-family="${sans}" font-size="88" font-weight="700" letter-spacing="-2" fill="${colors.fg}">${escapeXml(profile.name)}</text>
	<text x="80" y="420" font-family="${sans}" font-size="40" font-weight="600" letter-spacing="-0.5" fill="url(#text)">Fast for everyone, usable by everyone.</text>

	<line x1="80" y1="526" x2="1120" y2="526" stroke="${colors.border}" stroke-width="2" />
	<text x="80" y="572" font-family="${sans}" font-size="24" fill="${colors.muted}">samnicholls.co.uk</text>
</svg>`;

// iOS adds its own rounded corners, so the touch icon is a full square.
const touchIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180">
	<defs>${brandGradient("brand", 0, 0, 180, 180)}</defs>
	<rect width="180" height="180" fill="url(#brand)" />
	<text x="90" y="114" text-anchor="middle" font-family="${sans}" font-size="72" font-weight="700" fill="#fff">${escapeXml(profile.initials)}</text>
</svg>`;

await sharp(Buffer.from(ogImage)).png().toFile("public/og-image.png");
await sharp(Buffer.from(touchIcon)).png().toFile("public/apple-touch-icon.png");
console.log("Wrote public/og-image.png and public/apple-touch-icon.png");
