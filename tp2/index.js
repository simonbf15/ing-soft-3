const express = require("express");
const { Pool } = require("pg");

const app = express();
const port = process.env.PORT || 3000;

// Configuamos las variables de conexión a la base de datos
const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  port: process.env.DB_PORT || 5432,
});




app.get("/", (req, res) => {
  res.send(`
    <h1>Hola Mundo, desde la app para Ingenieria de Software 3!</h1>
    <p>Somos Simón y Vicente, un gusto saludarlos</p>
    <a href='/register'>Registrarse</a> | <a href='/login'>Login</a>
  `);
});

// Formulario de registro
app.get("/register", (req, res) => {
  res.send(`
    <h2>Registro de usuario</h2>
    <form method="POST" action="/register">
      <input name="username" placeholder="Usuario" required><br>
      <input name="password" type="password" placeholder="Contraseña" required><br>
      <button type="submit">Registrarse</button>
    </form>
    <a href='/login'>¿Ya tienes cuenta? Login</a>
  `);
});

// Formulario de login
app.get("/login", (req, res) => {
  res.send(`
    <h2>Login de usuario</h2>
    <form method="POST" action="/login">
      <input name="username" placeholder="Usuario" required><br>
      <input name="password" type="password" placeholder="Contraseña" required><br>
      <button type="submit">Ingresar</button>
    </form>
    <a href='/register'>¿No tienes cuenta? Registrarse</a>
  `);
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Ruta para registrar un usuario
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send("Faltan datos");
  }
  try {
    await pool.query(
      "INSERT INTO users (username, password) VALUES ($1, $2)",
      [username, password]
    );
    res.send("Usuario registrado exitosamente");
  } catch (err) {
    res.status(500).send("Error registrando usuario: " + err);
  }
});

// Ruta para login de usuario
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send("Faltan datos");
  }
  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE username = $1 AND password = $2",
      [username, password]
    );
    if (result.rows.length > 0) {
      res.send("Login exitoso");
    } else {
      res.status(401).send("Usuario o contraseña incorrectos");
    }
  } catch (err) {
    res.status(500).send("Error en login: " + err);
  }
});
app.get("/db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send("Error conectando a la DB: " + err);
  }
});

app.listen(port, () => {
  console.log(`App corriendo en puerto ${port}`);
});
