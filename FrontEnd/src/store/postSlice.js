import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts:[],
    ids:[]
}

const postSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        addPost:(state,action)=>{
            const p = action.payload;

            p.forEach(element => {
                if(state.ids.indexOf(element._id)==-1)
                {
                    state.posts.push(element);
                    state.ids.push(element._id);
                }
            });
        },
    }
})

export const {addPost} = postSlice.actions;


export default postSlice.reducer;