function toast(texto){

    const t=document.getElementById("toast");

    t.innerHTML=texto;

    t.classList.add("show");

    setTimeout(()=>{

        t.classList.remove("show");

    },3000);

}
function atualizarStatus(){

const status=document.getElementById("statusInternet");

if(!status) return;

if(navigator.onLine){

status.innerHTML="🟢 Online";

status.className="online";

}else{

status.innerHTML="🔴 Offline";

status.className="offline";

}

}

window.addEventListener("online",atualizarStatus);

window.addEventListener("offline",atualizarStatus);

window.onload=atualizarStatus;