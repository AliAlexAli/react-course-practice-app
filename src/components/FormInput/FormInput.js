import { FormControl, FormHelperText, TextField } from "@mui/material";

const FormInput = ({ type, id, label, register, error, require }) => {
  return (
    <FormControl
      sx={{
        my: 2,
      }}
    >
      <TextField
        sx={{
          backgroundColor: "white",
        }}
        variant="outlined"
        label={label}
        error={error}
        {...register(id, require)}
        type={type}
        id={id}
        aria-describedby="helper-text"
      ></TextField>
      {error ? (
        <FormHelperText id="helper-text" error>
          A mező kitöltése kötelező
        </FormHelperText>
      ) : (
        ""
      )}
    </FormControl>
  );
};

export default FormInput;
