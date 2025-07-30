# template-boss

## Overview
`template-boss` is a global CLI tool for quickly scaffolding various project templates, including React, Next.js, GraphQL, AWS, and Node.js.

## Installation
To install the package globally, run:

```
npm i template-boss -g
```


## Available Templates
React:
- react-js-tailwind-v3
- react-js-tailwind-v4
- react-ts-tailwind-v3
- react-ts-tailwind-v4

AWS:
- aws-ts-serverless

GraphQL:
- gql-ts-prisma-codegen-apolloserver
- gql-ts-serverless

Next.js:
- nextjs-ts-frontend
- nextjs-ts-materialUI
- nextjs-ts-materialui-reacthookform
- nextjs-ts-reactquery
- nextjs-ts-reactquery-graphqlrequest

Node.js:
- node-ts-backend

## Usage
After installation, open your terminal go to the directory where you want to create the project and run:

```
template-boss
```

Follow the prompts to select a template and create your project.

---
## Contribute

Please follow the steps below to ensure a smooth contribution process:

## Development Guide

### 🛠️ Local Development Setup

#### Method 1: Using npm link (Recommended)
```bash
# Create a global symbolic link
npm link

# Test your changes
template-boss

# Unlink when done
npm unlink
```

#### Method 2: Manual Installation
```bash
# Install globally
npm install template-boss -g

# Test directly from source
node index.js

# Uninstall when done
npm uninstall template-boss -g
```

### 📁 Package Locations
- **With npm link:** Your current project directory
- **With global install:** `C:\Users\[YourUsername]\AppData\Roaming\npm\node_modules\template-boss`
- **With local install:** `./node_modules/template-boss`

### 📦 How to publish a npm Registry

#### 1. **Login to npm**
```bash
npm login
```

#### 2. **Check Package Availability**
```bash
npm search <your-package-name>
```

#### 3. **Update Version Number**
```bash
# For patch version (1.3.3 → 1.3.4)
npm version patch

# For minor version (1.3.3 → 1.4.0)
npm version minor

# For major version (1.3.3 → 2.0.0)
npm version major

# Or update manually in package.json
```

#### 4. **Publish Package**
```bash
npm publish
```

#### 5. **Verify Publication**
```bash
npm view <your-package-name> version # to check the version of the package
```

### Steps to Contribute:

1. **Create an Issue**  
   - Before starting any work, check the repository for existing issues.  
   - If your idea or bug fix is not listed, create a new issue to discuss it.

2. **Fork the Repository**  
   - Click on the "Fork" button at the top right of the repository page to create your own copy of the repository.

3. **Create a New Branch**  
   - Clone your forked repository to your local machine:  
     ```
     git clone https://github.com/<your-username>--<repo-name>.git
     cd <repo-name>
     ```
   - Create a new branch using the format `<username>--issue-<issue-no>`:  
     ```
     git checkout -b <username>--issue-<issue-no>
     ```
     Example:  
     ```
     git checkout -b SinghAman21--issue-01
     ```

4. **Make Your Changes**  
   - Implement the changes you want to contribute in this branch.

5. **Create a Pull Request (PR)**  
   - Push your changes to your forked repository:  
     ```
     git push origin <username>/issue-<issue-no> -u
     ```
   - Go to the original repository and click on "New Pull Request."
   - Select your branch and provide a **brief description** of the changes you have made.



### Happy Contributing! 🎉  
We appreciate your efforts and look forward to reviewing your pull request. If you have any questions, feel free to ask in the issue comments.

Kick start your development journey with `template-boss` today!
