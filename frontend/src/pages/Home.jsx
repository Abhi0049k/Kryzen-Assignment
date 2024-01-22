import UserForm from "../components/Form";
import Navbar from "../components/Navbar";
import { useSelector } from 'react-redux';
import Preview from "../components/Preview";

const Home = () => {
    const { address, name, age, photoUrl } = useSelector(store => store);
    console.log('address: ', address, name, age, photoUrl);
    return (
        <div>
            <Navbar />
            <div style={styles["main-container"]}>
                <UserForm />
                {
                    address ? <Preview/> : ' '
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