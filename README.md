# NPM Package Source Code Database

This project contains a database of source code for various NPM packages. The source code of each package is stored in separate folders named after the package and its version.

## Table of Contents

- [Overview](#overview)
- [Structure](#structure)
- [Contributing](#contributing)
- [License](#license)

## Overview

This project aims to provide a central resource for storing and sharing the source code of various NPM packages. Each package has its own folder in the database, containing the source code of all available versions.

## Structure

The database is structured according to the following convention:

```
npm_packages/
│
├── owner1/
│ │
│ ├── package1/
│ │ │
│ │ ├── version1/
│ │ │ ├── source files...
│ │ │
│ │ ├── version2/
│ │ │ ├── source files...
│ │ │
│ │ └── ...
│ │
│ ├── package2/
│ │ │
│ │ ├── version1/
│ │ │ ├── source files...
│ │ │
│ │ ├── version2/
│ │ │ ├── source files...
│ │ │
│ │ └── ...
│
├── owner2/
│ │
│ ├── package3/
│ │ │
│ │ ├── version1/
│ │ │ ├── source files...
│ │ │
│ │ ├── version2/
│ │ │ ├── source files...
│ │ │
│ │ └── ...
│ │
│ ├── package4/
│ │ │
│ │ ├── version1/
│ │ │ ├── source files...
│ │ │
│ │ ├── version2/
│ │ │ ├── source files...
│ │ │
│ │ └── ...
│
└── ...

```

Each `package` folder contains subfolders for each version of the package, containing the source code files.

## Contributing

Contributions to this database are welcome! If you would like to add or update an NPM package, follow these steps:

1. Clone this repository to your local machine.
2. Add the source code of the NPM package to the appropriate folder in the `npm_packages` directory.
3. Commit and push your changes to the repository.
4. Create a pull request with a description of the changes you've made.

## NPM Package Source Code Downloader Script

```javascript
const axios = require('axios');
const tar = require('tar');
const fs = require('fs-extra');
const path = require('path');

async function getPackageInfo(packageName, retries = 3) {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const response = await axios.get(`https://registry.npmjs.org/${packageName}`, { timeout: 10000 });
            return response.data;
        } catch (error) {
            if (attempt === retries) {
                throw error;
            }
            console.log(`Retrying getPackageInfo (${attempt}/${retries})...`);
        }
    }
}

async function downloadAndExtractPackage(packageName, version, extractPath, retries = 3) {
    const url = `https://registry.npmjs.org/${packageName}/-/${packageName}-${version}.tgz`;

    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const response = await axios.get(url, { responseType: 'stream', timeout: 10000 });

            await new Promise((resolve, reject) => {
                response.data.pipe(tar.x({ C: extractPath }))
                    .on('finish', resolve)
                    .on('error', reject);
            });
            return;
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.log(`Version ${version} not found (404). Skipping...`);
                return; 
            }

            if (attempt === retries) {
                throw error;
            }
            console.log(`Retrying downloadAndExtractPackage (${attempt}/${retries})...`);
        }
    }
}

async function moveFilesUp(directory, packageName) {
    const packagePath = path.join(directory, 'package');
    const modulePath = path.join(directory, packageName);
    
    if (await fs.pathExists(packagePath)) {
        const files = await fs.readdir(packagePath);

        for (const file of files) {
            await fs.move(path.join(packagePath, file), path.join(directory, file));
        }

        await fs.remove(packagePath);
    } else if (await fs.pathExists(modulePath)) {
        const files = await fs.readdir(modulePath);

        for (const file of files) {
            await fs.move(path.join(modulePath, file), path.join(directory, file));
        }

        await fs.remove(modulePath);
    }
}

async function main(packageName) {
    try {
        const basePath = path.join(__dirname, 'npm_packages', packageName);
        await fs.ensureDir(basePath);

        const packageInfo = await getPackageInfo(packageName);

        for (let version of Object.keys(packageInfo.versions)) {
            console.log(`Processing ${packageName}@${version}`);
            const extractPath = path.join(basePath, version);

            await fs.ensureDir(extractPath);

            await downloadAndExtractPackage(packageName, version, extractPath);
            await moveFilesUp(extractPath, packageName);

            console.log(`Downloaded and extracted ${packageName}@${version} to ${extractPath}`);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Run the script with the name of the npm module
const packageName = 'express'; // Replace this with the desired npm module
main(packageName).catch(console.error);
```

## License

This project is licensed under the [MIT License](LICENSE).
