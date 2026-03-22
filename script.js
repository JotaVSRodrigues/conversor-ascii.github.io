const input = document.getElementById("command")
const output = document.getElementById("output");

// Mensagem Inicial

/* 
    O comando é transformado em um Array através do método split,
    fazendo assim uma validação em cada parte do comando 
*/

printLine(" ")
printLine(" ")
printLine("Digite: convert <valor> to <base>")
printLine("Ex: convert 10 to binary")
printLine("Digite 'help' para obter ajuda.")
printLine("")

/*

  

*/


// Imprime linha no terminal
function printLine(text) {
    const line = document.createElement("div")
    line.textContent = text
    output.appendChild(line)
}

// Conversao de bases
function convert(value, fromBase, toBase) {
    const decimal = parseInt(value, fromBase);
    return decimal.toString(toBase).toUpperCase()
}


// Detecta base automaticamente
function detectBase(value) {
    if (/^[01]+$/.test(value)) return 2
    if (/^[0-7]+$/.test(value)) return 8
    if (/^[0-9]+$/.test(value)) return 10
    return 16
}

// Nome da base
function getBase(name) {
    switch (name.toLowerCase()) {
        case "binary": return 2
        case "octal": return 8
        case "decimal": return 10
        case "hexadecimal": return 16
        default: return null
    }

}

// 
function processCommand(cmd) {
    const parts = cmd.split(" ")

    if (parts[0] === "convert") {
        const value = parts[1]
        const toBaseName = parts[3]

        let fromBase = detectBase(value)
        let toBase = getBase(toBaseName)

        if (toBase == null) {
            printLine("Base inválida.")
            return
        }

        const result = convert(value, fromBase, toBase)
        printLine(result)
    } else if (cmd == "clear") {
        output.innerHTML = ""
        printLine("")
    } else if (cmd == "help") {
        printLine("Comandos disponíveis:")
        printLine("convert <valor> to <base>")
        printLine("Bases: binary, octal, decimal, hexadecimal")
        printLine("clear - limpa a tela")
    } else {
        printLine("Comando não reconhecido.")
    }

}


    function createPrompt() {
        const line = document.createElement("div")

        const span = document.createElement("span")
        span.textContent = "> "

        const input = document.createElement("input")
        input.type = "text"
        input.className = "command"

        line.appendChild(span)
        line.appendChild(input)
        output.appendChild(line)

        input.focus()

        input.addEventListener("keydown", function (e) {
            if (e.key == "Enter") {
                const command = input.value 

                input.disabled = true 
                processCommand(command)

                createPrompt()
            }
        })
    }


    // INICIALIZACAO
    createPrompt()