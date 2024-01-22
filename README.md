# Kryzen Node.js and React.js Application

## Project Overview

Welcome to the Kryzen project! This Node.js and React.js application focuses on user authentication, data collection via a form, and the ability to display and download collected data in PDF format.
***
FrontendURL: https://frontend-abhi0049k.vercel.app
BackendURL: https://kryzenassignment.onrender.com/


## Technologies

1. Frontend: React.js
2. Backend: Node.js
3. Database: MongoDB 
4. Authentication: JSON Web Tokens (JWT)
5. Input Validation: Zod

## Project Features:

### 1. User Authentication

Implemented user authentication for secure access to the application. Users can:
- Register a new account with a unique username and password.
- Log in securely with their credentials.
- Access specific pages only when authenticated.

### 2. Data Collection Form

Created a simple form to collect user information:
- Name
- Age
- Address
- Photo (upload functionality)

### 3. Data Display and Preview

After submitting the form, display the collected data as a preview to the user.

### 4. PDF Download

Provided users with the option to download collected data in PDF format. The PDF should be dynamically generated and include all form information.

### Running Locally:

1. Clone the project:

    ```bash
    git clone https://github.com/Abhi0049k/Kryzen-Assignment.git
    ```

2. Copy the `.env.example` to `.env` for both the backend and react-frontend.

3. Navigate to the `backend` folder and the `frontend` folder separately and install dependencies:

    ```bash
    cd backend
    npm install
    ```

    ```bash
    cd frontend
    npm install
    ```

4. Run both the backend and frontend:

    ```bash
    npm run dev
    ```
