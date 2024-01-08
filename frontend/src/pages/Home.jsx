import UserForm from "../components/Form";
import Navbar from "../components/Navbar";
import PDFPreview from "../components/PDFPreview";

const Home = () => {
    return (
        <div>
            <Navbar />
            <div style={styles["main-container"]}>
                <UserForm />
                <PDFPreview/>
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
    }
}