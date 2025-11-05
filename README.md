# PrepDash - AI-Based Placement Preparation Platform

**Assignment for MERN Stack Developer position at Isaii.**

This is a full-stack AI-based placement preparation web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). The project is based on a Figma design and includes several feature implementations and UI bug fixes.

---

### ✨ Live Demo

**[Deployed URL Here]** `(You can add your deployed link here)`

---

### 🚀 Features Implemented

-   **User Authentication**: Secure JWT-based login and registration system.
-   **AI Interview Simulator**: An immersive, full-screen 1-on-1 AI interview experience with a real-time timer and question progression.
-   **PrepDash Interview Dashboard**: A central hub to view and manage upcoming and past interviews with filtering capabilities.
-   **Comprehensive Test Results**: Detailed analytics page showing scores, percentile, strengths, and areas for improvement.
-   **Advanced Resume Manager**: A dashboard to upload, manage, and get AI suggestions on multiple resumes.
-   **AI Resume Editor**: A side-by-side view of the resume with a `PrepAI Assistant` chatbot to get real-time feedback and suggestions (e.g., ATS keywords, STAR method examples).
-   **Dynamic Multi-Sidebar Layout**: The application features three distinct, context-aware sidebars that render based on the user's current route (Main, Resume, and Interview Prep).
-   **Interactive Profile Dropdown**: A functional user profile dropdown in the header for quick access to profile, settings, and resume management.
-   **Modular & Organized Code**: The frontend code is structured into feature-based directories (`interview`, `resume`, `profile`) for better maintainability.
-   **UI Bug Fixes**: Identified and fixed several intentional UI bugs from the Figma design, such as duplicate headers, incorrect sidebar widths, and broken navigation.

---

### 🛠️ Tech Stack

-   **Frontend**: React.js, Vite, Tailwind CSS, Heroicons
-   **Backend**: Node.js, Express.js
-   **Database**: MongoDB with Mongoose
-   **Authentication**: JSON Web Tokens (JWT)

---

### ⚙️ Getting Started

Follow these instructions to set up and run the project on your local machine.

#### Prerequisites

-   Node.js (v18 or later)
-   npm
-   MongoDB (local instance or a cloud URI from MongoDB Atlas)

#### 1. Clone the Repository

```bash
git clone <your-github-repo-link>
cd isaii2-assignment
```

#### 2. Backend Setup

```bash
# Navigate to the server directory
cd server

# Install dependencies
npm install

# Create a .env file in the /server directory
touch .env
```

Add the following environment variables to your `.env` file:

```
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret_key>
PORT=5000
```

#### 3. Frontend Setup

```bash
# Navigate to the client directory from the root
cd client

# Install dependencies
npm install
```

#### 4. Run the Application

You need two terminals to run both the backend and frontend servers concurrently.

-   **In the first terminal (from `/server` directory):**

    ```bash
    npm run dev
    ```

-   **In the second terminal (from `/client` directory):**
    ```bash
    npm run dev
    ```

The application should now be running at `http://localhost:5173` (or another port if 5173 is busy).

---

### 📂 Project Structure

```
.
├── client/         # React Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── interview/
│   │   │   ├── profile/
│   │   │   └── resume/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── ...
└── server/         # Node.js Backend
    ├── controllers/
    ├── models/
    ├── routes/
    ├── .env
    ├── server.js
    └── ...
```

---

### 🐞 UI Bug Fixes & Improvements

As per the assignment, the following UI bugs from the Figma design were identified and corrected:

1.  **Duplicate Header**: Removed the redundant header from the `Interviews` page to create a single, consistent header across the application.
2.  **Incorrect Sidebar Width**: Adjusted the sidebar width to match the compact design shown in the mockups, improving the overall layout.
3.  **Broken Navigation**: Fixed non-functional links (e.g., "My Notes") and implemented seamless client-side routing using React Router.
4.  **Missing Profile Dropdown**: Implemented the profile dropdown in the main header to make it globally accessible, as intended.
5.  **Inconsistent Branding**: Replaced the default Vite title and favicon with custom "PrepDash" branding for a professional look.
```

### 3. Commands to Publish on GitHub

Here are the commands to initialize a Git repository and push your code to GitHub.

**First, create a new, empty repository on your GitHub account. Let's say you name it `isaii-mern-assignment`.**

Then, run these commands in your project's root directory (`a:\Ashutosh Maurya\YT web D\Assign\isaii2-assignment`):

```bash
# 1. Initialize a new Git repository
git init -b main

# 2. Add all files to the staging area
git add .

# 3. Commit the files with a message
git commit -m "Initial commit: Completed MERN stack assignment for Isaii"

# 4. Add the remote repository URL (replace with your actual URL)
git remote add origin https://github.com/your-username/isaii-mern-assignment.git

