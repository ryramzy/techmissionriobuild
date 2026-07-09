const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

const publicDir = path.join(__dirname, '../public')
const iconsDir = path.join(__dirname, '../public/icons')

// Make sure output directories exist
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true })
}

// Vector representation of the exact header TMR navigation logo
const svgContent = `
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="tmr-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#22C55E" />
      <stop offset="50%" stop-color="#3B82F6" />
      <stop offset="100%" stop-color="#FB923C" />
    </linearGradient>
  </defs>

  <!-- Outer rounded rectangle with gradient border -->
  <rect x="16" y="16" width="480" height="480" rx="96" fill="url(#tmr-gradient)" />

  <!-- Inner rounded rectangle simulating padding/p-1 -->
  <rect x="48" y="48" width="416" height="416" rx="80" fill="#0B1F3A" />

  <!-- TMR bold text centered -->
  <text 
    x="50%" 
    y="56%" 
    dominant-baseline="middle" 
    text-anchor="middle" 
    fill="#FFFFFF" 
    font-family="system-ui, -apple-system, sans-serif" 
    font-weight="900" 
    font-size="150"
    letter-spacing="-2"
  >TMR</text>
</svg>
`;

const targets = [
  { file: path.join(publicDir, 'favicon.png'), size: 32 },
  { file: path.join(publicDir, 'icon.png'), size: 512 },
  { file: path.join(iconsDir, 'icon-192.png'), size: 192 },
  { file: path.join(iconsDir, 'icon-256.png'), size: 256 },
  { file: path.join(iconsDir, 'icon-384.png'), size: 384 },
  { file: path.join(iconsDir, 'icon-512.png'), size: 512 }
]

async function generate() {
  console.log('Generating vector-exact PWA icons from SVG content...')
  const svgBuffer = Buffer.from(svgContent)
  
  for (const target of targets) {
    try {
      await sharp(svgBuffer)
        .resize(target.size, target.size)
        .png()
        .toFile(target.file)
      console.log(`✓ Generated ${path.basename(target.file)} (${target.size}x${target.size})`)
    } catch (err) {
      console.error(`✗ Error generating ${path.basename(target.file)}:`, err)
    }
  }

  // Generate a fallback favicon.ico by copying the 32x32 PNG
  try {
    const faviconPng = path.join(publicDir, 'favicon.png')
    const faviconIco = path.join(publicDir, 'favicon.ico')
    fs.copyFileSync(faviconPng, faviconIco)
    console.log('✓ Created favicon.ico fallback from favicon.png')
  } catch (err) {
    console.error('✗ Failed to copy favicon.ico fallback:', err)
  }
}

generate()
