import Item from "../Item/Item";
import classes from "./ListItems.module.css";
import ItemsContext from "../../ItemsContext";
import { useContext, useState, useEffect } from "react";

const ListItems = ({ className }) => {
  const { data } = useContext(ItemsContext);

  const [filteredData, setFilteredData] = useState(data);
  const [filterValue, setFilterValue] = useState("");

  const filterChangeHandler = (event) => {
    setFilterValue(event.target.value);
  };

  useEffect(() => {
    setFilteredData(
      data.filter((e) => {
        return e.name.includes(filterValue);
      })
    );
  }, [data, filterValue, setFilteredData]);

  return (
    <div className={`${className}  ${classes.container}`}>
      <div className={classes["name-filter_container"]}>
        <label>Szürés névre</label>
        <input type="text" onChange={filterChangeHandler}></input>
      </div>
      {filteredData.map((element, index) => {
        return <Item key={index} data={element} />;
      })}
    </div>
  );
};

export default ListItems;
