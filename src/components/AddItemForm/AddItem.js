import FormInput from "../FormInput/FormInput";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import { Button, Container, Grid, Paper } from "@mui/material";

const AddItem = ({ onSubmit, data }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, touchedFields },
  } = useForm({ reValidateMode: "onChange", mode: "onBlur" });

  const id = data === undefined ? uuidv4() : data.id;

  const submitHandler = (data) => {
    onSubmit({
      ...data,
      id: id,
    });
    reset();
  };

  return (
    <Paper
      sx={{
        backgroundColor: "grey.300",
        m: 3,
        p: 2,
      }}
    >
      <form onSubmit={handleSubmit(submitHandler)}>
        <Container maxWidth>
          <Grid container direction="column" alignItems="end">
            <Grid container direction="column">
              <FormInput
                error={errors.name && touchedFields.name}
                register={register}
                id="name"
                label="Felhasználónév"
                type="text"
                require={{ required: true, minLength: 5 }}
              />
              <FormInput
                error={errors.email && touchedFields.email}
                register={register}
                id="email"
                label="E-mail"
                type="email"
                require={{ required: true, minLength: 5 }}
              />
              <FormInput
                error={errors.age && touchedFields.age}
                register={register}
                id="age"
                label="Kor"
                type="number"
                require={{ required: true, min: 1 }}
              />
            </Grid>
            <Button variant="contained" type="submit">
              Küldés
            </Button>
          </Grid>
        </Container>
      </form>
    </Paper>
  );
};

export default AddItem;
