import { initDB } from './utils/db.js';

async function initialize() {
  try {
    await initDB();
    console.log('Database initialized successfully.');
  } catch (error) {
    console.error('Failed to initialize database:', error);
    process.exit(1);
  }
}

initialize();