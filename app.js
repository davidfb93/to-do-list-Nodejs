require ('colors');

const { guardarDB, leerDB } = require('./helpers/guardar-archivo');
const { inquirerMenu, 
        pausa,
        leerInput, 
        listadoTareasBorrar,
        confirmar,
        mostrarListadoChecklist,
} = require('./helpers/inquirer');

const Tareas = require('./models/tareas');


const main = async () => {

    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if( tareasDB ) { // cargar tareas
        tareas.cargarTareasFromArray( tareasDB );
    }

    do {
        opt = await inquirerMenu(); // mostrar menu

        switch (opt) {
            case '1':
                // crear opcion
                const desc = await leerInput('Descripción: ');
                tareas.crearTarea( desc );
            break;
            case '2':
                tareas.listadoCompleto();
            break; 
            case '3': // Listar completadas
                tareas.listarPendientesCompletadas();
            break;    
            case '4':// Listar pendientes
                tareas.listarPendientesCompletadas( false );
            break;    
            case '5':// Completar tarea(s)
                const ids = await mostrarListadoChecklist( tareas.listadoArr );
                tareas.toggleCompletadas( ids );
            break;      
            case '6':// Listar pendientes
                const id = await listadoTareasBorrar( tareas.listadoArr );
                if ( id !== '0' ) {
                    const ok = await confirmar('¿Está seguro de eliminar la tarea?');
                    if ( ok ) {
                        tareas.borrarTarea( id );
                        console.log('Tarea borrada'.white.bgRed);
                    }
                }
            break;       
        }

        guardarDB( tareas.listadoArr )


        await pausa();

    } while ( opt !== '0' );
}


main();