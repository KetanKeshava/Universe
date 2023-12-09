# Universe - A Community App for Huskies

## INFO6150 Web Design & User Experience Engineering

## Project Overview

Welcome to **Universe - A Community App for Huskies**, a comprehensive web application designed and developed as part of the INFO6150 - Web Design & User Experience Engineering course. The project focuses on creating an engaging platform with advanced features, including user analytics, suggested connections, and a robust messaging system.

## Project Idea

The primary goal of Universe is to provide users with a feature-rich environment, combining analytics, user recommendations, and seamless communication. Admins can efficiently manage user accounts, analyze user engagement, and facilitate communication, creating a dynamic and interactive user experience.

## How to Run

To run the project locally, follow these steps:

1. Navigate to the backend directory:
    ```bash
    cd backend
    npm i
    npm run start
    ```

2. Navigate to the frontend directory:
    ```bash
    cd frontend
    npm i
    npm run dev
    ```

## Features

Key features of the Universe web application include:

1. **Mobile Responsive UI:** Ensures a seamless user experience across various devices.
2. **Admin and Users:** Distinguishes between administrator and user roles with specific functionalities.
3. **Landing, Login & Sign Up Pages:** Provides intuitive and secure onboarding experiences.
4. **Pages:** Includes Home, Profile, Update Profile, Post, and Message Pages for comprehensive user interaction.
5. **Password Encryption:** Utilizes bcrypt for secure password storage.
6. **Session Management:** Implements JSON Web Tokens (JWT) for efficient session handling.
7. **Data Consistency:** Maintains consistency in User, Posts, Message, and Conversation Models.
8. **End-to-End Transactions:** Ensures seamless transactions for both Admin and User workflows.
9. **3rd Party Libraries:** Integrates Chakra UI and Bootstrap for enhanced UI components.
10. **Frontend Framework:** Developed using React.
11. **Backend Tech:** Powered by Node.js & Express.js.
12. **External APIs:** Utilizes APIs from Hugging Face, Unsplash, OpenWeather.
13. **AWS Hosting:** Hosts the web application on AWS EC2 instances for scalability and availability.
14. **CRUD Operations:** Implements Create, Read, Update, and Delete operations for User & Posts.
15. **REST & MVC Architecture:** Follows a RESTful API design and adheres to the Model-View-Controller architecture.
16. **Git Branching:** Utilizes developer branches and functionality-based commits for effective version control.
17. **Documentation:** Includes inline comments and follows a consistent naming convention for clarity.
18. **Database Management:** Utilizes MongoDB, hosted on MongoDB Atlas, for efficient data storage and retrieval.

## External APIs Used

1. OpenWeather - Used to render the weather of the user's region.
2. Unsplash - USed to render background images in the Login/Signup
3. Hugging Face - Used to generate images with the power of AI.

## Getting Started

To get started with Universe, you can explore the repository and its various components:

- **Project Report:** For a detailed overview of the project, refer to the [Project Report](https://docs.google.com/document/d/16uCtWEbnUiWD0o3q7xTMjVFAZoUc0gQM2mhdDEJnSOA/edit?usp=sharing).

- **Architecture Diagram:** For a detailed overview of the system architecture, refer to the diagrams that are part of the Readme.

- **Code Snippets:** The repository includes code snippets that showcase the core components, including user accounts, posts and messaging. These components are the building blocks of Universe.

- **Presentation:** The final presentation can be found at [Project Presentation](https://www.canva.com/design/DAF2PKde1Ec/lrLR2bu9IgDO9X30mzOCIA/edit?utm_content=DAF2PKde1Ec&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton).


## Architecture: MERN Stack
![arch](https://github.com/KetanKeshava/Universe/assets/144740650/88afa712-437f-4b08-80b9-bc0a875696eb)

## Backend 
![be](https://github.com/KetanKeshava/Universe/assets/144740650/a5e35c39-6e64-46c0-864a-96e5a30619f2)

## Frontend
![fe](https://github.com/KetanKeshava/Universe/assets/144740650/c744579a-9204-4a85-84c5-6fe2937b4e3e)

## Folder Structure
![folder structure](https://github.com/KetanKeshava/Universe/assets/144740650/1ba7baec-c9a9-42ed-8901-e1ef87931704)

## Group 14
Amuktha Vaishnavi Kotamsetty,
Ketan Keshava,
Nagalekha Ramesh,
Ruchika Shashidhara.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

Feel free to explore and contribute to the Universe project. Happy coding!