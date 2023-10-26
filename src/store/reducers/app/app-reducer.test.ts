import {AppInitialStateType, appReducer} from "./app-reducer";
import {setAppErrorAC, setAppStatusAC} from "./app-actions";

let startState:AppInitialStateType
beforeEach(() => {
        startState = {
            status: 'loading',
            error: null,
            initialized: false
        }
})

describe('app-reducer', () => {
    test('set message for error',() => {
        const endState = appReducer(startState,setAppErrorAC('some error'))
        expect(endState.error).toBe('some error')
    })
    test('set null for error',() => {
        const endState = appReducer(startState,setAppErrorAC(null))
        expect(endState.error).toBe(null)
    })
    test('change app status',() => {
        const endState = appReducer(startState,setAppStatusAC('loading'))
        expect(endState.status).toBe('loading')
    })
});