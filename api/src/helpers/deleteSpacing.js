exports.deleteSpacing = (value) => {

  let valor = value.trim();

  while (valor.includes(" ")) {
    valor = valor.replace(" ", "_");
    console.log(valor);
  }

  return valor.toLowerCase();
}