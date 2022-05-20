import Item from "../Item/Item";
import ItemsContext from "../../ItemsContext";
import { useContext, useState, useEffect } from "react";
import { Grid, Paper, TextField } from "@mui/material";

const ListItems = () => {
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
    <Paper
      sx={{
        backgroundColor: "grey.300",
        m: 3,
        p: 3,
      }}
    >
      <Grid container direction="column" alignItems="end">
        <TextField
          variant="standard"
          label="Szürés névre"
          type="text"
          onChange={filterChangeHandler}
        ></TextField>
        <Grid container direction="column" justifyContent="stretch">
          {filteredData.map((element, index) => {
            return <Item key={index} data={element} />;
          })}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ListItems;
