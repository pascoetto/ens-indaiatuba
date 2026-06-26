const APP_URL="https://script.google.com/macros/s/AKfycbzkLLdAr8MgzFkn0-rIeN8eS8RnzuVDoEfxSEC1SjcVwh5jKOYDNjigvNVi3fVS9CAChg/exec";

const status=document.getElementById("status");

const progress=document.getElementById("progressBar");

let valor=0;

const timer=setInterval(()=>{

    valor+=5;

    progress.style.width=valor+"%";

    if(valor>=25){

        status.innerHTML="Verificando conexão...";

    }

    if(valor>=55){

        status.innerHTML="Preparando sistema...";

    }

    if(valor>=80){

        status.innerHTML="Abrindo sistema...";

    }

    if(valor>=100){

        clearInterval(timer);

        if(navigator.onLine){

            window.location.replace(APP_URL);

        }else{

            status.innerHTML="Sem conexão com a internet.";

        }

    }

},90);