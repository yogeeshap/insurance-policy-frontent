import { useCallback ,useReducer} from 'react'

const httpReducer = (state,action) =>{

    if(action.type === 'SEND'){
        return {
            data:null,
            error:null,
            status:"pending"
        } 
    }

    if(action.type === 'SUCCESS'){
        return {
            data:action.res,
            error:null,
            status:"completed"
        } 
    }

    if(action.type === 'FAILED'){
        return {
            data:null,
            error:action.err,
            status:"completed"
        } 
    }

    return state

}

const useHttp = (requestFun,isStatusPending=false) =>{
    const [httpState,dispatchHttp] = useReducer(httpReducer,{
        data:null,
        error:null,
        status:isStatusPending ? 'pending' : null
    })

    const sendRequest = useCallback(async (requestData) =>{
        dispatchHttp({type:"SEND"})
        try{
            const responseData = await requestFun(requestData)
            dispatchHttp({type:"SUCCESS",res:responseData})
        } catch(err){
            const errorMessage = err.message || "Something Went Wrong"
            dispatchHttp({type:"FAILED",err:errorMessage})
        }
    },[requestFun])

    return {
        sendRequest,
        ...httpState
    }
}

export default useHttp

