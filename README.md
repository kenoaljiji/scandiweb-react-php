<h1>Scandiweb Test Assignment</h1>

<p>This project is a test assignment for Scandiweb. It consists of a PHP backend and a React frontend. The backend provides API endpoints and handles database interactions, while the frontend is a user interface that communicates with the backend.</p>

<h4>Backend Setup</h4>

<h5>Prerequisites</h5>
<ul>
  <li>PHP 7.4 or higher</li>
  <li>Composer</li>
</ul>

<h5>Installation</h5>
<ol>
  <li>Navigate to the backend directory:
    <pre><code>cd backend</code></pre>
  </li>
  <li>Install dependencies using Composer:
    <pre><code>composer install</code></pre>
  </li>
  <li>Set up environment variables (optional):
    <ul>
      <li>The backend uses the Symfony Dotenv component to load environment variables from a <code>.env</code> file.</li>
      <li>If no <code>.env</code> file is provided, default values will be used for database configuration.</li>
    </ul>
    Example <code>.env</code> file:
    <pre><code>DB_HOST=your_db_host
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name</code></pre>
  </li>
  <li>Import Data (required if using a custom <code>.env</code> database):
    <ul>
      <li>If you are using a custom database configuration in your <code>.env</code> file, you must import the initial data before running the backend.</li>
    </ul>
    Run the following script to import the data:
    <pre><code>php scripts/import_data.php</code></pre>
  </li>
  <li>Run the backend server:
    <pre><code>php -S localhost:8000 -t public</code></pre>
  </li>
  <li>Test the database connection (optional):
    <ul>
      <li>If you have set up a <code>.env</code> file, you can test the database connection by running:</li>
    </ul>
    <pre><code>php public/test_db_connection.php</code></pre>
    <ul>
      <li>This script will attempt to connect to the database using the credentials provided in the <code>.env</code> file or the default values.</li>
    </ul>
  </li>
</ol>

<h4>Frontend Setup</h4>

<h5>Prerequisites</h5>
<ul>
  <li>Node.js and npm</li>
</ul>

<h5>Installation</h5>
<ol>
  <li>Navigate to the frontend directory:
    <pre><code>cd frontend</code></pre>
  </li>
  <li>Install dependencies using npm:
    <pre><code>npm install</code></pre>
  </li>
  <li>Run the frontend application:
    <pre><code>npm run start</code></pre>
  </li>
</ol>

<h4>Notes</h4>
<ul>
  <li>The backend defaults to a preconfigured database if no <code>.env</code> file is provided. If you wish to use your own database, ensure the <code>.env</code> file is correctly set up and remember to import the initial data.</li>
  <li>The frontend and backend should be run separately. The frontend will make requests to the backend API.</li>
</ul>

<h4>Conclusion</h4>
<p>This project demonstrates a fullstack application with a PHP backend and a React frontend. Follow the instructions above to set up and run both parts of the application.</p>
