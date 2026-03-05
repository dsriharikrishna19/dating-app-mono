import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    profile: any | null;
    loading: boolean;
}

const initialState: UserState = {
    profile: null,
    loading: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setProfile: (state, action: PayloadAction<any>) => {
            state.profile = action.payload;
        },
    },
});

export const { setProfile } = userSlice.actions;
export default userSlice.reducer;
