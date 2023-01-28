//2C = 2 de Clubs (treboles)
//2D = 2 de Diaminds (diamantes)
//2H = 2 de Hearts (corazones)
//2S = 2 de Spades (espadas)

//PATRON MODULO
//es el que se hace con la funcion anonima autoinvocada y se ejecuta ni bien se carga la aplicacion o web. De esta forma no se puede acceder a la variable desde la consola del navegador

//funcion anonima autoinvocada
(() => {
    'use strict' //el uso estricto conviene habilitarlo al usar patron modulo

    
    let mazo = [];
    const tipos = ['C', 'D', 'H', 'S'];
    const especiales = ['A', 'J', 'Q', 'K'];

    let puntosJugador = 0;
    let puntosComputadora = 0;

    //Referencias del HTML
    const btnPedir = document.querySelector('#btnPedir');
    const btnDetener = document.querySelector('#btnDetener');
    const btnNuevo = document.querySelector('#btnNuevo');

    const divCartasJugador = document.querySelector('#jugador-cartas');
    const divCartasComputadora = document.querySelector('#computadora-cartas');


    const puntosHTML = document.querySelectorAll('small');

    //Esta funcion crea un nuevo mazo
    const crearMazo = () => {

        for (let i = 2; i <= 10; i++) {
            //mazo.push(i+'C')
            for (let tipo of tipos) {
                mazo.push(i + tipo)
            }
        }

        for (let tipo of tipos) {
            for (let esp of especiales) {
                mazo.push(esp + tipo)
            }
        }

        //console.log(mazo);
        mazo = _.shuffle(mazo);
        //console.log(mazo);

        return mazo;

    }


    crearMazo();

    //Esta funcion me permite tomar una carta

    const pedirCarta = () => {
        if (mazo.length === 0) {
            throw 'No hay cartas en el mazo'
        } else {
            let carta = mazo.shift();
            // console.log(carta);
            // console.log(mazo);
            return carta;
        }

    }


    //pedirCarta();

    const valorCarta = (carta) => {

        const valor = carta.substring(0, carta.length - 1); //de esta forma extraemos el ultimo valor del arreglo que se que es una letra y me quedo con el primero o primeros numeros

        return (isNaN(valor)) ?
            (valor === 'A') ? 11 : 10
            : parseInt(valor);

        //let puntos = 0;
        //console.log({valor})
        // if(isNaN(valor)){
        //     //no es un numero
        //     //console.log('no es un numero')
        //     puntos = (valor === 'A') ? 11 : 10;
        // }else{
        //     //es un numero
        //     //console.log('es un numero')
        //     puntos = parseInt(valor);
        // }
        // console.log(puntos);
    }

    // let valor = valorCarta(pedirCarta());
    // console.log({valor});


    //TURNO DE LA COMPUTADORA
    const turnoComputadora = (puntosMinimos) => {
        do {
            const carta = pedirCarta();
            puntosComputadora += valorCarta(carta);
            puntosHTML[1].innerText = puntosComputadora;

            const imgCarta = document.createElement('img');
            imgCarta.src = `assets/cartas/${carta}.png`;
            //imgCarta.className = 'carta';
            //Otra forma de agregar CLASS
            imgCarta.classList.add('carta');
            divCartasComputadora.append(imgCarta);

            if (puntosMinimos > 21) {
                break;
            }

        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

        setTimeout(() => {
            if ((puntosComputadora === puntosMinimos)) {
                alert('Nadie gana');
            } else if ((puntosMinimos > 21)) {
                alert('Computadora gana');
            } else if (puntosComputadora > 21) {
                alert('Jugador gana');
            } else {
                alert('Computadora gana');
            }
        }, 500);

    }


    //Eventos

    btnPedir.addEventListener('click', () => {

        const carta = pedirCarta();
        puntosJugador += valorCarta(carta);
        puntosHTML[0].innerText = puntosJugador;

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        //imgCarta.className = 'carta';
        //Otra forma de agregar CLASS
        imgCarta.classList.add('carta');

        divCartasJugador.append(imgCarta);

        if (puntosJugador > 21) {
            console.warn('Lo siento mucho, perdiste');
            btnPedir.disabled = true;
            turnoComputadora(puntosJugador);
        } else if (puntosJugador === 21) {
            console.warn('21, genial!');
            btnPedir.disabled = true;
            turnoComputadora(puntosJugador);
        }
    });

    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);

    });

    btnNuevo.addEventListener('click', () => {
        console.clear();

        puntosJugador = 0;
        puntosComputadora = 0;
        btnPedir.disabled = false;
        btnDetener.disabled = false;
        puntosHTML[0].innerText = 0;
        puntosHTML[1].innerText = 0;
        divCartasJugador.innerHTML = ``;
        divCartasComputadora.innerHTML = ``;
        mazo = [];

        crearMazo();
    });


    //turnoComputadora(15);

})();


// (function(){ ESTA FUNCION ES LA MISMA QUE LA DE ARRIBA EN FORMA

// })();



