const inputArquivo = document.getElementById('input-arquivo');
        const imgPreview = document.getElementById('imagem-preview');
        const textoInstrucao = document.getElementById('texto-instrucao');
        const conteudoPdf = document.getElementById('conteudo-pdf');
        const btnConverter = document.getElementById('botao_converter');
        
        let imagemEhPaisagem = false;

        inputArquivo.addEventListener('change', function(evento) {
            const arquivo = evento.target.files[0];

            if (arquivo) {
                const leitor = new FileReader();

                leitor.onload = function(e) {
                    imgPreview.src = e.target.result;
                    imgPreview.style.display = "block";
                    textoInstrucao.style.display = "none";

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
            const orientacao = imagemEhPaisagem ? 'landscape' : 'portrait';

            const opcoes = {
                margin: [10, 10, 10, 10],
                filename: 'meu-documento.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2, scrollY: 0, useCORS: true },
                jsPDF: { unit: 'mm', format: 'a4', orientation: orientacao },
                pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
            };
            
            html2pdf().set(opcoes).from(conteudoPdf).save();
        });