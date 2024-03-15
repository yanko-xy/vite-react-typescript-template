import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        username: 'sheep'
    },
    reducers: {
        setName(state, action) {
            const name = action.payload.name;
            state.username = name;
        }
    },
    extraReducers(builder) {
        builder.addCase(setNameAsync.fulfilled, (state, action) => {
            state.username = action.payload;
        });
    }
});

export const setNameAsync = createAsyncThunk('asycn/test', async (newName: string) => {
    const result = await new Promise<void>((resolve, _) => {
        setTimeout(() => {
            resolve();
        }, 3000);
    }).then(() => {
        return newName;
    });
    return result;
});

export const { setName } = userSlice.actions;
export default userSlice.reducer;
