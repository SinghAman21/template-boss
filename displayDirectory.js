import { readdirSync, statSync, readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const CURR_DIR = process.cwd();

const displayDirectory = (templatePath, newProjectPath) => {
  const filesToCreate = readdirSync(templatePath);

  filesToCreate.forEach(file => {
    const origFilePath = join(templatePath, file);
    const stats = statSync(origFilePath);
    
    // Handle .npmignore → .gitignore conversion
    const targetFile = file === '.npmignore' ? '.gitignore' : file;
    
    // Determine target path
    const targetPath = newProjectPath === '.' 
      ? join(CURR_DIR, targetFile)
      : join(CURR_DIR, newProjectPath, targetFile);

    if (stats.isFile()) {
      const contents = readFileSync(origFilePath, 'utf8');
      writeFileSync(targetPath, contents, 'utf8');
    } else if (stats.isDirectory()) {
      mkdirSync(targetPath, { recursive: true });
      
      // Recursive call with updated paths
      const nextProjectPath = newProjectPath === '.' ? targetFile : join(newProjectPath, targetFile);
      displayDirectory(origFilePath, nextProjectPath);
    }
  });
};

export default displayDirectory;
