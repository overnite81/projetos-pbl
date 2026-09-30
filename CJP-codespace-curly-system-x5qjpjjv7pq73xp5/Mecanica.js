// 1. Seleciona os textos com "fade" E as imagens que estão dentro de ".image"
const elementosAnimar = document.querySelectorAll(".fade, .image img");

// Função do efeito de digitação
function iniciarDigitacao(elemento) {
    const conteudoCompleto = elemento.textContent.trim();
    elemento.textContent = ""; 
    elemento.style.opacity = "1"; 
    
    let index = 0;
    
    function escrever() {
        if (index < conteudoCompleto.length) {
            elemento.textContent += conteudoCompleto.charAt(index);
            index++;
            setTimeout(escrever, 15); // Velocidade rápida (15ms)
        }
    }
    
    escrever();
}

// Observador de tela
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            
            // SE FOR IMAGEM: Aplica a animação vinda da esquerda
            if (entry.target.tagName === "IMG") {
                entry.target.classList.add("show-image");
            } 
            // SE FOR TEXTO: Aplica o comportamento padrão que você já tinha
            else {
                entry.target.classList.add("show");
                
                // Só ativa a digitação se NÃO tiver a classe "nao-digitar" e ainda não foi digitado
                if (!entry.target.classList.contains("nao-digitar") && !entry.target.dataset.digitado) {
                    entry.target.dataset.digitado = "true";
                    iniciarDigitacao(entry.target);
                }
            }
            
            // Opcional: Para de observar após animar para economizar processamento
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

// Ativa o observador em todos os elementos selecionados (textos e imagens)
elementosAnimar.forEach(elemento => observer.observe(elemento));
