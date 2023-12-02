import {appActions, AppInitialStateType, appReducer} from "app/app.reducer";

let startState:AppInitialStateType
beforeEach(() => {
        startState = {
            status: 'loading',
            error: null,
            initialized: false,
        }
})

describe('app-reducer', () => {
    test('set message for error',() => {
        const endState = appReducer(startState,appActions.setAppErrorAC({error:'some error'}))
        expect(endState.error).toBe('some error')
    })
    test('set null for error',() => {
        const endState = appReducer(startState,appActions.setAppErrorAC({error:null}))
        expect(endState.error).toBe(null)
    })
});