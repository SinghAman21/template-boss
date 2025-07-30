import ora from 'ora';

const showProgress = async (projectName, templatePath) => {
  const spinner = ora('Initializing project...').start();
  
  const steps = [
    { text: 'Creating project directory...', delay: 800 },
    { text: 'Copying template files...', delay: 1000 },
    { text: 'Setting up project structure...', delay: 800 },
    { text: 'Installing dependencies...', delay: 1200 },
    { text: 'Finalizing setup...', delay: 800 }
  ];
  
  for (const step of steps) {
    spinner.text = step.text;
    await new Promise(resolve => setTimeout(resolve, step.delay));
  }
  
  spinner.succeed(`✅ Project "${projectName}" created successfully!

📋 Next Steps:
   npm install  |  bun install  |  pnpm install
   npm run dev  |  bun run dev  |  pnpm run dev

💡 Check the project README for setup details and configuration.`);
};

export default showProgress; 