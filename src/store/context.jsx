
import {React,createContext,useState} from 'react'

export const PolicyContext = createContext({ 
    searchedValue:'',
    status:"",
    pageValue:0,
    error:null,
    policyDetailsData:[],
    setPolicyDetails:()=>{}
})

const PolicyContextProvider = ({props,children}) =>{
    const [policyDetailsData,setPolicyData] =  useState([])
    // const [isSearched,setIsSearched] =  useState(false)
    const [searchedValue,setsearchedValue] =  useState('')
    const [pageValue,setPageValue] =  useState(0)
    const [status,setStatus] =  useState('')
    const [error,setError] =  useState(null)
    const [editedValue,setEditedValue] =  useState({})
    const [loading,setLoading] =  useState(false)
    const [alertPop,setAlertPop] =  useState(false)

    const setPolicyDetails = (data) =>{
        setPolicyData(data)
    }

    const setSearchedValue = (qry) =>{
        setsearchedValue(qry)
      
    }

    const setPageNum = (pgNum) =>{
        setPageValue(pgNum)
    }

    const setStatusValue = (s) =>{
        setStatus(s)
    }
    const handleError = (s) =>{
        console.log(s,'s')
        setError(s)
    }
    const clearEdit = () =>{
        setEditedValue({})
    }

    const onLoading= (v) =>{
        setLoading(v)
    }

    const handleAlert = () =>{
        setAlertPop((prev)=>!prev)
    }

    const handleEdit = (id,index,change) =>{

        setEditedValue((prev)=>({...prev,[id]:{...prev[id],[change.fieldName]:change.fieldValue}}))
    }
    
    const contexValue =  {
        policyDetailsData,
        searchedValue,
        pageValue,
        status,
        error,
        editedValue,
        loading,
        alertPop,
        setSearchedValue,
        setPolicyDetails,
        setPageNum ,
        setStatusValue,
        handleError,
        handleEdit,
        clearEdit,
        onLoading,
        handleAlert
    }

    return <PolicyContext.Provider value={contexValue}>
        {children}
    </PolicyContext.Provider>
}

export default PolicyContextProvider