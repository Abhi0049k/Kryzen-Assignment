import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

const Navbar = () => {
    const { address, name, age, photoUrl } = useSelector(store => store);

    const createPdfAndDownload = async () => {
        const imageHeight = 200;
        const imageWidth = 200;

        try {
            const pdfDoc = await PDFDocument.create();

            const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

            const page = pdfDoc.addPage();
            const { width, height } = page.getSize();

            // Center the text on the page
            const textOptions = {
                font,
                size: 14,
                color: rgb(0, 0, 0),
            };

            const textX = (width - 140) / 2;

            page.drawText(`Name: ${name}`, {
                x: textX,
                y: height - 300,
                ...textOptions,
            });

            page.drawText(`Age: ${age}`, {
                x: textX,
                y: height - 320,
                ...textOptions,
            });

            page.drawText(`Address: ${address}`, {
                x: textX,
                y: height - 340,
                ...textOptions,
            });

            // Display the image at the top
            const imageResponse = await fetch(photoUrl);

            if (!imageResponse.ok) {
                throw new Error(
                    `Failed to fetch image: ${imageResponse.status} ${imageResponse.statusText}`
                );
            }

            const imageBytes = await imageResponse.arrayBuffer();
            const imageExtension = photoUrl.split(".").pop().toLowerCase();
            let image;
            if (imageExtension === "jpg") {
                image = await pdfDoc.embedJpg(imageBytes);
            } else if (imageExtension === "jpeg") {
                image = await pdfDoc.embedJpg(imageBytes);
            } else if (imageExtension === "png") {
                image = await pdfDoc.embedPng(imageBytes);
            } else {
                throw new Error(`Unsupported image format: ${imageExtension}`);
            }
            // Center the image horizontally
            const imageX = width / 2 - imageWidth / 2;

            page.drawImage(image, {
                x: imageX,
                y: height - 50 - imageHeight,
                width: imageWidth,
                height: imageHeight,
            });

            const pdfBytes = await pdfDoc.save();
            const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
            const blobUrl = URL.createObjectURL(pdfBlob);
            const link = document.createElement("a");
            link.href = blobUrl;
            link.download = "UserData.pdf";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Error creating PDF:", error);
        }
    };

    const downloadPdf = useCallback(()=>{
        let res = window.confirm('Are you sure you want to download the PDF');
        if(res === true){
            createPdfAndDownload()
        }
    },[])


    return (
        <div style={styles.navbar}>
            <h1>Kryzen</h1>
            <div style={styles['btn.container']}>
                {
                    (address && name && age && photoUrl) ? (
                        <>
                            <button onClick={downloadPdf} style={styles["navbar>button"]}>Download PDF</button>
                        </>
                    ) : ''
                }
            </div>
        </div>
    )
}

export default Navbar

const styles = {
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        border: '1px solid black',
        height: '3rem',
        alignItems: 'center',
        padding: '0 2rem'
    },
    'btn.container': {
        display: 'flex',
        gap: '14px'
    },
    'navbar>button': {
        border: '1px solid black',
        padding: '10px',
        borderRadius: '4px',
        textDecoration: 'none',
    }
}