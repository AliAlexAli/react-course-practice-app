import ItemsContext from "../../ItemsContext";
import { useContext, useState } from "react";
import AddItem from "../AddItemForm/AddItem";
import { Button, Card, Grid, Typography } from "@mui/material";

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
    <Card
      variant="elevation"
      elevation={2}
      sx={{
        m: 2,
        p: 3,
        backgroundColor: "grey.200",
      }}
    >
      <Grid container justifyContent="space-between">
        <Grid>
          <Typography
            color="primary"
            fontWeight="600"
          >{`${data.name} - (${data.email}) - ${data.age} éves`}</Typography>
        </Grid>
        <div>
          <Button
            sx={{ mr: 4 }}
            variant="outlined"
            color="primary"
            onClick={modifyHandler(data)}
          >
            Módosítás
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={deleteHandler(data)}
          >
            Törlés
          </Button>
        </div>
      </Grid>
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
    </Card>
  );
};

export default Item;
