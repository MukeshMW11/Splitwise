import { axiosInstance } from "../axios/axios.utils"

export const getUser =async ()=>{
try{
const res = await axiosInstance.get('/user/')
return res.data
}

catch(err)
{
    console.log(err)
}
}

export const getUserByGroupId =async (groupId)=>{
try{
const res = await axiosInstance.get(`/user/${groupId}/group/ `)
return res.data
}

catch(err)
{
    console.log(err)
}
}