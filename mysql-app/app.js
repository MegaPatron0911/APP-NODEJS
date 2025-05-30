const mysql = require('mysql');

// Configuración de la conexión
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,  
    user: 'oswal',
    password: 'tuputamadre0911',
    database: 'parkinglot',
});

// Conectar a la base de datos
connection.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos: ' + err.message);
        return;
    }
    console.log('Conectado a la base de datos MySQL, threadId:', connection.threadId);
    // Ejecutar consulta de selección
    ejecutarConsulta();
});

function ejecutarConsulta() {
    const query = 'SELECT * FROM perfil_usuario LIMIT 10'; // Cambia por tu consulta

    connection.query(query, (err, results, fields) => {
        if (err) {
            console.error('Error ejecutando la consulta: ' + err.message);
            return;
        }

        console.log('\n=== Resultado de la consulta ===');
        console.log('Número de registros consultados:', results.length);
        console.log('\nDatos:');

        results.forEach((row, index) => {
            console.log('Registro ' + (index + 1) + ':');
            console.log(row);
        });

        // Cerrar la conexión
        connection.end((err) => {
            if (err) {
                console.error('Error cerrando la conexión: ' + err.message);
                return;
            }
            console.log('Conexión a la base de datos cerrada.');
        });
    });
}

// Manejar errores de conexión
connection.on('error', (err) => {
    console.error('Error en la conexión: ' + err.message);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.error('Conexión perdida, reconectando...');
        
    } else {
        throw err;
    }
});
