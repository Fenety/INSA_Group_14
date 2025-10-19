# Phishing Detector Backend

This is the backend server for the Phishing Detector application. It provides an API for the frontend, manages the database connection, and communicates with a machine learning service to analyze potential phishing threats.

## Prerequisites

Before you begin, ensure you have the following installed:
*   [Node.js](https://nodejs.org/) (which includes npm)
*   [MongoDB](https://www.mongodb.com/try/download/community)

## Getting Started

Follow these steps to get the backend server up and running on your local machine.

### 1. Installation

Navigate to the backend directory and install the required dependencies.

```bash
cd phishing_detector/backend
npm install
```

### 2. Environment Configuration

The server requires environment variables to run correctly. These variables are used for database connections, email services, and other configurations.

1.  Create a file named `.env` in the `phishing_detector/backend` directory.
2.  Copy the following content into the `.env` file and replace the placeholder values with your actual credentials and settings.

    ```env
    # Port for the server to run on
    PORT=3000

    # MongoDB connection string
    MONGO_URI=mongodb://localhost:27017/phishing_db

    # Gmail credentials for sending emails (use a Google App Password)
    EMAIL_USER=your-email@gmail.com
    EMAIL_PASS=your-google-app-password

    # URL for the machine learning API
    ML_API_URL=http://localhost:8000
    ```

    **Important:** The `.env` file contains sensitive information and should **never** be committed to Git. The provided `.gitignore` file already prevents this.

### 3. Running the Application

You can run the server in two modes:

*   **Development Mode**: This will use `nodemon` (or `ts-node-dev`) to automatically restart the server whenever you make changes to the code.
    ```bash
    npm run dev
    ```

*   **Production Mode**: This runs the server using `node`.
    ```bash
    npm start
    ```

The server should now be running on the port you specified in your `.env` file (e.g., `http://localhost:3000`).