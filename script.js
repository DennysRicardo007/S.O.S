const formulario = document.getElementById("formulario-orcamento");
const cardsServico = document.querySelectorAll(".card-servico");

cardsServico.forEach(function (card) {
    card.addEventListener("click", function () {
        const nomeServico = card.querySelector("h3").textContent.trim();
        const url = `orcamento.html?servico=${encodeURIComponent(nomeServico)}`;

        window.location.href = url;
    });
});

const campoServico = document.getElementById("servico");
const servicoSelecionado = new URLSearchParams(window.location.search).get("servico");

if (campoServico && servicoSelecionado) {
    const opcaoExistente = Array.from(campoServico.options).find(function (opcao) {
        return opcao.value === servicoSelecionado;
    });

    if (!opcaoExistente) {
        const novaOpcao = new Option(servicoSelecionado, servicoSelecionado);
        campoServico.add(novaOpcao);
    }

    campoServico.value = servicoSelecionado;
}

function capitalizarPrimeiraLetra(valor) {
    if (!valor) return "";

    const texto = valor.trim();
    if (!texto) return "";

    return texto.charAt(0).toUpperCase() + texto.slice(1);
}

if (formulario) {
    formulario.addEventListener("submit", function (event) {
        event.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const whatsapp = document.getElementById("whatsapp").value.trim();
        const peca = document.getElementById("peca").value;
        const servico = document.getElementById("servico").value;
        const descricao = document.getElementById("descricao").value.trim();

        if (!nome || !whatsapp || !peca || !servico || !descricao) {
            alert("Preencha todos os campos antes de enviar o orçamento.");
            return;
        }

        const nomeFormatado = capitalizarPrimeiraLetra(nome);
        const mensagem = [
            "🧵 *NOVO PEDIDO DE ORÇAMENTO*",
            "",
            `👤 *Nome:* ${nomeFormatado}`,
            `📱 *WhatsApp:* ${whatsapp}`,
            `👕 *Peça:* ${peca}`,
            `✂️ *Serviço:* ${servico}`,
            "",
            "📝 *Descrição:*",
            descricao,
            "",
            "📌 Solicitação enviada pelo site S.O.S. Roupas."
        ].join("\n");

        const numero = "558188065989";
        const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

        window.open(url, "_blank");
        formulario.reset();
    });
}