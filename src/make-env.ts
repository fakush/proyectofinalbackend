import fs from 'fs';

fs.renameSync('../.env.example', './.env');
console.log('.env file created');
