import { axiosInstance } from "../axios/axios.utils";

export const getDebts = async (expenseId?: string) => {
  try {
    const url = expenseId ? `/debt/expense/${expenseId}/` : `/debts/`;
    const response = await axiosInstance.get(url);
    console.log("Deb data",response.data)
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.detail || error.message);
  }
};



export const debtStatus= async ({debtId}:{debtId:string})=>{
 try{
  const { data } = await axiosInstance.patch(`/debt/${debtId}/settle/`);
  return data
 }
 catch(err){
  console.log(err)
 }
}
