[![Netlify Status](https://api.netlify.com/api/v1/badges/f3111054-18cd-4ff0-b955-4293a77a6135/deploy-status)](https://app.netlify.com/sites/live-nus/deploys)

# LiveNUS Frontend

React frontend for LiveNUS forum. Designed to be deployed with [LiveNUS Server](https://github.com/Jovin-Ang/LiveNUS-Server).

## Setup and installation

### Prerequisite

Ensure [LiveNUS Server](https://github.com/Jovin-Ang/LiveNUS-Server) is already deployed.
The frontend cannot function without its backend.

### Development

To get the React frontend running locally:

1. Clone this repo.
2. Copy example environment file `cp .env.example .env`
3. Edit the api server environment variable in `.env`.
4. `yarn install` to install all required dependencies.
5. `yarn start` to run the app in development mode.
6. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Deployment
The sits is deployed live at https://live-nus.netlify.app/

## Overview

This is the main file structure

```
.
├── node_modules
├── public
├── src
├── .env
├── README.md
├── tsconfig.json
├── package.json
├── .eslintrc.js
├── .prettierrc.js
└── yarn.lock
```

Main directories/files to note:

-   `src` includes LiveNUS frontend source code.
-   `.env` contains environment variables, for example, the api server address.
-   `.eslintrc.js` contains the configuration for ESLint.
-   `.prettierrc.js` contains the configuration for Prettier.

### Pages

| Page            | URI Pattern     | Detail                                                                                                                 |
|-----------------|-----------------|------------------------------------------------------------------------------------------------------------------------|
| Index           | /               | Landing page, lists all topics                                                                                         |
| New topic       | /new            | Form to create a new topic                                                                                             |
| Single topic    | /topic/:id      | Single topic view with comments, vote and like buttons.<br/>Edit and delete button will be shown for own topic/comment |
| Categories      | /categories     | Shows all categories in card format                                                                                    |
| Single category | /categories/:id | Single category view, lists all posts from that category                                                               |
| About           | /about          | About page, contains a short paragraph about the forum                                                                 |
| Login           | /login          | Landing page, lists all posts                                                                                          |
| Sign up         | /signup         | Landing page, lists all posts                                                                                          |

### Screenshots

![Landing Page](public/images/landing_guest.png)
![Topic Page](public/images/topic.png)
![Categories Page](public/images/categories.png)

## Issues

If you run into any issues, please open a new issue on the github repository

## Acknowledgements

This project was built upon [Sample React App](https://github.com/CVWO/sample-react-app).
This project uses [MUI](https://mui.com/),
[ESLint](https://eslint.org/), [Prettier](https://prettier.io/).
