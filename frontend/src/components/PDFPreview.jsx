import { useSelector } from 'react-redux';

const PDFPreview = () => {
    const { pdfRoute, pdfName } = useSelector(store => store);
    return (
        <div>
            <h1>Preview</h1>
            {/* <iframe src={pdfRoute} title="PDF Viewer" width="100%" height="600px" />

            <a href={pdfRoute} download={pdfName}>
                Download PDF
            </a> */}
        </div>
    )
}

export default PDFPreview;