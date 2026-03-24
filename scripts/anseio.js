//se vc está vendo isto, vc está acabando com a graça. n entre aqui.
function verificaSenha(){
    var texto = document.getElementById("senha");
    var tentativa = texto.value;
    texto.value = ""

    if (tentativa == "teste"){
        window.alert("Algum dia algo vai acontecer aqui")
    }
}