import UserForm from "../components/Form";
import Navbar from "../components/Navbar";

const Home = () => {
    return (
        <div>
            <Navbar/>
            <div style={styles["main-container"]}>
                <UserForm />
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