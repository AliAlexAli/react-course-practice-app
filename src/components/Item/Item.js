import classes from "./Item.module.css";
import ItemsContext from "../../ItemsContext";
import { useContext, useState } from "react";
import AddItem from "../AddItemForm/AddItem";

const Item = ({ data }) => {
  const { removeData, editData } = useContext(ItemsContext);
  const [showEdit, setShowEdit] = useState(false);

  const deleteHandler = (data) => (event) => {
    removeData(data);
  };

  const modifyHandler = (data) => (event) => {
    setShowEdit((prev) => !prev);
  };

  return (
    <div>
      <div className={classes.container}>
        <div>{`${data.name} - (${data.email}) - ${data.age} éves`}</div>
        <div className={classes.subcontainer}>
          <button onClick={modifyHandler(data)}>Módosítás</button>
          <button onClick={deleteHandler(data)}>Törlés</button>
        </div>
      </div>
      {showEdit ? (
        <AddItem
          key={data.id}
          onSubmit={(data) => {
            editData(data);
            setShowEdit(false);
          }}
          data={data}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Item;
