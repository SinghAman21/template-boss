import boxen from 'boxen';
import semver from 'semver';
import { execSync } from 'child_process';
import chalk from 'chalk';

const CURRENT_VERSION = process.env.npm_package_version;

export const checkForUpdates = async () => {
  try {
    // Get the latest version from npm registry
    const latestVersion = execSync('npm view template-boss version').toString().trim();
    
    if (semver.lt(CURRENT_VERSION, latestVersion)) {
      const message = boxen(
        chalk.yellow('Update available!') + '\n\n' +
        chalk.white(`Current version: ${CURRENT_VERSION}`) + '\n' +
        chalk.green(`Latest version: ${latestVersion}`) + '\n\n' +
        chalk.blue('To update, run:') + '\n' +
        chalk.cyan('npm install -g template-boss@latest'),
        {
          padding: 1,
          margin: 1,
          borderStyle: 'round',
          borderColor: 'yellow',
          backgroundColor: '#555555'
        }
      );
      
      console.log(message);
    }
  } catch (error) {
    // Silently fail if we can't check for updates
    // This prevents the app from breaking if there's no internet connection
    // or if npm registry is not accessible
  }
}; 