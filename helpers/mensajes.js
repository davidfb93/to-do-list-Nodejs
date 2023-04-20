require ('colors');

const mostrarMenu = () => {

    return new Promise( resolve => {
        console.clear();
        console.log('=========================='.rainbow);
        console.log('--------TO-DO LIST--------'.cyan);
        console.log('=========================='.rainbow);
        console.log('   Seleccione una opción   '.cyan);
        console.log('==========================\n'.rainbow);
    
        console.log(`${ '1.'.blue.bold }  Crear tarea`);
        console.log(`${ '2.'.blue.bold }  Listar tareas`);
        console.log(`${ '3.'.blue.bold }  Listar tareas completadas`);
        console.log(`${ '4.'.blue.bold }  Listar tareas pendientes`);
        console.log(`${ '5.'.blue.bold }  Completar tarea(s)`);
        console.log(`${ '6.'.blue.bold }  Borrar tarea`);
        console.log(`${ '0.'.blue.bold }  Salir\n`);
    
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })
    
        readline.question('Seleccione una opción: ', ( opt ) => {
            readline.close();
            resolve( opt );
        })

    });
}

const pausa = () => {

    return new Promise( resolve => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })
    
        readline.question(`\nPresione ${ 'ENTER'.blue.bold } para continuar\n`, ( opt ) => {
            readline.close();
            resolve();
        })
    });
}

module.exports = {
    mostrarMenu,
    pausa
}


