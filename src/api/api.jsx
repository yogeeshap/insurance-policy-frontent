import axiosInstance from "../axios/axios"

export const getPolicyDetails = async (params) =>{

    let reqValues = ''
    let pageNum = params?.pageNumber +1 || 1
    if (pageNum && params?.query) reqValues = `search=${params?.query}&page_number=${pageNum}`
    if (pageNum && !params?.query) reqValues = `page_number=${pageNum}`
    if (!pageNum && params?.query) reqValues = `search=${params?.query}`

    try{
        const response =  await axiosInstance.get(`/policy/list/?${reqValues}`)
        if(response.ok === false){
            throw new Error('Faile to fetch data')
        }
        const data =  await response.data
        const result = {...data,query:params?.query}
        return result

    } catch(err){
     
        const errMsg = `error occured while fetching data`
        throw new Error(errMsg)
    }
}

export const searchPolicyDetails = async (params) =>{
    try{
        const response =  await axiosInstance.get(`/policy/search/list/?search=${params}`)
        if(response.ok === false){
            throw new Error('Faile to fetch data')
        }
        const data =  await response.data
        return data
    } catch(err){

        const errMsg = `error occured while fetching data`
        throw new Error(errMsg)
    }
}

export const updatePolicyDetails = async (payload) =>{
 
    try{
        const response =  await axiosInstance.patch(`/policy/${payload.id}/`,payload)
        if(response.ok === false){
            throw new Error('Faile to update data')
        }
        const data =  await response
        return data
    } catch(err){

        const errMsg = 'Entered Value is not valid'
        throw new Error(errMsg)
    }
}

export const monthWisePolicy = async (payload) =>{
    try{
        const response =  await axiosInstance.get(`/policy/monthwise/list/`)
        if(response.ok === false){
            throw new Error('Faile to fetch data')
        }
        const data =  await response
        return data
    } catch(err){
        const errMsg = 'Entered Value is not valid'
        throw new Error(errMsg)
    }
}

