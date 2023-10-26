

<p align="center"><img src="https://www.datocms-assets.com/107048/1697483793-dance-studio.png" alt=""></p>
<h1 align="center">Sport & Dance Studio
</h1> 

School Management, showcasing my skills as a junior developer. This small web application allows you to manage data for various types of institutions, such as language schools or dance studios.
## VIDEO PRESENTATION:
[https://www.youtube.com/watch?v=19mNZ9KRGwI](https://www.youtube.com/watch?v=19mNZ9KRGwI)
## LIVE PREVIEW:
[https://menager.networkmanager.pl/](https://menager.networkmanager.pl/)



Key Features:

- Admin Panel: managing of courses and instructors, including setting the prices.
- SQL Database: All data is securely stored and managed in a SQL database.
- User Authentication: Secure registration and login with JWT.
- Stripe Integration: Seamless payment processing for course payments.
- Student Course Purchase: Students can purchase courses, enhancing user engagement.
- Variety of forms, with both server-side and client-side validation.

 Planned Features:
User Ratings: Clients can rate and review courses.
- Administrative Reports: Gain insights into studio's performance.
- Class Cancellation: Instructors can cancel classes with automatic refunds.
- User Ratings: Clients can rate and review courses.

Conclusion:
Simplify fitness studio management of fitness and dance institution studio.


**Note: The application is currently under active development, and I am working on adding new features and improvements.**

<h2 align="center"> TECHNOLOGY STACK: </h2>

<p align="center"> 
<a href="https://reactjs.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/> </a>
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a> 
<a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="40" height="40"/> </a>  
<a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a> 
<a href="https://expressjs.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="40" height="40"/> </a> 
<a href="https://www.mysql.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg" alt="mysql" width="40" height="40"/> </a> 
<a href="https://graphql.org" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/graphql/graphql-icon.svg" alt="graphql" width="40" height="40"/> </a> 
</p>

- **Backend:**
  - Node.js: The backend of this application is powered by Node.js
  - Express.js: Express is used for handling routing and creating a RESTful API.
  - SQL Database
  - GraphQL: GraphQL is integrated for data fetching from Dato CMS.
  - TypeScript

- **Frontend:**
  - React
  - TypeScript
  - Chakra UI 

- **Deployment:**
  - Linux Server: The application is deployed on a Linux server for hosting and serving the application.


<h1 align="center">Screens:</h1> 
<img src="https://www.datocms-assets.com/107048/1697613974-3.jpg" alt="graphql" height="400"/>
<img alt="" src="https://www.datocms-assets.com/107048/1697613984-5.jpg" height="400">
<img alt="" src="https://www.datocms-assets.com/107048/1698008103-screenshot_a.jpg" height="400">
<img src="https://www.datocms-assets.com/107048/1698008108-screenshot_b.jpg" alt="" height="400">
<img src="https://www.datocms-assets.com/107048/1698008117-screenshot_d.jpg" alt="">
<img src="https://www.datocms-assets.com/107048/1698343959-bbb.jpg" alt="">
<img alt="" src="https://www.datocms-assets.com/107048/1697613967-1.jpg" height="400">
<img alt="" src="https://www.datocms-assets.com/107048/1697613971-2.jpg" height="400">
<img alt=""  src="https://www.datocms-assets.com/107048/1696586170-screenshot_3.jpg" height="400">
<img alt="" src="https://www.datocms-assets.com/107048/1696586183-screenshot_1.jpg" height="400">
<img alt="" src="https://www.datocms-assets.com/107048/1696586209-screenshot_8.jpg" height="400">
<img alt="" src="https://www.datocms-assets.com/107048/1696586262-screenshot_5.jpg" height="400">



**How to run the application locally:**

1. **Clone repository**

  - Clone the repository to your computer with the command:
    `git clone https://github.com/GeniaPiano/school-app-new.git`
  - Go to the folder of the cloned repository:
    `cd school-app-new`

2. **Setting Up the Database:**

  - Open your preferred SQL management tool such as phpMyAdmin or HeidiSQL.
  - Open the SQL script file create-database.sql in a text editor. It is located in the `sql` folder, which you will find in the main catalog of the repository.
  - Copy the content of the `create-database.sql` script.
  - In your SQL management tool, navigate to the SQL editor or query window.
  - Paste the copied script into the SQL editor.
  - Execute the script to create the database and its tables.
  - By following these steps, you will set up the database by running the SQL script in your chosen SQL management tool.

3. **Setup and run server:**
  - Ensure that you have Node.js installed. You can download it from the [Node.js website](https://nodejs.org/).
  - Install project dependencies: Navigate to the `api` project directory (the directory where the `package.json` file is located) and then run the `npm install` command. This will install all the dependencies listed in the `package.json` file into the `node_modules` folder.
  - Run the script: `npm run start`

4. **Setup and run client:**
  - Go to the `client` folder, which is located in the main catalog of the repository.
  - Run the command `npm install` to install all dependencies listed in the `package.json`.
  - Run the application by the command `npm run dev`.
  - Open a web browser and go to [http://localhost:5173/](http://localhost:5173/)
