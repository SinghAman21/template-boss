import * as fs from 'fs';
const CURR_DIR = process.cwd();

const displayDirectory = (templatePath, newProjectPath) => {
  const filesToCreate = fs.readdirSync(templatePath);

  filesToCreate.forEach(file => {
    const origFilePath = `${templatePath}/${file}`;

    // get stats about the current file
    const stats = fs.statSync(origFilePath);

    if (stats.isFile()) {
      const contents = fs.readFileSync(origFilePath, 'utf8');

      // Rename
      if (file === '.npmignore') file = '.gitignore';

      const writePath = newProjectPath === '.' 
        ? `${CURR_DIR}/${file}`
        : `${CURR_DIR}/${newProjectPath}/${file}`;
      fs.writeFileSync(writePath, contents, 'utf8');
    } else if (stats.isDirectory()) {
      const dirPath = newProjectPath === '.'
        ? `${CURR_DIR}/${file}`
        : `${CURR_DIR}/${newProjectPath}/${file}`;
      fs.mkdirSync(dirPath);

      // recursive call
      displayDirectory(`${templatePath}/${file}`, newProjectPath === '.' ? file : `${newProjectPath}/${file}`);
    }
  });
};

export default displayDirectory;
