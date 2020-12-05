const { io } = require('../index');
const { comprobarJWT } = require('../helpers/jwt');
const { usuarioConectado, usuarioDesconectado, grabarMensaje } = require('../controllers/socket');

// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    const [ valido, uid ] = comprobarJWT( client.handshake.headers['x-token'] )

    // verificar autenticación
    if( !valido ) { return client.disconnect(); }

    usuarioConectado( uid );

    // meterlo en una sala para enviar especificamente a este cliente
    client.join( uid );

    // Escuchar evento
    client.on('mensaje-personal', async( payload ) => {
        // console.log(payload);
        await grabarMensaje( payload );

        io.to( payload.para ).emit('mensaje-personal', payload);
    });

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
        usuarioDesconectado( uid );
    });

    // client.on('mensaje', ( payload ) => {
    //     console.log('Mensaje', payload);
    //     io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );
    // });
});
