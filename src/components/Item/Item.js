import classes from './Item.module.css'
import ItemsContext from '../../ItemsContext';
import { useContext } from 'react';

const Item = ({data}) => {
    const {removeData} = useContext(ItemsContext)

    const clickHandler = (data) => (event) => {
        removeData(data)
    }

    return <div className={classes.container}>
                <p>{`${data.name} - (${data.email}) - ${data.age} éves`}</p>
            <button onClick={clickHandler(data)}>Törlés</button>
        </div>
}

export default Item;