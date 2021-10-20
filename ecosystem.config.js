module.exports = {
  apps: [
    {
      name: 'fork',
      script: '.dist/src/index.js',
      watch: true,
      autorestart: true
    },
    {
      name: 'cluster',
      script: '.dist/src/index.js',
      watch: true,
      autorestart: true,
      args: '--cluster=true'
    }
  ]
};
