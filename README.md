
# Compact School Menager CRM

Compact School Management System, showcasing my skills as a junior developer.
This small web application allows you to manage data for various types of institutions, such as language schools or dance studios.

Admin can:
- add, edit, remove courses
- assign multiple courses to one student
- assign multiple courses to one teacher

Student can:
- edit his data such as name, lastname, password
- select and change courses

Teacher can:
- see his courses
- see his all students
- edit his data such as name, lastname, password

**Note: The application is currently under active development, and I am working on adding new features and improvements.**



**TECHNOLOGY STACK:**

- **Backend:**
    - Node.js: The backend of this application is powered by Node.js, which provides a server-side runtime environment.
    - Express.js: Express is used for handling routing and creating a RESTfull API.
    - SQL Database: The application utilizes a SQL database to store and manage data.
    - GraphQL: GraphQL is integrated for data fetching from Dato CMS.
    - Typescript

- **Frontend:**
    - React: The frontend is built using React, a popular JavaScript library for building user interfaces.
    - Chakra UI: Chakra UI is used for styling the frontend components, providing a modern and responsive design.
    - TypeScript

- **Deployment:**
    - Linux Server: The application is deployed on a Linux server for hosting and serving the application.



My Contribution:
Designed the application.
Implemented the backend and frontend.
Set up a SQL database.
Implemented user registration and authentication.
Deployed the application on linux server.

**Planned Features:**
- Enhanced student and teacher users profile management.
- Announcement board: main dashboard, with posts and possibility to comment them for logged users.


**How to run the application:**

 1. **Clone repository**

- clone the repository to your computer with command:
 `git clone https://github.com/GeniaPiano/school-app-new.git`
 - go to folder of cloned repository:
  `cd school-app-new`

 2. **Setting Up the Database:**

 - Open your preferred SQL management tool such as phpMyAdmin or HeidiSQL. 
 - Open the SQL script file create-database.sql in a text editor. It is located in folder sql, that you wil find in the main catalogue of repository.
 - Copy the content of the create-database.sql script.
 - In your SQL management tool, navigate to the SQL editor or query window.
 -  Paste the copied script into the SQL editor.
 - Execute the script to create the database and its tables.
 -  By following these steps, you will set up the database by running the SQL script in your chosen SQL management tool.

3. **Setup and run server:** 
- Ensure that you have Node.js installed. You can download it from the Node.js website.
- Install project dependencies: Navigate to the api project directory (the directory where the package.json file is located) and then run the `npm install` command. This will install all the dependencies listed in the package.json file into the node_modules folder.
- run the script: `npm run start`

4. **Setup and run client:**
- Go to the client folder which is located in the main catalogue of repository
- Run the command `npm install` to install all dependencies  listed in the package.json
- Run the application by the command `npm run dev`
- Open a web browser and go to http://localhost:5173/











