import { useState } from "react";
import { Goal, GoalLabels } from "../../models/goal";
import { ActivityLevel, ActivityLevelLabels, Gender, GenderLabels, UserProfile } from "../../models/user";
import { FormControl, InputLabel, Select, MenuItem, TextField, Button, SelectChangeEvent } from "@mui/material";
import { useUserProfileUpdateMutation } from "../../api/userApi";
import { UpdateUserCommand } from "../../api/commands/user/UpdateUserCommand";
import { getEnumByLabel } from "../../helpers/mapperHelper";
import React from "react";

const UserProfileComponent: React.FC = () => {
    const [updateProfile] = useUserProfileUpdateMutation();

    const [profile, setProfile] = useState<UserProfile>({
        gender: Gender.Male,
        height: 0,
        weight: 0,
        goal: Goal.MaintainWeight,
        activityLevel: ActivityLevel.LightlyActive
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProfile(prevProfile => ({
            ...prevProfile,
            [name]: value
        }));
    };

    const handleGoalChange = (event: SelectChangeEvent<string>) => {
        const selectedGoal = getEnumByLabel<Goal>(event.target.value, GoalLabels);
        if (selectedGoal !== undefined) {
            setProfile(prevProfile => ({
                ...prevProfile,
                goal: selectedGoal,
            }));
        }
    };

    const handleGenderChange = (event: SelectChangeEvent<string>) => {
        const selectedGender = getEnumByLabel<Gender>(event.target.value, GenderLabels);
        if(selectedGender !== undefined){
            setProfile({
                ...profile,
                gender: selectedGender,
            });
        }
    };

    const handleActivityLevelChange = (event: SelectChangeEvent<string>) => {
        const selectedActivity = getEnumByLabel<ActivityLevel>(event.target.value, ActivityLevelLabels);
        if(selectedActivity !== undefined){
            setProfile({
                ...profile,
                activityLevel: selectedActivity,
            });
        }
    };

    const handleSubmit = async () => {
        const updModel: UpdateUserCommand = {
            upd: profile
        };

        try {
            var result = await updateProfile(updModel).unwrap();
        }
        catch {

        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <FormControl fullWidth margin="normal">
                <InputLabel id="goal-select-label">Goal</InputLabel>
                <Select
                    labelId="goal-select-label"
                    value={GoalLabels[profile.goal]}
                    onChange={handleGoalChange}
                >
                    {Object.values(GoalLabels).map(goal => (
                        <MenuItem key={goal} value={goal}>
                            {goal}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
                <InputLabel id="gender-select-label">Gender</InputLabel>
                <Select
                    labelId="goal-select-label"
                    value={GenderLabels[profile.gender]}
                    onChange={handleGenderChange}
                >
                    {Object.values(GenderLabels).map(gender => (
                        <MenuItem key={gender} value={gender}>
                            {gender}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
                <InputLabel id="activityLevel-select-label">Activity Level</InputLabel>
                <Select
                    labelId="activityLevel-select-label"
                    value={ActivityLevelLabels[profile.activityLevel]}
                    onChange={handleActivityLevelChange}
                >
                    {Object.values(ActivityLevelLabels).map(level => (
                        <MenuItem key={level} value={level}>
                            {level}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

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