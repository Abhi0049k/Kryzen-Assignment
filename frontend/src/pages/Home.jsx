import UserForm from "../components/Form";
import Navbar from "../components/Navbar";
import { useSelector } from 'react-redux';

const Home = () => {
    const {pdfRoute} = useSelector(store=> store)
    return (
        <div>
            <Navbar/>
            <div style={styles["main-container"]}>
                <UserForm />
                {
                    pdfRoute ? <iframe src={pdfRoute} style={styles.preview}/> : " "
                }
            </div>
        </div>
    )
}

export default Home;

const styles = {
    'main-container': {
        display: 'flex',
        width: '100%',
        justifyContent: 'center'
    },
    preview: {
        width: '50%',
        padding: '1rem',
        height: '40rem',
        border: '1px solid black',
    }
}