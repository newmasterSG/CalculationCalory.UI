import { useState } from "react";
import { Goal, GoalLabels } from "../../models/goal";
import { UserProfile } from "../../models/user";
import { FormControl, InputLabel, Select, MenuItem, TextField, Button, SelectChangeEvent } from "@mui/material";

const UserProfileComponent: React.FC = () => {
    const [profile, setProfile] = useState<UserProfile>({
        gender: '',
        height: 0,
        weight: 0,
        goal: Goal.MaintainWeight,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProfile(prevProfile => ({
            ...prevProfile,
            [name]: value
        }));
    };

    const handleGoalChange = (event: SelectChangeEvent<Goal>) => {
        setProfile(prevProfile => ({
            ...prevProfile,
            goal: event.target.value as Goal
        }));
    };

    const handleSubmit = () => {
        console.log('Profile updated:', profile);
        // Здесь можно добавить логику отправки данных на сервер
    };

    return (
        <div style={{ padding: '20px' }}>
            <FormControl fullWidth margin="normal">
                <InputLabel id="goal-select-label">Goal</InputLabel>
                <Select
                    labelId="goal-select-label"
                    value={profile.goal}
                    onChange={handleGoalChange}
                >
                    {Object.values(GoalLabels).map(goal => (
                        <MenuItem key={goal} value={goal}>
                            {goal}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <TextField
                fullWidth
                margin="normal"
                label="Gender"
                name="gender"
                value={profile.gender}
                onChange={handleChange}
            />

            <TextField
                fullWidth
                margin="normal"
                label="Height (cm)"
                name="height"
                type="number"
                value={profile.height}
                onChange={handleChange}
            />

            <TextField
                fullWidth
                margin="normal"
                label="Weight (kg)"
                name="weight"
                type="number"
                value={profile.weight}
                onChange={handleChange}
            />

            <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                style={{ marginTop: '20px' }}
            >
                Save
            </Button>
        </div>
    );
};

export default UserProfileComponent;