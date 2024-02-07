const fs = require('fs');
const path = require('path');

// Define the directories and file paths
const iconsDir = path.join(__dirname, 'src/assets/icons');
const iconMappingPath = path.join(__dirname, 'src/components/IconMapping.tsx');
const iconNamesPath = path.join(__dirname, 'src/components/IconNames.tsx');

// Read SVG files from the icons directory
const svgFiles = fs.readdirSync(iconsDir).filter((file) => file.endsWith('.svg'));

// Generate content for IconNames.tsx
const iconNamesContent = svgFiles.map((file) => `'${path.basename(file, '.svg')}'`).join(' | ');
const iconNamesFileContent = `// IconNames.ts\nexport type IconName = ${iconNamesContent};\n`;

// Generate content for IconMapping.tsx
const iconMappingContent = svgFiles
    .map((file) => {
        const iconName = path.basename(file, '.svg');
        return `  '${iconName}': require('../assets/icons/${file}').default,`;
    })
    .join('\n');

const iconMappingFileContent = `// IconMapping.tsx\nimport { IconName } from './IconNames';\n\nconst IconMapping: Record<IconName, React.FC<React.SVGProps<SVGSVGElement>>> = {\n${iconMappingContent}\n};\n\nexport default IconMapping;\n`;

// Write the generated content to IconNames.tsx and IconMapping.tsx
fs.writeFileSync(iconNamesPath, iconNamesFileContent);
fs.writeFileSync(iconMappingPath, iconMappingFileContent);

console.log('IconNames.ts and IconMapping.tsx have been generated.');
