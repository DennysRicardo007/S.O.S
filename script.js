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
const campoPeca = document.getElementById("peca");
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

const servicosAdicionais = document.getElementById("servicos-adicionais");
const botaoAdicionarServico = document.getElementById("adicionar-servico");
let contadorServicosAdicionais = 0;

if (campoServico && campoPeca && servicosAdicionais && botaoAdicionarServico) {
    botaoAdicionarServico.addEventListener("click", function () {
        contadorServicosAdicionais += 1;

        const linhaServico = document.createElement("div");
        const campoAdicionalServico = document.createElement("div");
        const campoAdicionalPeca = document.createElement("div");
        const rotuloServico = document.createElement("label");
        const rotuloPeca = document.createElement("label");
        const seletorServico = campoServico.cloneNode(true);
        const seletorPeca = campoPeca.cloneNode(true);
        const botaoRemover = document.createElement("button");

        linhaServico.className = "servico-adicional";
        campoAdicionalServico.className = "servico-adicional-campo";
        campoAdicionalPeca.className = "servico-adicional-campo";
        seletorServico.id = `servico-adicional-${contadorServicosAdicionais}`;
        seletorServico.name = "servico-adicional";
        seletorServico.value = "";
        seletorPeca.id = `peca-adicional-${contadorServicosAdicionais}`;
        seletorPeca.name = "peca-adicional";
        seletorPeca.value = "";
        rotuloServico.htmlFor = seletorServico.id;
        rotuloServico.textContent = "Serviço adicional";
        rotuloPeca.htmlFor = seletorPeca.id;
        rotuloPeca.textContent = "Tipo de peça";
        botaoRemover.type = "button";
        botaoRemover.className = "remover-servico";
        botaoRemover.textContent = "Remover";
        botaoRemover.setAttribute("aria-label", `Remover serviço adicional ${contadorServicosAdicionais}`);
        botaoRemover.addEventListener("click", function () {
            linhaServico.remove();
        });

        campoAdicionalServico.append(rotuloServico, seletorServico);
        campoAdicionalPeca.append(rotuloPeca, seletorPeca);
        linhaServico.append(campoAdicionalServico, campoAdicionalPeca, botaoRemover);
        servicosAdicionais.append(linhaServico);
    });
}

function capitalizarPrimeiraLetra(valor) {
    if (!valor) return "";

    const texto = valor.trim();
    if (!texto) return "";

    return texto.charAt(0).toUpperCase() + texto.slice(1);
}

function obterRotuloSelecionado(seletor) {
    return seletor.options[seletor.selectedIndex]?.textContent.trim() || "";
}

if (formulario) {
    formulario.addEventListener("submit", function (event) {
        event.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const whatsapp = document.getElementById("whatsapp").value.trim();
        const itensOrcamento = [
            {
                peca: campoPeca,
                servico: campoServico
            },
            ...Array.from(formulario.querySelectorAll(".servico-adicional"), function (linha) {
                return {
                    peca: linha.querySelector("select[name='peca-adicional']"),
                    servico: linha.querySelector("select[name='servico-adicional']")
                };
            })
        ].map(function (item) {
            return {
                peca: item.peca.value.trim(),
                pecaNome: obterRotuloSelecionado(item.peca),
                servico: item.servico.value.trim(),
                servicoNome: obterRotuloSelecionado(item.servico)
            };
        });
        const descricao = document.getElementById("descricao").value.trim();

        if (!nome || !whatsapp || !descricao || itensOrcamento.some(function (item) {
            return !item.peca || !item.servico;
        })) {
            alert("Preencha seus dados e selecione uma peça e um serviço para cada item do orçamento.");
            return;
        }

        const nomeFormatado = capitalizarPrimeiraLetra(nome);
        const mensagem = [
            "🧵 *NOVO PEDIDO DE ORÇAMENTO*",
            "",
            `👤 *Nome:* ${nomeFormatado}`,
            `📱 *WhatsApp:* ${whatsapp}`,
            `👕 *Peça(s) e serviço(s):*\n${itensOrcamento.map(function (item) {
                return `- ${item.pecaNome}: ${item.servicoNome}`;
            }).join("\n")}`,
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

        if (servicosAdicionais) {
            servicosAdicionais.replaceChildren();
        }
    });
}