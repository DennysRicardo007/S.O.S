const formulario = document.getElementById("formulario-orcamento");

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

        const mensagem = `
🧵 *NOVO PEDIDO DE ORÇAMENTO*

👤 *Nome:* ${nome}
📱 *WhatsApp:* ${whatsapp}
👕 *Peça:* ${peca}
✂️ *Serviço:* ${servico}

📝 *Descrição:*
${descricao}

📌 Solicitação enviada pelo site S.O.S. Roupas.
`;

        const numero = "5581995189725";
        const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

        window.open(url, "_blank");
        formulario.reset();
    });
}