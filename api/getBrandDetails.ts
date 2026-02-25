import axios from "axios";

export default async function getBrandDetails(id:string){
  try {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/products?brand=${id}`,
      method: "GET",
    };
    const { data } = await axios.request(options);
    return data;
  } catch (error: any) {
    console.log(error.response);
    throw error;
  }
}
