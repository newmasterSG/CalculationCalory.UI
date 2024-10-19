import { TextField, FormControl, InputLabel, Select, MenuItem, Button, SelectChangeEvent } from "@mui/material";
import { Gender, GenderLabels } from "../../../models/user";

interface RegisterProfileDetailsProps {
    registerData: {
      firstName: string;
      lastName: string;
      gender: Gender;
      height: number;
      weight: number;
      age: number;
    };
    handleRegisterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleGenderChange: (event: SelectChangeEvent<string>) => void;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  }
  
  const RegisterProfileDetails: React.FC<RegisterProfileDetailsProps> = ({ registerData, handleRegisterChange, handleGenderChange, handleSubmit }) => {
    return (
      <form onSubmit={handleSubmit}>
        <TextField
          label="First Name"
          name="firstName"
          value={registerData.firstName}
          onChange={handleRegisterChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Last Name"
          name="lastName"
          value={registerData.lastName}
          onChange={handleRegisterChange}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="gender-select-label">Gender</InputLabel>
          <Select
            labelId="gender-select-label"
            value={GenderLabels[registerData.gender]}
            onChange={handleGenderChange}
          >
            {Object.values(GenderLabels).map(gender => (
              <MenuItem key={gender} value={gender}>
                {gender}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Height (cm)"
          name="height"
          value={registerData.height}
          onChange={handleRegisterChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Weight (kg)"
          name="weight"
          value={registerData.weight}
          onChange={handleRegisterChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Age"
          name="age"
          value={registerData.age}
          onChange={handleRegisterChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Register
        </Button>
      </form>
    );
  };
  
  export default RegisterProfileDetails;