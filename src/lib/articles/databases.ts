import { BlogPost } from "../blog-types";

export const databaseArticles: BlogPost[] = [
  // ─── Article 10: MySQL & Laravel Connection ────────────────────────────────
  {
    slug: "how-to-connect-mysql-to-laravel-fix-connection-errors",
    title: "How to Connect MySQL to Laravel and Fix Database Connection Errors (SQLSTATE[HY000] [2002])",
    description: "Connect MySQL to Laravel 10/11 properly. Step-by-step setup with XAMPP, Laragon, and Docker, plus how to resolve Connection Refused [2002] and Access Denied errors.",
    category: "Databases",
    categorySlug: "databases",
    tags: ["Laravel", "MySQL", "PHP", "Database", "Troubleshooting"],
    publishedAt: "2025-02-01",
    updatedAt: "2025-02-15",
    readingTime: "11 min read",
    author: {
      name: "Manoj Neupane",
      role: "Software Developer & Programming Instructor",
      url: "https://manoj-neupane.com.np",
    },
    whoThisIsFor: "Laravel beginners running into database connection errors when executing 'php artisan migrate'.",
    prerequisites: [
      "PHP 8.2+ installed with pdo_mysql extension",
      "MySQL server running locally via XAMPP, Laragon, or standalone MySQL",
    ],
    whatYouWillLearn: [
      "Configuring config/database.php and .env for MySQL",
      "Understanding DB_HOST 127.0.0.1 vs localhost in PHP sockets",
      "Resolving SQLSTATE[HY000] [2002] Connection refused",
      "Resolving SQLSTATE[HY000] [1045] Access denied for user",
    ],
    sections: [
      {
        id: "env-configuration",
        title: "1. The Correct .env Configuration for MySQL",
        content: `Open your Laravel project's root \`.env\` file and configure these parameters:`,
        codeTabs: [
          {
            language: "bash",
            filename: ".env",
            label: "Local Development .env",
            code: `DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=my_laravel_app
DB_USERNAME=root
DB_PASSWORD=

# Tip: If using XAMPP on Windows, DB_PASSWORD is empty by default.
# If using Laragon or Docker, check your custom root password.`,
          },
        ],
      },
      {
        id: "connection-refused-fix",
        title: "2. Fixing SQLSTATE[HY000] [2002] Connection Refused",
        content: `### Symptom:
\`\`\`
SQLSTATE[HY000] [2002] Connection refused (Connection: mysql, SQL: select * from ...)
\`\`\`

### Root Causes & Solutions:
1. **MySQL Service is Stopped:** If using XAMPP, open the XAMPP Control Panel and check whether the MySQL module has a green "Running" status. If not, click **Start**.
2. **Socket vs TCP/IP (localhost vs 127.0.0.1):** In PHP on Unix/macOS, setting \`DB_HOST=localhost\` instructs PHP to look for a UNIX domain socket (\`/tmp/mysql.sock\`). Setting \`DB_HOST=127.0.0.1\` forces standard TCP networking. **Always use 127.0.0.1 in Laravel.**
3. **Port Conflict:** If another service is occupying port 3306, MySQL may fail to start or bind to a different port (like 3307).`,
      },
      {
        id: "access-denied-fix",
        title: "3. Fixing SQLSTATE[HY000] [1045] Access Denied for User",
        content: `### Symptom:
\`\`\`
SQLSTATE[HY000] [1045] Access denied for user 'root'@'127.0.0.1' (using password: NO/YES)
\`\`\`

### Solution:
Verify user credentials in MySQL:`,
        codeTabs: [
          {
            language: "sql",
            filename: "MySQL Console",
            label: "Reset/Grant Privileges",
            code: `-- Open MySQL prompt and grant privileges
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'YourNewPassword';
FLUSH PRIVILEGES;`,
          },
        ],
      },
    ],
    expectedOutput: `Running 'php artisan migrate' creates default tables (users, password_reset_tokens, failed_jobs, personal_access_tokens) successfully with:
INFO  Preparing database.
INFO  Running migrations.
2014_10_12_000000_create_users_table ......... DONE`,
    testingSteps: [
      "Run `php artisan db:show` in terminal to view table list and connection health",
      "Run `php artisan migrate:status` to ensure database connection is active",
    ],
    commonErrors: [
      {
        error: "Unknown database 'my_laravel_app'",
        cause: "Database does not exist in MySQL yet.",
        solution: "Create database in phpMyAdmin: CREATE DATABASE my_laravel_app CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;",
      },
    ],
    securityNotes: [
      "Never use the 'root' user in production. Create a dedicated database user with restricted permissions for the specific database only.",
    ],
    faqs: [
      {
        question: "Why should I clear cache after changing .env?",
        answer: "Laravel caches configuration files. Run 'php artisan config:clear' whenever you change database credentials in .env.",
      },
    ],
    summary: [
      "Use 127.0.0.1 instead of localhost for DB_HOST.",
      "Clear config cache with 'php artisan config:clear' after editing .env.",
    ],
    references: [
      {
        title: "Laravel Database Configuration Docs",
        url: "https://laravel.com/docs/database",
        description: "Official guide on database connections and read/write replicas.",
      },
    ],
    relatedSlugs: [
      "how-to-deploy-laravel-project-on-cpanel",
      "how-to-fix-laravel-500-internal-server-error",
    ],
  },

  // ─── Article 11: MongoDB & Node.js ─────────────────────────────────────────
  {
    slug: "how-to-connect-mongodb-to-nodejs",
    title: "How to Connect MongoDB to a Node.js Application with Mongoose (Handling Retries & Disconnections)",
    description: "Learn how to connect MongoDB (Local or Atlas) to Node.js using Mongoose. Handle special characters in connection strings, connection pooling, and auto-reconnect listeners.",
    category: "Databases",
    categorySlug: "databases",
    tags: ["MongoDB", "Mongoose", "Node.js", "Express", "Database"],
    publishedAt: "2025-02-03",
    updatedAt: "2025-02-16",
    readingTime: "12 min read",
    author: {
      name: "Manoj Neupane",
      role: "Software Developer & Programming Instructor",
      url: "https://manoj-neupane.com.np",
    },
    whoThisIsFor: "MERN stack developers and Node.js students connecting applications to MongoDB Atlas cloud or local MongoDB instances.",
    prerequisites: [
      "Node.js 18+ installed",
      "Mongoose package installed (npm install mongoose)",
      "MongoDB Atlas account or local mongod service",
    ],
    whatYouWillLearn: [
      "Writing a robust, modular database connection module",
      "Safely escaping special characters in Atlas passwords",
      "Handling connection events (connected, error, disconnected)",
      "Configuring connection pools and timeouts for production",
    ],
    sections: [
      {
        id: "modular-connection-module",
        title: "1. The Production-Ready Database Connection Module",
        content: `Never write your database connection logic directly inside \`server.js\`. Create a dedicated module:`,
        codeTabs: [
          {
            language: "javascript",
            filename: "config/db.js",
            label: "Node.js (Mongoose)",
            code: `const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of hanging
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    });

    console.log(\`✅ MongoDB Connected: \${conn.connection.host}\`);
  } catch (error) {
    console.error(\`❌ MongoDB connection error: \${error.message}\`);
    process.exit(1); // Exit process with failure
  }
};

// Event Listeners for Lifecycle Monitoring
mongoose.connection.on('disconnected', () => {
  console.warn('⚠️ MongoDB disconnected! Attempting reconnect...');
});

mongoose.connection.on('error', (err) => {
  console.error('⚠️ MongoDB runtime error:', err);
});

module.exports = connectDB;`,
          },
          {
            language: "javascript",
            filename: "server.js",
            label: "Express Usage",
            code: `require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect to Database
connectDB();

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', dbReadyState: mongoose.connection.readyState });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(\`Server running on port \${PORT}\`));`,
          },
        ],
      },
      {
        id: "escaping-atlas-passwords",
        title: "2. Handling Special Characters in MongoDB Atlas Passwords",
        content: `If your MongoDB Atlas password contains special characters like \`@\`, \`#\`, \`/\`, or \`:\`, the connection string parser fails with:
\`\`\`
MongoParseError: URI does not have valid format
\`\`\`

**Solution:** URL-encode the special characters or use encodeURIComponent in JavaScript:
- \`@\` becomes \`%40\`
- \`#\` becomes \`%23\`
- \`/\` becomes \`%2F\``,
      },
    ],
    expectedOutput: `Console logs:
✅ MongoDB Connected: cluster0-shard-00-00.mongodb.net
Server running on port 5000`,
    testingSteps: [
      "Temporarily disconnect Wi-Fi to test the disconnected event handler",
      "Check `http://localhost:5000/api/health` to confirm dbReadyState returns 1 (connected)",
    ],
    commonErrors: [
      {
        error: "MongooseServerSelectionError: connect ECONNREFUSED",
        cause: "IP Address not whitelisted in MongoDB Atlas Network Access.",
        solution: "In MongoDB Atlas dashboard, go to Network Access and add your current IP or allow 0.0.0.0/0 (for development).",
      },
    ],
    securityNotes: [
      "Never push .env files containing MongoDB connection strings with usernames and passwords to GitHub.",
    ],
    faqs: [
      {
        question: "Is MongoDB Atlas free?",
        answer: "Yes, MongoDB Atlas provides an M0 Sandbox cluster with 512MB storage and shared RAM for free forever.",
      },
    ],
    summary: [
      "Modularize connection logic and handle lifecycle events.",
      "URL-encode special characters in Atlas passwords.",
    ],
    references: [
      {
        title: "Mongoose Connection Documentation",
        url: "https://mongoosejs.com/docs/connections.html",
        description: "Official guide on pool sizes, options, and events.",
      },
    ],
    relatedSlugs: [
      "how-to-deploy-mern-stack-on-vps",
      "how-to-configure-environment-variables-securely",
    ],
  },
];
