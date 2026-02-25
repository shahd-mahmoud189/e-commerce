export type SubcategoryType = {
    _id: string;
    name: string;
    slug: string;
    category: string;
};

export type CategoryShortType = {
    _id: string;
    name: string;
    slug: string;
    image?: string;
};

export type BrandType = {
    _id: string;
    name: string;
    slug: string;
    image?: string;
};

export type ProductInCartType = {
    subcategory: SubcategoryType[];
    _id: string;
    title: string;
    slug: string;
    quantity: number;
    imageCover: string;
    category: CategoryShortType;
    brand: BrandType;
    ratingsAverage: number;
    id?: string;
};

export type CartProductType = {
    count: number;
    _id: string;
    product: ProductInCartType;
    price: number;
};

export type CartItemType = {
    _id: string;
    cartOwner: string;
    products: CartProductType[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    totalCartPrice: number;
};

export type CartResponseType = {
    status: string;
    message: string;
    numOfCartItems: number;
    cartId: string;
    data: CartItemType;
};

export default CartResponseType;