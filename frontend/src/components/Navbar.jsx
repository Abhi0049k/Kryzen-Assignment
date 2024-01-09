import { useSelector } from 'react-redux';

const Navbar = () => {
    const { pdfRoute } = useSelector(store => store);
    return (
        <div style={styles.navbar}>
            <h1>Kryzen</h1>
            <div style={styles['btn.container']}>
                {
                    pdfRoute ? (
                        <>
                            <a style={styles['navbar>button']} href={pdfRoute} target='_blank'>Preview</a>
                            <a href={pdfRoute} target='_blank' download='' style={styles["navbar>button"]}>Download PDF</a>
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