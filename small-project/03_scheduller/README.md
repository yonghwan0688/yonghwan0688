# 03_scheduller Project

This project is a full-stack React application designed to manage scheduling functionalities. It consists of a client-side application built with React and a server-side application using Node.js and Express.

## Project Structure

The project is organized into two main directories: `client` and `server`.

### Client

The client-side application is located in the `client` directory and includes the following files:

- **src/App.tsx**: The main component of the React application, setting up the application structure.
- **src/index.tsx**: The entry point for the React application, rendering the `App` component into the DOM.
- **src/components/Scheduler.tsx**: A component responsible for displaying and managing scheduling functionality.
- **src/types/index.ts**: TypeScript types and interfaces used throughout the client application.
- **package.json**: Configuration file listing dependencies and scripts for the React project.
- **tsconfig.json**: TypeScript configuration file specifying compiler options.

### Server

The server-side application is located in the `server` directory and includes the following files:

- **src/index.ts**: The entry point for the server application, setting up the Express server and middleware.
- **src/controllers/schedulerController.ts**: Contains methods for handling scheduling-related requests.
- **src/routes/schedulerRoutes.ts**: Defines the routes for the scheduling API.
- **src/types/index.ts**: TypeScript types and interfaces used throughout the server application.
- **package.json**: Configuration file listing dependencies and scripts for the Node.js project.
- **tsconfig.json**: TypeScript configuration file specifying compiler options.

## Features

- User-friendly interface for managing schedules.
- Ability to create, update, and delete schedules.
- Type safety provided by TypeScript for both client and server applications.

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the client directory and install dependencies:
   ```
   cd client
   npm install
   ```

3. Navigate to the server directory and install dependencies:
   ```
   cd ../server
   npm install
   ```

4. Start the server:
   ```
   npm start
   ```

5. In a separate terminal, navigate back to the client directory and start the client application:
   ```
   cd ../client
   npm start
   ```

## Usage

Once both the client and server are running, you can access the application in your web browser at `http://localhost:3000`. Use the interface to manage your schedules effectively.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.