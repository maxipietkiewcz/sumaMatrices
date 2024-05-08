// Función para sumar dos matrices
export function sumarMatrices(matrix1, matrix2) {
  // Verificar que las matrices tengan las mismas dimensiones
  if (
    matrix1.length !== matrix2.length ||
    matrix1[0].length !== matrix2[0].length
  ) {
    throw new Error("Las matrices deben tener la misma dimensión");
  }

  // Inicializar una matriz para almacenar el resultado de la suma
  const resultMatrix = [];

  // Sumar las matrices
  for (let i = 0; i < matrix1.length; i++) {
    resultMatrix[i] = [];
    for (let j = 0; j < matrix1[i].length; j++) {
      resultMatrix[i][j] = parseInt(matrix1[i][j]) + parseInt(matrix2[i][j]);
    }
  }

  return resultMatrix;
}
