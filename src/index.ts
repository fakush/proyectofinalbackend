import myServer from './services/server';

const port = process.env.Port || 8080;
myServer.listen(port, () => console.log(`SERVER UP IN PORT ${port}`));
myServer.on('error', (err) => {
  console.log('SERVER ERROR: ', err);
});
