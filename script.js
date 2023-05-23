const numbrs = document.querySelector(".div");
let c = 0;
botao(c);

// Gera os botões
function botao(i) {
    numbrs.innerHTML += `<button class=btn onclick=valor(this) value="${i}">${i}</button>`;
    if (i === 60) { return 0 };
    i++;
    return botao(i);
}

// Variaveis que foram usadas.
const valores = [];
const btnSalvar = document.querySelector(".btnSalvar");
const mensagem1 = document.querySelector(".mensagemAtingiuLimite");
const mensagem2 = document.querySelector(".mensagemQuantidadeInvalida");
const paragr = document.querySelectorAll("p")[2];

let countSalvas = 0;

// Sé o usuario clicar em salvar não podera alterar mais o seu bilhete
btnSalvar.addEventListener("click", () => {
    countSalvas++;
    if (c < 6) { mensagem2.style.display = "unset"; countSalvas-- }//Se o usuario tentar salvar com números abaixo do permitido
    else if (countSalvas === 1) {
        c = 999;
        let randomicos = [];
        let valoresGerados = 0;
        let copy = 0;

        for (let i = 0; i < 6; i++) {//Gerar um valor aleatorio.
            valoresGerados = parseInt(Math.random() * 60);
            copy = randomicos.indexOf(valoresGerados);
            if (copy != -1) { randomicos.splice(copy, 1); i -= 2; }//Caso o valor for repetido.
            else { randomicos.push(valoresGerados); }
        }

        let pontos = 0;

        for (const i of randomicos) {//Usando o metodo Bubble Sort para comparação de arrays
            for (const j of valores) {
                if (i == j) {
                    pontos++;
                }
            }
        }

        //Resultados
        paragr.innerHTML = `Números premiador <br>`;
        paragr.innerHTML += randomicos.join('-');
        pontos === 6 ? paragr.innerHTML += `Ganhador` : paragr.innerHTML += `<br>Você fez apenas ${pontos} pontos.</br>`;

        btnSalvar.style.display = "none";
    }
});

// Gravar no array os valores que foram selecionado
function valor(i) {
    const valor = i.value;
    const encontrado = valores.indexOf(valor);
    const mostraArray = document.querySelector(".mostraArray");

    if (encontrado > -1 && c < 999) { //Caso o cliente clique no mesmo botão ele e retirado do array
        valores.splice(encontrado, 1);
        i.style.background = "none";
        i.style.color = "#686de0";
        mostraArray.innerHTML = valores.join('-');//Atualização do documento na mesma hora.
        c--;
        if (c < 6) {
            btnSalvar.style.display = "none";
        }
        return c;
    } else {
        if (c < 15) {
            valores.push(valor);
            i.style.background = "orange";
            i.style.color = "black";
            c++;
            if (c >= 6) {
                btnSalvar.style.display = "unset";
            }
        }
        //Manda as mensagens de possíveis erros.
        else if (c === 999) { mensagem1.style.opacity = 0; }
        else if (c < 999) { mensagem1.style.opacity = 1; }
    }

    //Atualização do documento na mesma hora.
    mostraArray.innerHTML = valores.join('-');
}
