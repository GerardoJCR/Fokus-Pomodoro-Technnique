let html = document.querySelector('html');
let btnCorto = document.querySelector('.app__card--short');
let btnLargo = document.querySelector('.app__card--large')
let btnEnfoque = document.querySelector('.app__card--enfoque')
let banner = document.querySelector('.app__image');
let titulo = document.querySelector('.app__title');
let botones = document.querySelectorAll('.app__card-button');
let musica = new Audio('sonidos/luna-rise-part-one.mp3');
let btnMusic = document.querySelector('#alternar-musica');
let btnStartPause = document.querySelector('#start-pause');
let textoIniciarPausar = document.querySelector('#start-pause span');
let IconPausePlay = document.querySelector('.app__card-primary-butto-icon');
let tiempoPantalla = document.querySelector('#timer');

const sonidoPause = new Audio('sonidos/pause.mp3');
const sonidoFinal = new Audio('sonidos/beep.mp3');
const sonidoPlay = new Audio('sonidos/play.wav');

let TiempoTranscurridoSegundos = 1500;
let idIntervalo = null;



musica.loop= true; // musica ilimitadamente

btnMusic.addEventListener('change', function(){
    if(musica.paused)
    musica.play();
    else{
        musica.pause();
    }
})

function CambiarContexto(contexto){

    botones.forEach(function(contexto){
        contexto.classList.remove('active');
        // console.log(contexto);
    })
 

    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src',`imagenes/${contexto}.png`)

    switch (contexto) {

        case 'descanso-corto':
            titulo.innerHTML = `
            <h1 class="app__title">¿Qué tal tomar un respiro?<br>   
                <strong class="app__title-strong">¡Haz una pausa corta!</strong>
            </h1>
            `
            break;
    
        case 'enfoque': 
            titulo.innerHTML = `
            <h1 class="app__title">Optimiza tu productividad,<br> 
                <strong class="app__title-strong">sumérgete en lo que importa.</strong>
            </h1>
            `
        break;
            case 'descanso-largo': 
            titulo.innerHTML = `
            <h1 class="app__title">Hora de volver a la superficie,<br> 
                <strong class="app__title-strong">Haz una pausa larga.</strong>
            </h1>
            `
        default:
            break;
    }

}


btnCorto.addEventListener('click', function(){
    TiempoTranscurridoSegundos = 300;
    mostrarTiempo();    
    CambiarContexto('descanso-corto');
    btnCorto.classList.add('active')  
})

btnLargo.addEventListener('click',function(){
    TiempoTranscurridoSegundos = 900;
    mostrarTiempo()
    CambiarContexto('descanso-largo');    
    btnLargo.classList.add('active')  
})

btnEnfoque.addEventListener('click', function(){
    TiempoTranscurridoSegundos = 1500;
    mostrarTiempo()
    CambiarContexto('enfoque');
    btnEnfoque.classList.add('active')  
})


//Temporizador 

const cuentaRegresiva = function(){
    
    if(TiempoTranscurridoSegundos == 0){
        pause();
        sonidoFinal.play();
        alert("Se acabo el tiempo bro")
        return; //para interrumpir el flujo 
        
    }
    IconPausePlay.setAttribute('src','imagenes/pause.png')
    textoIniciarPausar.innerText = 'Pausar';
    TiempoTranscurridoSegundos--;
    // console.log(`Temporizador: ${TiempoTranscurridoSegundos}`);
    mostrarTiempo();
}

btnStartPause.addEventListener('click', iniciarPausar)



function iniciarPausar(){
    if(idIntervalo){ //Si tiene algun numero o esta en ejecucuion
        pause();
        IconPausePlay.setAttribute('src','imagenes/play_arrow.png')
        textoIniciarPausar.textContent = 'Comenzar';
        return;
    }else{
        sonidoPlay.play()
    }

    idIntervalo = setInterval(cuentaRegresiva,1000)
}

function pause(){
    
    sonidoPause.play();
    clearInterval(idIntervalo);
    idIntervalo = null
}

//Mostrar el tiempo

function mostrarTiempo(){
    const tiempo = new Date(TiempoTranscurridoSegundos *1000 ) ;
    const tiempoFormateado = tiempo.toLocaleTimeString(`es-MX`, {minute:"2-digit", second:"2-digit"})
    tiempoPantalla.innerHTML = `${tiempoFormateado}`;
}   

mostrarTiempo()

