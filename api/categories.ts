import { categoryType } from "@/types/category.type";
import axios from "axios";

export default async function getCategories(){
  try {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/categories",
      method: "GET",
    };
    const { data } = await axios.request(options);
    return data;
  } catch (error: any) {
    console.log(error.response);
    throw error;
  }
}
