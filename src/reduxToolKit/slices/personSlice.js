import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    persons: [],
    status: 'idle',
    error: null
}

export const fetchPersons = createAsyncThunk('slices/fetchPersons',
    async () => {
        const response = await fetch('http://127.0.0.1:8000/persons/all/')
        if (!response.ok){ throw new Error('Failed to fetch')} 
        return response.json() 
    }
),

deletePerson = createAsyncThunk('slices/deletePerson',
    async (id) => {
        const response = await fetch(`http://127.0.0.1:8000/persons/delete/${id}/`, {
            method: 'DELETE',
        });
        if (!response.ok){ throw new Error('Failed to Delete')} 
        return id 
    }
),

addPerson = createAsyncThunk('slices/addPersons',
    async (newPerson) => {
        const response = await fetch('http://127.0.0.1:8000/persons/add/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newPerson)
        })
        if (!response.ok) { throw new Error('Failed to add person') }
        return response.json();
    }
),

personsSlice = createSlice({
    name: 'persons',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        //fetch 
        .addCase(fetchPersons.pending, state => {
            state.status = 'loading';
        })
        .addCase(fetchPersons.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.persons = action.payload;
        })
        .addCase(fetchPersons.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        })
        //delete
        .addCase(deletePerson.pending, state => {
            state.status = 'loading';
        })
        .addCase(deletePerson.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.persons = state.persons.filter(person => person.id !== action.payload);
        })
        .addCase(deletePerson.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
        //add
        .addCase(addPerson.pending, state => {
            state.status = 'loading';
        })
        .addCase(addPerson.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.persons.push(action.payload);
        })
        .addCase(addPerson.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });
    }
}) 

export default personsSlice.reducer;