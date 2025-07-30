#!/usr/bin/env node

import inquirer from 'inquirer';
import { readdirSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import displayDirectory from './displayDirectory.js';
import showProgress from './progress.js';
import { setupKeyboardInterrupt, checkDirectoryExists, setupErrorHandlers } from './interrupts.js';
import { checkForUpdates } from './versionCheck.js';

const CURR_DIR = process.cwd();
const __dirname = dirname(fileURLToPath(import.meta.url));

// Setup handlers
setupKeyboardInterrupt();
setupErrorHandlers();
checkForUpdates();

const CHOICES = readdirSync(join(__dirname, 'templates'));

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
    validate: (input) => {
      if (input === '.') return true;
      return /^[A-Za-z\-_\d]+$/.test(input) || 'Project name may only include letters, numbers, underscores and hyphens.';
    },
  },
];

inquirer.prompt(QUESTIONS).then(async ({ 'project-choice': projectChoice, 'project-name': projectName }) => {
  const templatePath = join(__dirname, 'templates', projectChoice);
  
  checkDirectoryExists(projectName);
  
  await showProgress(projectName, templatePath);
  
  if (projectName !== '.') {
    mkdirSync(join(CURR_DIR, projectName));
  }
  
  displayDirectory(templatePath, projectName);
}).catch(error => {
  console.error('Error:', error.message);
  process.exit(1);
});