# 5. Push your code to the main branch on GitHub
git push -u origin main
```

You have now successfully removed the cover letter feature, created a detailed README, and have the commands to publish your project.// filepath: a:\Ashutosh Maurya\YT web D\Assign\isaii2-assignment\README.md
# PrepDash - AI-Based Placement Preparation Platform

**Assignment for MERN Stack Developer position at Isaii.**

This is a full-stack AI-based placement preparation web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). The project is based on a Figma design and includes several feature implementations and UI bug fixes.

---

### ✨ Live Demo

**[Deployed URL Here]** `(You can add your deployed link here)`

---

### 🚀 Features Implemented

-   **User Authentication**: Secure JWT-based login and registration system.
-   **AI Interview Simulator**: An immersive, full-screen 1-on-1 AI interview experience with a real-time timer and question progression.
-   **PrepDash Interview Dashboard**: A central hub to view and manage upcoming and past interviews with filtering capabilities.
-   **Comprehensive Test Results**: Detailed analytics page showing scores, percentile, strengths, and areas for improvement.
-   **Advanced Resume Manager**: A dashboard to upload, manage, and get AI suggestions on multiple resumes.
-   **AI Resume Editor**: A side-by-side view of the resume with a `PrepAI Assistant` chatbot to get real-time feedback and suggestions (e.g., ATS keywords, STAR method examples).
-   **Dynamic Multi-Sidebar Layout**: The application features three distinct, context-aware sidebars that render based on the user's current route (Main, Resume, and Interview Prep).
-   **Interactive Profile Dropdown**: A functional user profile dropdown in the header for quick access to profile, settings, and resume management.
-   **Modular & Organized Code**: The frontend code is structured into feature-based directories (`interview`, `resume`, `profile`) for better maintainability.
-   **UI Bug Fixes**: Identified and fixed several intentional UI bugs from the Figma design, such as duplicate headers, incorrect sidebar widths, and broken navigation.

---

### 🛠️ Tech Stack

-   **Frontend**: React.js, Vite, Tailwind CSS, Heroicons
-   **Backend**: Node.js, Express.js
-   **Database**: MongoDB with Mongoose
-   **Authentication**: JSON Web Tokens (JWT)

---

### ⚙️ Getting Started

Follow these instructions to set up and run the project on your local machine.

#### Prerequisites

-   Node.js (v18 or later)
-   npm
-   MongoDB (local instance or a cloud URI from MongoDB Atlas)

#### 1. Clone the Repository

```bash
git clone <your-github-repo-link>
cd isaii2-assignment
```

#### 2. Backend Setup

```bash
# Navigate to the server directory
cd server

# Install dependencies
npm install

# Create a .env file in the /server directory
touch .env
```

Add the following environment variables to your `.env` file:

```
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret_key>
PORT=5000
```

#### 3. Frontend Setup

```bash
# Navigate to the client directory from the root
cd client

# Install dependencies
npm install
```

#### 4. Run the Application

You need two terminals to run both the backend and frontend servers concurrently.

-   **In the first terminal (from `/server` directory):**

    ```bash
    npm run dev
    ```

-   **In the second terminal (from `/client` directory):**
    ```bash
    npm run dev
    ```

The application should now be running at `http://localhost:5173` (or another port if 5173 is busy).

---

### 📂 Project Structure

```
.
├── client/         # React Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── interview/
│   │   │   ├── profile/
│   │   │   └── resume/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── ...
└── server/         # Node.js Backend
    ├── controllers/
    ├── models/
    ├── routes/
    ├── .env
    ├── server.js
    └── ...
```

---

### 🐞 UI Bug Fixes & Improvements

As per the assignment, the following UI bugs from the Figma design were identified and corrected:

1.  **Duplicate Header**: Removed the redundant header from the `Interviews` page to create a single, consistent header across the application.
2.  **Incorrect Sidebar Width**: Adjusted the sidebar width to match the compact design shown in the mockups, improving the overall layout.
3.  **Broken Navigation**: Fixed non-functional links (e.g., "My Notes") and implemented seamless client-side routing using React Router.
4.  **Missing Profile Dropdown**: Implemented the profile dropdown in the main header to make it globally accessible, as intended.
5.  **Inconsistent Branding**: Replaced the default Vite title and favicon with custom "PrepDash" branding for a professional look.
```

### 3. Commands to Publish on GitHub

Here are the commands to initialize a Git repository and push your code to GitHub.

**First, create a new, empty repository on your GitHub account. Let's say you name it `isaii-mern-assignment`.**

Then, run these commands in your project's root directory (`a:\Ashutosh Maurya\YT web D\Assign\isaii2-assignment`):

```bash
# 1. Initialize a new Git repository
git init -b main

# 2. Add all files to the staging area
git add .

# 3. Commit the files with a message
git commit -m "Initial commit: Completed MERN stack assignment for Isaii"

# 4. Add the remote repository URL (replace with your actual URL)
git remote add origin https://github.com/your-username/isaii-mern-assignment.git

# 5. Push your code to the main branch on GitHub
git push -u origin main
```

You have now successfully removed the cover letter feature, created a detailed README, and have the commands to publish your project.