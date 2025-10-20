import html2canvas from 'html2canvas';    

export const downloadFasta = (data, id, fileName) => {
    const fastaContent = `>${id}\n${data}`;
    const blob = new Blob([fastaContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${id}.fasta`;
    document.body.appendChild(a);
    a.click();

    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// export default downloadData;

export const downloadPng = async (viewerRef, filename) => {
    // const viewerRef = useRef(null);
    if (!viewerRef.current) return;

    const canvas = await html2canvas(viewerRef.current, {
    backgroundColor: '#fff', // set a background if transparent
    useCORS: true, // if images inside the component need CORS
    });

    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `${filename}_genome_viewer.png`;
    link.click();
}

// export default downloadPng;