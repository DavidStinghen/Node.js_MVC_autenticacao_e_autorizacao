// função com evento de clique para deletar um livro do banco de dados

// selecionar a tabelade livros
let tabelaLivros = document.querySelector('#livros');
// adicionar na tabela um evendo de ouvinte para (click)
tabelaLivros.addEventListener('click', (evento) => {
// pegar o evendo gerado e o elemento clicado
    let elementoClicado = evento.target;

// bloco if, verifica se o elemento clicado tem o data-type == remoção
    if (elementoClicado.dataset.type == 'remocao') {
// se o elemento clicado tiver o data-type == remoção é pegado o seu data-ref juntamente com o id
        let livroId = elementoClicado.dataset.ref;
// é feita uma requisição assincrona (AJAX) com a fetch api para a URL para (/livro/ id do livro) com o metodo DELETE
        fetch(`http://localhost:3000/livros/${livroId}`, { method: 'DELETE' })
// caso tudo ocorra corretamente a fetch api devolve a resposta como uma promise
            .then(resposta => {

// como resposta a promise o item com o id selecionado é removido
                let tr = elementoClicado.closest(`#livro_${livroId}`);
                tr.remove();
            })
// caso haja algum erro o metodo cai no bloco catch e mostra o erro no consoles
            .catch(erro => console.log(erro));

    }

});