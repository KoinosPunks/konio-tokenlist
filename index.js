const fs = require('fs');
const path = require('path');

const inputFolderPath = './';
const outputFolderPath = './dist';

const files = fs.readdirSync(inputFolderPath).map(fileName => {
    return path.join(inputFolderPath, fileName);
});

const output = {};

for (const file of files) {
    if (path.extname(file) === '.json' && file !== 'index.json') {
        const fileData = fs.readFileSync(file);
        const jsonData = JSON.parse(fileData);
        
        output[jsonData.address] = jsonData;
    }
}

const outputData = JSON.stringify(output);
if (!fs.existsSync(outputFolderPath)){
    fs.mkdirSync(outputFolderPath);
}
fs.writeFileSync(`${outputFolderPath}/index.json`, outputData);