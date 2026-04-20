import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGES_DIR = path.join(__dirname, 'public/images');
const OUTPUT_FILE = path.join(__dirname, 'src/data/galleryData.js');

// Allowed image extensions
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

// Read all files from the images directory
const files = fs.readdirSync(IMAGES_DIR);

// Filter only image files
const imageFiles = files.filter(file => {
  const ext = path.extname(file).toLowerCase();
  return IMAGE_EXTENSIONS.includes(ext);
}).sort();

console.log(`📸 Found ${imageFiles.length} images in ${IMAGES_DIR}`);

// Generate gallery data
const galleryData = imageFiles.map((filename, index) => {
  const id = index + 1;
  const row = (index % 3) + 1;
  const sizes = ['sm', 'md', 'lg'];
  const size = sizes[index % sizes.length];

  return {
    id,
    src: `/images/${filename}`,
    caption: '',
    row,
    size,
  };
});

// Generate the JavaScript file content
const fileContent = `/**
 * galleryData.js
 *
 * ⚠️ AUTO-GENERATED FILE - DO NOT EDIT MANUALLY
 * 
 * To regenerate this file, run:
 *   node generate-gallery-data.js
 * 
 * This script discovers images from public/images/ and creates the mapping.
 */

// 🔢 TOTAL images count
const TOTAL_IMAGES = ${imageFiles.length};

// 📦 MAIN DATA
export const galleryData = ${JSON.stringify(galleryData, null, 2)};

// 📐 SIZE MAP (used in UI)
export const sizeMap = {
  sm: { w: 160, h: 200 },
  md: { w: 220, h: 260 },
  lg: { w: 300, h: 320 },
};
`;

// Write the file
fs.writeFileSync(OUTPUT_FILE, fileContent);

console.log(`✅ Generated ${OUTPUT_FILE}`);
console.log(`📊 Total images: ${imageFiles.length}`);
console.log(`📋 Image list:`);
imageFiles.slice(0, 10).forEach((file, i) => {
  console.log(`   ${i + 1}. ${file}`);
});
if (imageFiles.length > 10) {
  console.log(`   ... and ${imageFiles.length - 10} more`);
}
