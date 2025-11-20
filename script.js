const inputArquivo = document.getElementById('input-arquivo');
const imgPreview = document.getElementById('imagem-preview');
const textoInstrucao = document.getElementById('texto-instrucao');
const conteudoPdf = document.getElementById('conteudo-pdf');
const btnConverter = document.getElementById('botao_converter');

let imagemEhPaisagem = false;
let arquivoSelecionado = false; 

inputArquivo.addEventListener('change', function(evento) {
    const arquivo = evento.target.files[0];

    if (arquivo) {
        const leitor = new FileReader();

        leitor.onload = function(e) {
            imgPreview.src = e.target.result;
            imgPreview.style.display = "block";
            textoInstrucao.style.display = "none";
            arquivoSelecionado = true; 
            
            const imagemTemp = new Image();
            imagemTemp.src = e.target.result;
            imagemTemp.onload = function() {
                imagemEhPaisagem = this.width > this.height;
            }
        }
        leitor.readAsDataURL(arquivo);
    }
});

btnConverter.addEventListener('click', function() {
    if (!arquivoSelecionado) {
        alert("Por favor, selecione uma imagem primeiro!");
        return;
    }

    const textoOriginal = btnConverter.innerText;
    btnConverter.innerText = "Gerando PDF...";
    btnConverter.disabled = true;

    const orientacao = imagemEhPaisagem ? 'landscape' : 'portrait';

    const opcoes = {
        margin: [0, 0, 0, 0], 
        filename: 'imagem-convertida.pdf',
        image: { type: 'jpeg', quality: 1 }, 
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: orientacao }
    };
    
    html2pdf().set(opcoes).from(conteudoPdf).save().then(() => {
        btnConverter.innerText = textoOriginal;
        btnConverter.disabled = false;
    });
});
