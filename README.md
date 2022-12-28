# Calendar Backend

This backend has all the necessary configuration to connect to the database and create and register the different `users` and `events`.<br/>

`MongoDB` has been used as database.<br/>

## Tech Stack

**Backend**
<div aling=center>
  <img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB" title="Express" alt="Express"/>&nbsp;
  <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" title="NodeJS" alt="NodeJS"/>&nbsp;
</div>


**Database:**
<div>
  <img src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white" title="MongoDB" alt="MongoDB"/>&nbsp;
</div>


**SaaS**
<div aling=center>
  <img src="https://img.shields.io/static/v1?style=for-the-badge&message=Railway&color=0B0D0E&logo=Railway&logoColor=FFFFFF&label=" title="Railway" alt="Railway"/>&nbsp;
</div>


## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file

```shell
PORT = #Your port here

DB_CNN = #Your database_url here

SECRET_JWT_SEED = #Your secret_JWT_seed here
```


## Run Locally

Clone the project

```shell
  git clone https://github.com/NastykSwED/calendar-app
```

Go to the project directory

```shell
  cd calendar-app
```

Check if you are in the backend branch

```shell
git branch
```

If you are not in it, select it  

```shell
git branch -a
```

Install dependencies

```shell
  pnpm install
```

Start the Backend Server

```shell
  pnpm run dev
```
