const inputTexto = document.querySelectorAll('.principal-input')[0]
const blocoTarefas = document.querySelectorAll('.tarefas')[0]
const footer = document.querySelectorAll('.container-footer span')[0]
const botaoRemover = document.getElementById('remover')
let tarefasTotal = 0
let tarefasConcluidas = 0
let setId = 0
let usados = []

class Item {
    constructor(tarefa, id) {
        this.criarDiv(tarefa),
        this.id = id
    }

    criarDiv(tarefa) {
        const div = document.createElement('div')

        const caixa = document.createElement('input')
        caixa.type = 'button'
        caixa.value = ''
        caixa.onclick = () => {
            div.classList.toggle('marcado')
            adcionarConcluido(this.id, div)
        }

        const tarefaTexto = document.createElement('input')
        tarefaTexto.type = 'text'
        tarefaTexto.disabled = true
        tarefaTexto.value = tarefa
        tarefaTexto.addEventListener('focusout', (e) => e.target.disabled = true)

        const botaoEditar = document.createElement('input')
        botaoEditar.type = 'button'
        botaoEditar.value = 'Editar'
        botaoEditar.onclick = () => tarefaTexto.disabled = false

        div.appendChild(caixa)
        div.appendChild(tarefaTexto)
        div.appendChild(botaoEditar)

        blocoTarefas.appendChild(div)
    }
}

function adicionarTarefa() {
    tarefasTotal += 1
    footer.innerHTML = `${tarefasConcluidas}/${tarefasTotal} tarefas concluidas!`
}

function adcionarConcluido(id, div) {
    if (div.classList == 'marcado') {
        tarefasConcluidas += 1
        footer.innerHTML = `${tarefasConcluidas}/${tarefasTotal} tarefas concluidas!`
    } else {
        tarefasConcluidas -= 1
        footer.innerHTML = `${tarefasConcluidas}/${tarefasTotal} tarefas concluidas!`
    }
}

// -----------------------------------------------------//

inputTexto.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        let input = e.target
        new Item(input.value, setId)
        adicionarTarefa()
        setId += 1
        input.value = ''
    }
})

botaoRemover.onclick = (e) => {
    tarefasTotal -= tarefasConcluidas
    tarefasConcluidas = 0
    let marcados = Array.from(document.getElementsByClassName('marcado'))
    marcados.forEach(tarefa => {
        tarefa.remove()
    })
    footer.innerHTML = `${tarefasConcluidas}/${tarefasTotal} tarefas concluidas!` 
}