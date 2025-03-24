import process from 'process';

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
    if (projectName === '.') return false;
    
    const fs = require('fs');
    const path = require('path');
    const targetPath = path.join(process.cwd(), projectName);
    
    if (fs.existsSync(targetPath)) {
      console.error(`\nError: Directory '${projectName}' already exists.`);
      console.log('Please choose a different project name or delete the existing directory.');
      process.exit(1);
    }
    return false;
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
    if (error.stack) {
      console.error('\nStack trace:', error.stack);
    }
    process.exit(1);
  });

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (reason, promise) => {
    console.error('\nUnhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
  });

  // Handle memory warnings
  process.on('warning', (warning) => {
    console.warn('\nWarning:', warning.name, warning.message);
    if (warning.stack) {
      console.warn('\nStack trace:', warning.stack);
    }
  });

  // Handle multipleResolves event
  process.on('multipleResolves', (type, promise, value) => {
    console.error('\nMultiple resolves detected:', {
      type,
      promise,
      value
    });
  });

  // Handle worker thread errors
  if (process.env.NODE_OPTIONS?.includes('--experimental-worker-threads')) {
    process.on('worker', (worker) => {
      worker.on('error', (error) => {
        console.error('\nWorker thread error:', error.message);
        if (error.stack) {
          console.error('\nStack trace:', error.stack);
        }
      });
    });
  }
};

// Handle cleanup operations
export const setupCleanupHandlers = () => {
  const cleanup = () => {
    // Add any cleanup operations here
    // For example: closing file handles, database connections, etc.
    console.log('\nCleaning up...');
  };

  // Register cleanup handlers for various exit scenarios
  process.on('exit', cleanup);
  process.on('SIGINT', cleanup);
  process.on('SIGTERM', cleanup);
  process.on('SIGQUIT', cleanup);
}; 