import {AppDispatch, AppState} from "app/model/store";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: AppState
    dispatch: AppDispatch
    rejectValue: null
}>();