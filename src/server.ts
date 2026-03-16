import config from './config';
import app from './app';
import mongoose from 'mongoose';
import { Server } from 'http';
let server: Server;

const main = async () => {
  try {
    await mongoose.connect(config.database_url as string);
    console.log('Database connected successfully');

    server = app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  } catch (error) {
    console.error('Failed to connect to database:', error);
    process.exit(1);
  }
};

// my code ----------------
// process.on('unhandledRejection', () => {
//   if (server) {
//     server.close(() => {
//       console.log('Server closed due to unhandled rejection');
//       process.exit(1);
//     });
//   }
// });

// process.on('uncaughtException', () => {
//   console.log('Uncaught exception, shutting down the server');
//   process.exit(1);
// });

// Claude recomendation

// Graceful shutdown helper
const gracefulShutdown = (reason: string, error?: unknown) => {
  console.error(`❌ ${reason}:`, error);

  if (server) {
    server.close(() => {
      console.log('🔴 Server closed gracefully');
      mongoose.connection.close().then(() => {
        console.log('🔴 Database connection closed');
        process.exit(1);
      });
    });
  } else {
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason) => {
  gracefulShutdown('Unhandled Rejection', reason);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  gracefulShutdown('Uncaught Exception', error);
});

// Handle SIGTERM (Vercel, Docker, PM2 sends this on shutdown)
process.on('SIGTERM', () => {
  gracefulShutdown('SIGTERM received');
});

// Handle SIGINT (Ctrl+C in terminal)
process.on('SIGINT', () => {
  gracefulShutdown('SIGINT received');
});

main();
