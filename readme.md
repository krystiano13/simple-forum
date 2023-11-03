<h1>Simple Forum Project</h1>

<h2>Technologies :</h2>
<h3>Frontend :</h3>
<ul>
    <li>QWIK</li>
    <li>Typescript</li>
    <li>HTML</li>
    <li>SCSS</li>
    <li>Self-made css framework</li>
</ul>
<h3>Backend :</h3>
<ul>
    <li>Laravel</li>
    <li>PHP</li>
    <li>MySQL</li>
</ul>

## Installation

<h2>Frontend</h2>
After downloading repo, navigate to 'client' folder using terminal. <br />
Then install dependencies with : <br />

```bash
  npm run install
```

After that, just run local server:  <br />

```bash
  npm run start
```

<h2>Backend</h2>

0. You need to have php and sql installed on your computer

1. Clone repository

2. Install npm and composer dependencies:

```bash
  npm install
  composer install
```

3. Create a copy of your .env file:

```bash
    cp .env.example .env
```

4. Generate an app encryption key

```bash
    php artisan key:generate
```

5. Create an empty database for our application
6. In the .env file, add database information to allow Laravel to connect to the database
7. Migrate the database

```bash
    php artisan migrate
```

8. Run Vite

```bash
    npm run dev
```
