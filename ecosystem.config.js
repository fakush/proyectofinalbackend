module.exports = {
  apps: [
    {
      name: 'fork 1',
      script: './dist/src/index.js',
      watch: true,
      autorestart: true,
      args: '--port=8081'
    },
    {
      name: 'fork 2',
      script: './dist/src/index.js',
      watch: true,
      autorestart: true,
      args: '--port=8082 --cluster=true'
    }
  ]
};
