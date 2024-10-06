import { TextField, Button } from "@mui/material";

interface RegisterEmailPasswordProps {
    registerData: {
        email: string;
        password: string;
        confirmPassword: string;
    };
    handleRegisterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}


const RegisterEmailPassword: React.FC<RegisterEmailPasswordProps> = ({ registerData, handleRegisterChange, handleSubmit }) => {
    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Email"
                name="email"
                value={registerData.email}
                onChange={handleRegisterChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Password"
                name="password"
                type="password"
                value={registerData.password}
                onChange={handleRegisterChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                fullWidth
                value={registerData.confirmPassword}
                onChange={handleRegisterChange}
                margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
                Next
            </Button>
        </form>
    );
};

export default RegisterEmailPassword;