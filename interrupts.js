import process from 'process';
import fs from 'fs';
import path from 'path';

// Handle keyboard interrupts (Ctrl+C)
export const setupKeyboardInterrupt = () => {
  process.on('SIGINT', () => {
    console.log('\nOperation cancelled by user.');
    process.exit(0);
  });

  // Handle Ctrl+D (EOF)
  process.on('SIGQUIT', () => {
    console.log('\nOperation terminated by user.');
    process.exit(0);
  });

  // Handle process termination request
  process.on('SIGTERM', () => {
    console.log('\nProcess termination requested.');
    process.exit(0);
  });
};

// Check if directory exists
export const checkDirectoryExists = (projectName) => {
  try {
    if (projectName === '.') return;
    
    const targetPath = path.join(process.cwd(), projectName);
    
    if (fs.existsSync(targetPath)) {
      console.error(`\nError: Directory '${projectName}' already exists.`);
      console.log('Please choose a different project name or delete the existing directory.');
      process.exit(1);
    }
  } catch (error) {
    console.error('\nError checking directory:', error.message);
    process.exit(1);
  }
};

// Handle process errors
export const setupErrorHandlers = () => {
  // Handle uncaught exceptions
  process.on('uncaughtException', (error) => {
    console.error('\nAn unexpected error occurred:', error.message);
    process.exit(1);
  });

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (reason, promise) => {
    console.error('\nUnhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
  });

  // Handle warnings
  process.on('warning', (warning) => {
    console.warn('\nWarning:', warning.name, warning.message);
  });
};

// Handle cleanup operations
 