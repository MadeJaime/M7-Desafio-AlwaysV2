const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres', 
  host: 'localhost',
  database: 'estudiantesbd',
  password: '110580', 
  port: 5432,
});

// agregar un nuevo estudiante
async function agregarEstudiante({ nombre, rut, curso, nivel }) {
  const query = {
    text: 'INSERT INTO estudiantes (nombre, rut, curso, nivel) VALUES ($1, $2, $3, $4)',
    values: [nombre, rut, curso, nivel],
  };
  try {
    await pool.query(query);
    console.log('Estudiante agregado correctamente');
  } catch (err) {
    console.error('Error al agregar estudiante:', err);
  }
}

//consultar un estudiante por rut
async function consultarEstudiantePorRut({ rut }) {
  const query = {
    text: 'SELECT * FROM estudiantes WHERE rut = $1',
    values: [rut],
  };
  try {
    const res = await pool.query(query);
    console.log('Estudiante:', res.rows[0]);
  } catch (err) {
    console.error('Error al consultar estudiante:', err);
  }
}

// consultar todos los estudiantes
async function consultarTodosLosEstudiantes() {
  const query = {
    text: 'SELECT * FROM estudiantes',
  };
  try {
    const res = await pool.query(query);
    console.log('Estudiantes:', res.rows);
  } catch (err) {
    console.error('Error al consultar estudiantes:', err);
  }
}

// editar un estudiante
async function editarEstudiante({ nombre, rut, curso, nivel }) {
  const query = {
    text: 'UPDATE estudiantes SET nombre = $1, curso = $2, nivel = $3 WHERE rut = $4',
    values: [nombre, curso, nivel, rut],
  };
  try {
    await pool.query(query);
    console.log('Estudiante actualizado correctamente');
  } catch (err) {
    console.error('Error al actualizar estudiante:', err);
  }
}

// eliminar un estudiante
async function eliminarEstudiante({ rut }) {
  const query = {
    text: 'DELETE FROM estudiantes WHERE rut = $1',
    values: [rut],
  };
  try {
    await pool.query(query);
    console.log('Estudiante eliminado correctamente');
  } catch (err) {
    console.error('Error al eliminar estudiante:', err);
  }
}

// Interacción 
const [,, action, ...args] = process.argv;

(async () => {
  try {
    switch (action) {
      case 'agregar':
        await agregarEstudiante({
          nombre: args[0],
          rut: args[1],
          curso: args[2],
          nivel: parseInt(args[3])
        });
        break;
      case 'consultar':
        await consultarEstudiantePorRut({ rut: args[0] });
        break;
      case 'consultar-todos':
        await consultarTodosLosEstudiantes();
        break;
      case 'editar':
        await editarEstudiante({
          nombre: args[0],
          rut: args[1],
          curso: args[2],
          nivel: parseInt(args[3])
        });
        break;
      case 'eliminar':
        await eliminarEstudiante({ rut: args[0] });
        break;
      default:
        console.log('Acción no reconocida. Usa: agregar, consultar, consultar-todos, editar, eliminar');
    }
  } catch (err) {
    console.error('Error en la aplicación:', err);
  } finally {
    await pool.end();
  }
})();
