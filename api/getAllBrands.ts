import { BrandResponse } from "@/types/brand.type";
import { categoryType } from "@/types/category.type";
import axios from "axios";

export default async function getBrands():Promise<BrandResponse>{
  try {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/brands",
      method: "GET",
    };
    const { data } = await axios.request(options);
    return data;
  } catch (error: any) {
    console.log(error.response);
    throw error;
  }
}


export async function getBrandDetails(id:string){
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

