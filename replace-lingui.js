const fs = require('fs');
const path = require('path');

// Get directories to process
function processDir(baseDir, relativePath) {
  const dirPath = path.join(baseDir, relativePath);
  console.log(`Processing directory: ${dirPath}`);
  
  try {
    const files = fs.readdirSync(dirPath);
    
    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const stats = fs.statSync(filePath);
      
      if (stats.isDirectory()) {
        // Skip node_modules and other unnecessary directories
        if (['node_modules', 'dist', '.git'].includes(file)) continue;
        
        // Recursively process subdirectories
        processDir(baseDir, path.join(relativePath, file));
      } else if (stats.isFile() && (file.endsWith('.ts') || file.endsWith('.tsx'))) {
        replaceLinguiImports(filePath);
      }
    }
  } catch (error) {
    console.error(`Error processing directory ${dirPath}:`, error.message);
  }
}

// Function to replace lingui imports in a file
function replaceLinguiImports(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Replace imports from @lingui/macro
    if (content.includes('@lingui/macro')) {
      let newContent = content
        .replace(/import\s+{([^}]*)}\s+from\s+['"]@lingui\/macro['"]/g, 
                "import {$1} from '@/client/libs/i18n'")
        .replace(/import\s+(\w+)\s+from\s+['"]@lingui\/macro['"]/g, 
                "import $1 from '@/client/libs/i18n'");
      
      if (newContent !== content) {
        content = newContent;
        modified = true;
        console.log(`Updated @lingui/macro imports in: ${filePath}`);
      }
    }

    // Replace imports from @lingui/react
    if (content.includes('@lingui/react')) {
      let newContent = content
        .replace(/import\s+{([^}]*)}\s+from\s+['"]@lingui\/react['"]/g, 
                "// Removed @lingui/react import: $1");
      
      if (newContent !== content) {
        content = newContent;
        modified = true;
        console.log(`Updated @lingui/react imports in: ${filePath}`);
      }
    }

    // Replace imports from @lingui/core
    if (content.includes('@lingui/core')) {
      let newContent = content
        .replace(/import\s+{([^}]*)}\s+from\s+['"]@lingui\/core['"]/g, 
                "// Removed @lingui/core import: $1");
      
      if (newContent !== content) {
        content = newContent;
        modified = true;
        console.log(`Updated @lingui/core imports in: ${filePath}`);
      }
    }

    // Replace imports from @lingui/detect-locale
    if (content.includes('@lingui/detect-locale')) {
      let newContent = content
        .replace(/import\s+{([^}]*)}\s+from\s+['"]@lingui\/detect-locale['"]/g, 
                "// Removed @lingui/detect-locale import: $1");
      
      if (newContent !== content) {
        content = newContent;
        modified = true;
        console.log(`Updated @lingui/detect-locale imports in: ${filePath}`);
      }
    }

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
    }
    
    return modified;
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error.message);
    return false;
  }
}

// Main function - process only the client app
function main() {
  const baseDir = __dirname;
  const clientDir = 'apps/client';
  processDir(baseDir, clientDir);
  console.log('Finished processing files');
}

main(); 