// Función para crear inputs de una matriz dada su cantidad de filas y columnas
function crearInputs(idDiv, filas, columnas) {
  let div = document.getElementById(idDiv);
  div.innerHTML = "";

  for (let i = 0; i < filas; i++) {
    let fila = document.createElement("div");

    for (let j = 0; j < columnas; j++) {
      let input = document.createElement("input");
      input.type = "number";
      input.name = `${idDiv}[${i}][${j}]`; // Nombre del input para identificar su posición en la matriz
      fila.appendChild(input);
    }

    div.appendChild(fila);
  }
}

// Función para generar los inputs de las matrices
function generarMatrices() {
  let filas1 = parseInt(document.getElementById("filas1").value);
  let columnas1 = parseInt(document.getElementById("columnas1").value);

  crearInputs("matrix1", filas1, columnas1);

  let filas2 = parseInt(document.getElementById("filas2").value);
  let columnas2 = parseInt(document.getElementById("columnas2").value);

  crearInputs("matrix2", filas2, columnas2);
}

// Función para enviar las matrices al servidor y mostrar el resultado
function enviarMatrices() {
  let matrix1 = [];
  let matrix2 = [];

  // Obtener los valores de la matriz 1
  document.querySelectorAll("#matrix1 input").forEach((input) => {
    matrix1.push(parseInt(input.value));
  });

  // Obtener los valores de la matriz 2
  document.querySelectorAll("#matrix2 input").forEach((input) => {
    matrix2.push(parseInt(input.value));
  });

  // Convertir los arreglos planos en matrices bidimensionales
  matrix1 = convertirAMatriz(
    matrix1,
    parseInt(document.getElementById("filas1").value),
    parseInt(document.getElementById("columnas1").value)
  );
  matrix2 = convertirAMatriz(
    matrix2,
    parseInt(document.getElementById("filas2").value),
    parseInt(document.getElementById("columnas2").value)
  );

  // Preparar los datos para enviar al servidor
  const data = {
    matrix1: matrix1,
    matrix2: matrix2,
  };

  // Enviar los datos al servidor usando fetch
  fetch("http://localhost:5000/sumar_matrices", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((resultMatrix) => {
      mostrarResultado(resultMatrix);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Función para mostrar el resultado de la suma de matrices en la página
function mostrarResultado(resultMatrix) {
  let resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "<h2>Resultado:</h2>";

  let table = document.createElement("table");
  for (let i = 0; i < resultMatrix.length; i++) {
    let row = document.createElement("tr");
    for (let j = 0; j < resultMatrix[i].length; j++) {
      let cell = document.createElement("td");
      cell.textContent = resultMatrix[i][j];
      row.appendChild(cell);
    }
    table.appendChild(row);
  }
  resultDiv.appendChild(table);
}

// Función para convertir un arreglo plano en una matriz bidimensional
function convertirAMatriz(arr, rows, cols) {
  let matrix = [];
  for (let i = 0; i < rows; i++) {
    matrix.push(arr.slice(i * cols, (i + 1) * cols));
  }
  return matrix;
}
