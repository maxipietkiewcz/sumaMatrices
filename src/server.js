// Importar Express y crear una aplicación Express
import express from "express";
const app = express();

// Importar body-parser para analizar cuerpos de solicitud HTTP y cors para manejar CORS
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";

// Importar el módulo path para trabajar con rutas de archivos y directorios
import { fileURLToPath } from "url";
import { dirname } from "path";

// Obtener __dirname en un módulo ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configurar Express para servir archivos estáticos
app.use(express.static(path.join(__dirname, "../public")));

// Importar el módulo sumarMatrices para la lógica de suma de matrices
import { sumarMatrices } from "./sumarMatrices.js";

// Configurar Express para usar body-parser y cors
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Ruta para servir el archivo HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Ruta para sumar matrices
app.post("/sumar_matrices", (req, res) => {
  // Obtener las matrices de la solicitud
  const { matrix1, matrix2 } = req.body;

  // Verificar si las matrices están presentes en la solicitud
  if (!matrix1 || !matrix2) {
    res.status(400).send("Las matrices son requeridas");
    return;
  }

  try {
    // Sumar las matrices
    const resultMatrix = sumarMatrices(matrix1, matrix2);

    // Enviar el resultado como JSON
    res.json(resultMatrix);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Iniciar el servidor en el puerto 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
