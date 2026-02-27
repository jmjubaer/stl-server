import config from './app/config';
import app from './app';
import mongoose from 'mongoose';
import { Server } from 'http';
let server: Server;
const main = async () => {
  try {
    await mongoose.connect(config.database_url as string);
    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

main();

process.on('unhandledRejection', () => {
  if (server) {
    server.close(() => {
      console.log('Server closed due to unhandled rejection');
      process.exit(1);
    });
  }
});

process.on('uncaughtException', () => {
  console.log('Uncaught exception, shutting down the server');
  process.exit(1);
});
