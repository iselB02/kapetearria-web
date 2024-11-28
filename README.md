# Kapetearria Website with React and Firebase 

### Learn More about the Company
Kapetearria is a coffee shop located in Biñan, Laguna, that prides itself on offering a cozy atmosphere perfect for coffee enthusiasts. The shop provides a diverse selection of coffee blends, ranging from classic brews to specialty blends, all sourced from high-quality beans. Whether you're looking for a strong espresso, a creamy cappuccino, or a refreshing iced coffee, Kapetearria has something for every taste.

In addition to coffee, the shop offers a variety of delectable treats, such as freshly baked pastries, sandwiches, and light snacks, that perfectly complement the rich flavors of the coffee. The cozy ambiance, combined with friendly service and great food, makes Kapetearria an ideal spot for casual hangouts, work meetings, or simply relaxing with a cup of your favorite brew.

The website provides a seamless way for customers to browse the menu, place orders for pickup or delivery, and explore the latest offerings and promotions. Whether you're visiting in person or ordering online, Kapetearria ensures an enjoyable experience every time.


## Program Installation
To get started with the program, clone the repositories and install these dependencies ton ensure no module is missing.

### 1. Cloning the repository by 
`git clone <repository-url>` 

### 2. Install Dependencies

        ```bash
        npm install react-script
        ```

        A utility to manage scripts in a React application. This helps with the running and building of the app.

        ```bash
        npm install firebase
        ```
        Firebase is used to integrate cloud services such as authentication, database, and file storage into the application.

        ```bash
        npm install jspdf jspd-autotable
        ```
        These libraries are used for generating PDFs and allow downloading of this file for the sales report section in Admin.

        ```bash
        npm install react router dom
        ```
        A library for adding navigation to the application. It enables routing between different components or pages.

        ```bash
        npm install chatbotify 
        ```
        This is a chatbot integration library, which allows us to implement a chatbot feature into this application where an automated answering machine accomodating customers with their inquiries.

        ```bash
        npm install react chart.js
        ```
        A wrapper for Chart.js, which helps in integrating interactive charts and graphs for data visualization used on the Admin section of the website to visualize their sales.

        ```bash
        npm install react-icons
        ```
        This library provides a collection of icons to use in this project. It was used for adding visual elements like buttons, navigation links, and more.

        ```bash
        npm install leaflet
        ```
        Leaflet is a library for interactive maps. It is used to display maps and geo-location features on the landing page of the application as well as in the checkout processing.

        ```bash
        npm install js-cookies
        ```
        js-cookies manages the cookies in the browser.

        ```bash
        npm install bootsrap
        ```
        Bootstrap framework for building responsive and modern web design.


## Starting the Program
In the project directory, you must run:

`node src/backend/server.js`
to enable backend functionalities such as handling requests, database connection, etc.

`npm start`
Runs the app in the development mode.

`npm test`
Launches the test runner in the interactive watch mode.\


## Folder Stucture for this Project

```bash
Kapetearria-web/
├── >node_modules
├── >public 
│   ├── >image           # The images used in this project resides in this file. 
│   └── >video           # The videos used in this project resides in this folder.
├── >src          # This folder contains all the files of source codes used for building this application.
│   ├── >backend  # This section resides the authentication part of the code.
│   ├── >components
│   │      └──  # This section has all the components and other sections of the web.
│   ├── App.css    # The style of App.js
│   └── App.js     # Main source code for the app.
```

## App.js and App.css
The App.Js file inside the src folder is where the main code of the program resides. It includes the header, the footer, the menu, etc.
The App.css is the style of the app.js. 

## Components Folder
The Components Folder is where the content of the app.js is located. All the files are coded here along with its corressponding design file (css).

## Database File
The Database file is named Kaperterria in a json file format. 
