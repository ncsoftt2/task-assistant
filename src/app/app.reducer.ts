import {AnyAction, createSlice, isFulfilled, isPending, isRejected, PayloadAction} from "@reduxjs/toolkit";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type AppInitialStateType = {
    error: string | null
    status: RequestStatusType
    initialized: boolean
}

const initialState:AppInitialStateType = {
    status: 'idle',
    error: null,
    initialized: false,
}

export const slice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setAppErrorAC: (state,action:PayloadAction<{error: string | null}>) => {
            state.error = action.payload.error
        },
        setInitializedAC: (state,action:PayloadAction<{value: boolean}>) => {
            state.initialized = action.payload.value
        }
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(isPending, (state) => {
                state.status = 'loading'
            })
            .addMatcher(isFulfilled,(state) => {
                state.status = 'succeeded'
            })
            .addMatcher(isRejected,(state, action: AnyAction) => {
                const actionPayload =
                    action.type.includes('createTodo')
                    || action.type.includes('createTask')
                    || action.type.includes('updateTodoTitle')
                state.status = 'failed'
                if(action.payload) {
                    // Убрали всплывательное окно с уведомлением
                    if(actionPayload) return
                    state.error = action.payload.messages[0]
                } else {
                    state.error = action.error.message ? action.error.message : "Some occured error"
                }
            })
    }
})

export const appReducer = slice.reducer
export const appActions = slice.actions
