const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

const svgPath = path.join(__dirname, '../public/favicon.svg')
const publicDir = path.join(__dirname, '../public')
const iconsDir = path.join(__dirname, '../public/icons')

// Make sure output directories exist
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true })
}

const targets = [
  { file: path.join(publicDir, 'favicon.png'), size: 32 },
  { file: path.join(iconsDir, 'icon-192.png'), size: 192 },
  { file: path.join(iconsDir, 'icon-256.png'), size: 256 },
  { file: path.join(iconsDir, 'icon-384.png'), size: 384 },
  { file: path.join(iconsDir, 'icon-512.png'), size: 512 }
]

async function generate() {
  console.log('Generating PWA icons from favicon.svg...')
  for (const target of targets) {
    try {
      await sharp(svgPath)
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
