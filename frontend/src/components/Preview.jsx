import { useSelector } from 'react-redux';

const Preview = () => {
    const { address, name, age, photoUrl } = useSelector(store => store);
    return (
        <div style={{backgroundColor: 'white', border: '1px solid black', height: 'fit-content', padding: '18px'}}>
            <img style={{width: '150px', height: '100px'}} src={photoUrl} alt='img' />
            <p>Name: {name}</p>
            <p>Address: {address}</p>
            <p>Age: {age}</p>
        </div>
    )
}

export default Preview
