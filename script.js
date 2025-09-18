// Função básica para rolar qtd dados com faces
function rolarDados(qtd, faces) {
  let resultados = [];
  for (let i = 0; i < qtd; i++) {
    resultados.push(Math.floor(Math.random() * faces) + 1);
  }
  return resultados;
}

// Parse da expressão em objetos
function parseExpressao(expr) {
  let partes = expr.replace("-", "+-").split("+");
  let lista = [];
  for (let p of partes) {
    if (p.includes("d")) {
      let [qtd, faces] = p.split("d");
      lista.push({ tipo: "dado", qtd: parseInt(qtd), faces: parseInt(faces) });
    } else if (p.trim() !== "") {
      lista.push({ tipo: "constante", valor: parseInt(p) });
    }
  }
  return lista;
}

// Simulação normal: soma todos os valores
function simularSoma(vezes, expressoes) {
  let resultados = [];
  for (let i = 0; i < vezes; i++) {
    let total = 0;
    for (let item of expressoes) {
      if (item.tipo === "dado") {
        total += rolarDados(item.qtd, item.faces).reduce((a,b)=>a+b,0);
      } else {
        total += item.valor;
      }
    }
    resultados.push(total);
  }
  return resultados.reduce((a,b)=>a+b,0)/resultados.length;
}

// Simulação “maior do primeiro grupo”
function simularMaiorDoPrimeiro(vezes, expressoes) {
  if (expressoes.length === 0) return 0;
  let resultados = [];
  for (let i = 0; i < vezes; i++) {
    let total = 0;
    for (let j=0;j<expressoes.length;j++) {
      let item = expressoes[j];
      if (item.tipo === "dado") {
        let rolls = rolarDados(item.qtd, item.faces);
        if (j===0) total += Math.max(...rolls); // primeiro grupo → pega o maior
        else total += rolls.reduce((a,b)=>a+b,0); // demais grupos → soma normal
      } else {
        total += item.valor;
      }
    }
    resultados.push(total);
  }
  return resultados.reduce((a,b)=>a+b,0)/resultados.length;
}

// Funções ligadas aos botões
function calcularSoma() {
  let expr = document.getElementById("expressao").value;
  let lista = parseExpressao(expr);
  let media = simularSoma(100, lista);
  document.getElementById("resultado").innerText = "Resultado: " + media.toFixed(1);
}

function calcularMaior() {
  let expr = document.getElementById("expressao").value;
  let lista = parseExpressao(expr);
  let media = simularMaiorDoPrimeiro(100, lista);
  document.getElementById("resultado").innerText = "Resultado: " + media.toFixed(1);
}

