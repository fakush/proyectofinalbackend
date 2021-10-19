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
      instances: -1,
      args: '--cluster=true'
    }
  ]
};
