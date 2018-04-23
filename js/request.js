// let axios = require('axios');
// let tabela;

// axios.get('http://localhost:3000/tbl_funcionario').then(function(resposta) {
//     console.log(resposta.data);
//     // console.log(resposta.headers);
//     // console.log(resposta.status);
//     // console.log(resposta.params);
// }).catch(function(error) {
//     if (error) {
//         console.log(error);
//     }
// });


// axios.post('http://localhost:300/tbl_funcionarios').then(function(resposta) {
//     console.log(resposta.data);
// }).catch(function(error) {
//     if (error) {
//         console.log(error);
//     }
// });

// console.log(url);
let nom = document.querySelector('#nomeP');

let url = 'http://localhost:3000/tbl_produto';

let dados;



function dadosFuncionario() {
    return axios.get(url);
}

dados = dadosFuncionario();

dados.then(function(resposta) {
    // console.log(resposta.data[1].nome_produto);
    nom.innerHTML = resposta.data[1].nome_produto;
    // console.log(nome);
}).catch(function(error) {
    if (error) {
        console.log(error);
    }
});
// console.log(dados);