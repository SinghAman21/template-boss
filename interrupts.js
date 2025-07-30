import { existsSync } from 'fs';
import { join } from 'path';

// Handle keyboard interrupts (Ctrl+C, Ctrl+D, SIGTERM)
export const setupKeyboardInterrupt = () => {
  const signals = ['SIGINT', 'SIGQUIT', 'SIGTERM'];
  const messages = {
    SIGINT: 'Operation cancelled by user.',
    SIGQUIT: 'Operation terminated by user.',
    SIGTERM: 'Process termination requested.'
  };
  
  signals.forEach(signal => {
    process.on(signal, () => {
      console.log(`\n${messages[signal]}`);
      process.exit(0);
    });
  });
};

// Check if directory exists
export const checkDirectoryExists = (projectName) => {
  if (projectName === '.') return;
  
  try {
    const targetPath = join(process.cwd(), projectName);
    
    if (existsSync(targetPath)) {
      console.error(`\n❌ Error: Directory '${projectName}' already exists.`);
      console.log('💡 Please choose a different project name or delete the existing directory.');
      process.exit(1);
    }
  } catch (error) {
    console.error('\n❌ Error checking directory:', error.message);
    process.exit(1);
  }
};

// Handle process errors
export const setupErrorHandlers = () => {
  process.on('uncaughtException', (error) => {
    console.error('\n❌ Unexpected error:', error.message);
    process.exit(1);
  });

  process.on('unhandledRejection', (reason) => {
    console.error('\n❌ Unhandled Promise Rejection:', reason);
    process.exit(1);
  });

  process.on('warning', (warning) => {
    console.warn('\n⚠️  Warning:', warning.name, warning.message);
  });
};
 