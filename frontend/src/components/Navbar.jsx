const Navbar = () => {
    return (
        <div style={styles.navbar}>
            <h1>Kryzen</h1>
            <button style={styles["navbar>button"]}>Download</button>
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
    'navbar>button': {
        border: '1px solid black',
        padding: '10px',
        borderRadius: '4px'
    }
}