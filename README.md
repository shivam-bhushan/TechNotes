# TechNotes

# Sticky Note Management System
The Sticky Note Management System is a web application designed to replace the current sticky note system used for taking and managing notes within an organization. This project aims to streamline the note-taking process, improve accessibility, and enhance security through user authentication and role-based access control. The system allows users to create, edit, and manage notes, while ensuring appropriate access levels for different user roles.

## Features
Replace Current Sticky Note System:
This project provides an alternative to the traditional sticky note system, offering a digital solution for note-taking and management.

**Public Facing Contact Page:**

A public-facing page displays basic contact information for the organization, making it easy for external parties to get in touch.

**Employee Login:**

Employees can log in securely to the notes app using their credentials.

**Welcome Page After Login:**

After successful login, users are greeted with a welcome page that displays important updates and announcements.

**Easy Navigation:**

The application features intuitive navigation to ensure seamless movement between different sections and functionalities.

**Display User and Role:**

The current user's name and assigned role are displayed to provide context and personalization.

**Logout Option:**

Users can log out of the system, ensuring the security of their account and data.

**Weekly Login Requirement:**

Users are required to log in at least once a week to maintain active access to the system.

**Immediate User Access Removal:**

Administrators have the ability to promptly remove user access when needed.

**Assigned Notes:**

Notes are assigned to specific users, streamlining note management and accountability.

**Note Details:**

Each note includes a unique ticket number, title, note body, creation and last updated dates.

**Note Status:**

Notes can be in either "OPEN" or "COMPLETED" status, allowing for easy tracking of progress.

**User Roles:**

The system supports three user roles: Employees, Managers, and Administrators, each with distinct privileges.

**Manager and Admin Note Control:**

Managers and Administrators have the authority to delete notes, enhancing data management.

**Open Note Creation:**

Customers can create notes when checking in, enabling easy communication.

**Employee Note Access:**

Employees can view and edit notes that are specifically assigned to them.

**Manager and Admin Note Access:**

Managers and Administrators can view, edit, and delete all notes in the system.

**Manager and Admin User Settings:**

Only Managers and Administrators have access to User Settings for user management.

**User Creation Privilege:**

Managers and Administrators can create new users as needed.

**Responsive Design:**

The application is designed to be responsive, ensuring usability across desktop and mobile devices.

## Technologies Used

Frontend: React, React Router

Backend: Node.js, Express.js

Database: MongoDB

## Getting Started
Follow these steps to set up and run the Sticky Note Management System locally on your machine:

Clone the repository: git clone [repository URL]

Navigate to the project directory: cd sticky-note-management-system

Install dependencies: npm install

Configure environment variables: Create a .env file in the root directory and add necessary variables.

Run the development server: npm start

Open a web browser and access the application at http://localhost:3000
