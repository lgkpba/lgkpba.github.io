//se vc está vendo isto, vc está acabando com a graça. n entre aqui.
function verificaSenha(){
    var texto = document.getElementById("senha");
    var tentativa = parseInt(texto.value);
    texto.value = ""

    if (Number(tentativa).toString(2) == "10111010100001100011001"){
        document.cookie = "senha=true; path=/; Secure; SameSite=Strict";
        window.location.href = "https://lgkpba.github.io/anseio/desbloqueado/";
    }
}