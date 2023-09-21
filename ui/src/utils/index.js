
import jsPDF from "jspdf";
import "jspdf-autotable";

export const inWindow = (left, top, startPosX, startPosY) => {
    let H = document.body.clientHeight;
    let W = document.body.clientWidth;
    if ((left < 20 && startPosX > left) || (left > W - 20 && startPosX < left) ||
        (top < 20 && startPosY > top) || ((top > H - 20 && startPosY < top))) {
        document.body.onmousemove = null;
        document.body.onmouseup = null;
        return false;
    }
    return true;

}
export const onMove = (e, id, setStyleLeft, setStyleTop) => {
    e.preventDefault();
    let startPosX = e.clientX;
    let startPosY = e.clientY;
    const tar = document.querySelector(id);
    const x = tar.offsetLeft;
    const y = tar.offsetTop;

    document.body.onmousemove = e => {
        let left = e.clientX - startPosX + x;
        let top = e.clientY - startPosY + y;
        if (inWindow(e.clientX, e.clientY, startPosX, startPosY)) {
            setStyleLeft(left);
            setStyleTop(top);
        }
    };
    document.body.onmouseup = function () {
        document.body.onmousemove = null;
    };
}

export const generatePDF = (myChart) => {
    var url = myChart.getConnectedDataURL({
        pixelRatio: 2,
        backgroundColor: '#fff',
        excludeComponents: [
            'toolbox',
        ],
        type: 'png'
    })
    const pdf = new jsPDF('p', 'pt')
    //pdf.addImage(url, 5, 5, 580, 300, 'img')
    pdf.addImage(url, "PNG", 10, 10)
    pdf.save('chart' + '.pdf')
}

export const generateWordDoc = (id) => {

    const html = document.querySelector(id).innerHTML;

    const doc = new jsPDF();

    doc.addHTML(html, function () {
        const blob = doc.output("blob");
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "output.doc";
        link.click();
        URL.revokeObjectURL(url);
    });
}