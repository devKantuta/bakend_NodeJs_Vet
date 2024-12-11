function calcularEdadMascota(fechaNacimiento) {
  // Convierte la fecha de nacimiento a un objeto Date
  const fechaNac = new Date(fechaNacimiento);
  const fechaActual = new Date();

  // Verifica que la fecha de nacimiento sea válida
  if (isNaN(fechaNac)) {
    console.error("La fecha proporcionada no es válida.");
    return null;
  }

  // Calcula la diferencia entre las fechas
  let edadAnios = fechaActual.getFullYear() - fechaNac.getFullYear();
  let edadMeses = fechaActual.getMonth() - fechaNac.getMonth();
  let edadDias = fechaActual.getDate() - fechaNac.getDate();

  // Ajusta el cálculo si los meses o días no han alcanzado el valor esperado
  if (edadMeses < 0) {
    edadAnios--;
    edadMeses += 12;
  }

  if (edadDias < 0) {
    edadMeses--;
    const ultimoDiaDelMes = new Date(
      fechaActual.getFullYear(),
      fechaActual.getMonth(),
      0
    ).getDate();
    edadDias += ultimoDiaDelMes;
  }

  // Retorna un objeto con la edad en años, meses y días
  return {
    anios: edadAnios,
    meses: edadMeses,
    dias: edadDias,
  };
}

// Ejemplo de uso:
/* const fechaNacimiento = "2018-07-15"; // Fecha de nacimiento de la mascota
const edadMascota = calcularEdadMascota(fechaNacimiento);
console.log(edadMascota); // Ejemplo de salida: { anios: 6, meses: 4, dias: 16 } */

export {
  calcularEdadMascota,
}