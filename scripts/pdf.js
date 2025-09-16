document.getElementById('downloadPdf').addEventListener('click', () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'pt', 'a4');
    const cvElement = document.querySelector('.cv-container');

    html2canvas(cvElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff"
    }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        let position = 0;
        let heightLeft = pdfHeight;

        while (heightLeft > 0) {
            doc.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
            heightLeft -= doc.internal.pageSize.getHeight();
            position -= doc.internal.pageSize.getHeight();
            if (heightLeft > 0) doc.addPage();
        }

        doc.save('Curriculum_LuizFelipe.pdf');
    }).catch(err => console.error("Erro ao gerar PDF:", err));
});