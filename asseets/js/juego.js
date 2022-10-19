
const miModulo = (() => {
    'Use strict'

    let deck    = [];
    const tipos = ['C', 'D', 'H', 'S'],
          especiales = ['A', 'J', 'Q', 'K'];
    let puntosJugador = 0;
    let puntosComputadora = 0;    

    //referencias del html
    const btnPedir              = document.querySelector('#btnPedir'),
          btnDetener            = document.querySelector('#btnDetener'),
          btnNuevo              = document.querySelector('#btnNuevo');

    const puntosHtml            = document.querySelectorAll('small'),
          divCartasJugador      = document.querySelector('#jugador-cartas'),
          divCartasJComputadora = document.querySelector('#computadora-cartas');
    //crea un nuevo deck

     const inicializarJuego = () => {
       deck = crearDeck();

    };

    const crearDeck = () =>{
        deck = [];
        for( let i = 2; i <= 10; i++){
            for( let tipo of tipos){
                deck.push( i + tipo);
            }
            
        }

        for(let tipo of tipos){
            for(let esp of especiales) {
                deck.push( esp + tipo);
            }
        }

        //console.log(deck);
              
        return _.shuffle( deck); 
    };

   

    //permite tomar una carta
   
    const pedirCarta = () =>{

        if (deck.length === 0 ) {
            throw 'No hay cartas en el deck';
        }
     
        return  deck.pop();
    };


    //pedirCarta();
    const valorCarta =  ( carta ) => {
        
        const valor = carta.substring(0, carta.length - 1);
        return ( isNaN( valor)) ?
                (valor === 'A') ? 11 : 10
                : valor *1; 

    };

    //turno de la computadora
    const turnoComputadora = ( puntosMinimos ) => {
        do {
            const carta = pedirCarta();
        
            puntosComputadora = puntosComputadora + valorCarta(carta);
            
            puntosHtml[1].innerHTML = puntosComputadora;

            const imgCarta = document.createElement('img');
            imgCarta.src = `asseets/cartas/${carta}.png`;
            imgCarta.classList.add('carta');
            divCartasJComputadora.append(imgCarta);
            
            if(puntosMinimos > 21) {
                break;
            }
        } while( (puntosComputadora < puntosMinimos) && (puntosMinimos < 21));


        setTimeout(() => {
            if( puntosComputadora === puntosMinimos) {
                alert('Nadie gana.');
            } else if( puntosMinimos > 21){
                alert('Computadora Gana.')
            } else if( puntosComputadora > 21){
                alert('Jugador Gana');
            } else if( puntosJugador === 21){
                alert('Jugador gana')
            } else if(puntosComputadora > puntosJugador){
                alert('Computadora gana');

            }
        }, 200);
    
    };




    //eventos
    btnPedir.addEventListener('click', () => {

        const carta = pedirCarta();
        
        puntosJugador = puntosJugador + valorCarta(carta);
        console.log(puntosJugador);
        puntosHtml[0].innerHTML = puntosJugador;
        const imgCarta = document.createElement('img');
        imgCarta.src = `asseets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugador.append(imgCarta);
    
        if (puntosJugador > 21) {
            console.warn('Perdiste');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);

        } else if  (puntosJugador === 21) {
            console.warn('Ganaste 21, Genial');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora();

        };
        });

        btnDetener.addEventListener('click', () => {
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        
        });

        btnNuevo.addEventListener('click', () => {

            console.clear();
            inicializarJuego();
            deck = crearDeck();
            puntosJugador = 0;
            puntosComputadora = 0;
            
            puntosHtml[0].innerText = puntosJugador;
            puntosHtml[1].innerText = puntosComputadora;
            
            divCartasJugador.innerHTML = '';
            divCartasJComputadora.innerHTML = '';
            
            btnPedir.disabled = false;
            btnDetener.disabled = false;
        
        
        });

        return {
            nuevoJuego:     inicializarJuego
        };

})();






