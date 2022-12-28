# Calendar App

Keep up to date with all the events you have with your team with this calendar application.<br/>

Authentication is performed and verified with a backend created with `Express + NodeJS + TypeScript`.<br/>

On the other hand, `MongoDB` is used as the database and `Railway` is used as the infrastructure to deploy the backend.<br/>

## Tech Stack

**Frontend** 
<div aling=center>
  <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" title="TypeScript" alt="TypeScript"/>&nbsp;
  <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" title="ReactJS" alt="ReactJS"/>&nbsp;
  <img src="https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white" title="Redux" alt="Redux"/>&nbsp;
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" title="React Router" alt="React Router"/>&nbsp;
  <img src="https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white" title="MUI" alt="MUI"/>&nbsp;
</div>


**Backend**
<div aling=center>
  <img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB" title="Express" alt="Express"/>&nbsp;
  <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" title="NodeJS" alt="NodeJS"/>&nbsp;
</div>


**Database:**
<div>
  <img src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white" title="MongoDB" alt="MongoDB"/>&nbsp;
</div>


**Testing:**
<div aling=center>
  <img src="https://img.shields.io/static/v1?style=for-the-badge&message=Vitest&color=6E9F18&logo=Vitest&logoColor=FFFFFF&label=" title="Vitest" alt="Vitest"/>&nbsp;
  <img src="https://img.shields.io/badge/-TestingLibrary-%23E33332?style=for-the-badge&logo=testing-library&logoColor=white" title="Testing Library" alt="Testing Library"/>&nbsp;
</div>


**SaaS**
<div aling=center>
  <img src="https://img.shields.io/static/v1?style=for-the-badge&message=Railway&color=0B0D0E&logo=Railway&logoColor=FFFFFF&label=" title="Railway" alt="Railway"/>&nbsp;
</div>


## Screenshots

![App Screenshot](https://raw.githubusercontent.com/NastykSwED/calendar-app/master/src/assets/screenshot.png)


## Run Locally

Clone the project

```shell
  git clone https://github.com/NastykSwED/calendar-app
```

Go to the project directory

```shell
  cd calendar-app
```

Check if you are in the main/master branch

```shell
git branch
```

Install dependencies

```shell
  pnpm install
```

Start the Frontend Server

```shell
  pnpm run dev
```


## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file

```shell
VITE_MODE = #Your Vite_Mode here

VITE_API_URL = #Your localhost or backend_url here
```

## Running Tests

To run tests, run the following command

```shell
  pnpm run test
```
