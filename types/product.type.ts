export type product = {
    title:string,
    imageCover:string,
    id:string,
    category:category,
    price:number,
    ratingsAverage:number,
    description:string
    quantity:number,
    images:string[]
}

type category = {
    name:string,
    image:string
}