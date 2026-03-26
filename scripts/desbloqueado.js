function achaCookie(nome) {
  const cookies = document.cookie.split("; ");
  
  for (let c of cookies) {
    const [chave, valor] = c.split("=");
    if (chave == nome) {
      return valor;
    }
  }
  
  return null;
}

window.onload = function() {
    const validacao = achaCookie("senha");
    if (validacao != "true") {
        window.alert("Acesso Negado!");
        window.location.href = "https://lgkpba.github.io/";
    }
    else {
        var mostrar = document.getElementById("oculto");
        mostrar.setAttribute("color", "#FFFFFF");
    }
}