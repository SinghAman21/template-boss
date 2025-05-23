#!/usr/bin/env node

import inquirer from 'inquirer';
import * as fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import displayDirectory from './displayDirectory.js';
import showProgress from './progress.js';
import { setupKeyboardInterrupt, checkDirectoryExists, setupErrorHandlers } from './interrupts.js';
import { checkForUpdates } from './versionCheck.js';

const CURR_DIR = process.cwd();
const __dirname = dirname(fileURLToPath(import.meta.url));

// Setup interrupt handlers
setupKeyboardInterrupt();
setupErrorHandlers();

// Check for updates
checkForUpdates();

const CHOICES = fs.readdirSync(`${__dirname}/templates`);

const QUESTIONS = [
  {
    name: 'project-choice',
    type: 'list',
    message: 'What project template would you like to generate?',
    choices: CHOICES,
  },
  {
    name: 'project-name',
    type: 'input',
    message: 'Project name:',
    validate: function (input) {
      if (input === '.') return true;
      if (/^([A-Za-z\-\\_\d])+$/.test(input)) return true;
      else return 'Project name may only include letters, numbers, underscores and hashes.';
    },
  },
];

inquirer.prompt(QUESTIONS).then(async answers => {
  const projectChoice = answers['project-choice'];
  const projectName = answers['project-name'];
  const templatePath = `${__dirname}/templates/${projectChoice}`;

  // Check if directory exists before proceeding
  checkDirectoryExists(projectName);

  if (projectName === '.') {
    await showProgress(projectName, templatePath);
    displayDirectory(templatePath, '.');
  } else {
    await showProgress(projectName, templatePath);
    fs.mkdirSync(`${CURR_DIR}/${projectName}`);
    displayDirectory(templatePath, projectName);
  }
});