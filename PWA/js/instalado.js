toast("Aplicativo instalado com sucesso!");

const btn=document.getElementById("closeButton");

btn.onclick=()=>{

    window.open("","_self");

    window.close();

}