import boxen from 'boxen';
import semver from 'semver';
import { execSync } from 'child_process';
import chalk from 'chalk';

const CURRENT_VERSION = process.env.npm_package_version;

export const checkForUpdates = async () => {
  try {
    const latestVersion = execSync('npm view template-boss version').toString().trim();
    
    if (semver.lt(CURRENT_VERSION, latestVersion)) {
      const message = boxen(
        `${chalk.yellow('🔄 Update available!')}\n\n` +
        `${chalk.white(`Current: ${CURRENT_VERSION}`)}\n` +
        `${chalk.green(`Latest: ${latestVersion}`)}\n\n` +
        `${chalk.blue('Update with:')}\n` +
        `${chalk.cyan('npm install -g template-boss@latest')}`,
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
  } catch {
    // Silently fail - prevents breaking if no internet or npm registry issues
  }
}; 