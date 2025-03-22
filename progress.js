import ora from 'ora';

const showProgress = async (projectName, templatePath) => {
  const spinner = ora('Initializing project...').start();
  
  spinner.text = 'Creating project directory...';
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  spinner.text = 'Copying template files...';
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  spinner.text = 'Setting up project structure...';
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  spinner.text = 'Installing dependencies...';
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  spinner.text = 'Finalizing setup...';
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  spinner.succeed(`✅ Project has been successfully created!

    Next Steps:
    1. Install dependencies:
       ▶ npm install  |  bun install  |  pnpm install
    
    2. Start the development server:
       ▶ npm run dev  |  bun run dev  |  pnpm run dev
    
    📌 Additional Notes:
    - Refer to the project README for setup and configuration details.
    - Ensure all environment variables are correctly set before running the project.
    - Need help? Check the documentation 
    
    Style with Ease!
    `);
    
};

export default showProgress; 