import imprimiCotacao from "./imprimiCotacao.js";

const graficoDolar = document.getElementById('graficoDolar');

const graficoParaDolar = new Chart(graficoDolar, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Dólar',
            data: [],
            borderWidth: 1
        }]
    },
});

function geraHorario() {
    let data = new Date();
    let horario = data.getHours() + ":" + data.getMinutes() + ":" + data.getSeconds();
    console.log(horario);
    return horario;
}

function adicionarDados(grafico, legenda, dados) {
    grafico.data.labels.push(legenda);
    grafico.data.datasets.forEach((dataset) => {
        dataset.data.push(dados);
    })
    grafico.update();
}


let workerDolaar = new Worker('./js/workers/workerDolar.js');
workerDolaar.postMessage('usd');


workerDolaar.addEventListener("message", event => {
    let tempo = geraHorario()
    let valor = event.data.ask;
    imprimiCotacao("dolar",valor);
    adicionarDados(graficoParaDolar,tempo,valor)
})


const graficoIene = document.getElementById('graficoIene');
const graficoParaIene = new Chart(graficoIene, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Iene',
            borderWidth: 1
        }]
    }
})