import { createSlice } from "@reduxjs/toolkit";
import expenses from "../data/data";


const initialState = {
    expenseData: expenses,
    category: "all",
}


export const totalExpense = (expenseDatas) => {
    return expenseDatas?.reduce((acc, data) => {
        return acc + Number(data.amount);
    }, 0)
};

const userSlice = createSlice({
    name: "user",
    initialState,

    reducers: {
        add: (state, action) => {
            console.log("action.payload.item",action.payload.item);
            
            state.expenseData = [ action.payload.item, ...state.expenseData];
            console.log("state.expenseData",state.expenseData);

        },
        remove: (state, action) => {
            const id = action.payload.id.id;
            const newExpenseData = state.expenseData.filter((data) => {
                return data.id !== id;
            })
            state.expenseData = newExpenseData;

        },

        setCategory: (state, action) => {
            state.category = action.payload.category;

        }
    }
});


export const { add, remove, setCategory } = userSlice.actions;

export const selectUserExpenseData = (state) => state.user.expenseData;
export const selectUserCategory = (state) => state.user.category;

export default userSlice.reducer;