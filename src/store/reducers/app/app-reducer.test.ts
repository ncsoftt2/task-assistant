import {AppInitialStateType, appReducer, setAppErrorAC, setAppStatusAC} from "./app-reducer";

let startState:AppInitialStateType
beforeEach(() => {
        startState = {
            status: 'loading',
            error: null,
            initialized: false,
            userData: {
                id:1,
                email:'',
                login:''
            }
        }
})

describe('app-reducer', () => {
    test('set message for error',() => {
        const endState = appReducer(startState,setAppErrorAC({error:'some error'}))
        expect(endState.error).toBe('some error')
    })
    test('set null for error',() => {
        const endState = appReducer(startState,setAppErrorAC({error:null}))
        expect(endState.error).toBe(null)
    })
    test('change app status',() => {
        const endState = appReducer(startState,setAppStatusAC({status:'loading'}))
        expect(endState.status).toBe('loading')
    })
});