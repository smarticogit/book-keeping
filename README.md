# Book Keeping Back

This frontend project was developed in Typescript, Prisma ORM and Docker with Postgres Database. <br>
The project is still in the development process as the initial idea was to create an MVP.

## Procedure for running the project

- Clone the code on your computer:

  ```sh
  git clone  https://github.com/smarticogit/book-keeping.git
  ```

- Access the book-keeping-front folder

  ```sh
  cd book-keeping
  ```

- Install dependency libraries

  ```sh
  npm install
  ```

- Add .env file to project root

  ```js
  NODE_ENV = dev
  S3_BUCKET_OCR = 
  AWS_REGION = 'us-east-1'
  AWS_ACCESS_KEY_ID = 
  AWS_SECRET_ACCESS_KEY = 
  DATABASE_URL ='postgresql://postgres:postgres@localhost:5432/postgres?schema=public'
  ```

- Confirm that the docker service is running
    ```sh
    docker ps
    ```

- Run docker with postgres database
    ```sh
    npm run db
    ```

- Configure migrations and schema with prism

  ```sh
  npm run prisma
  ```

- Run project

  ```sh
  npm run dev
  ```
  

  ### After performing the procedure, the service must be running on port 3333
