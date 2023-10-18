import {createContext, ReactNode, useState} from "react";
import {useCourses} from "../hooks/useCourses";
import {CourseEntity} from "../types/course";

interface Product {
     url: string;
     id: string;
     quantity: number;
     price: number;
     name: string;
}

interface CartContextType {
    items: Product[];
    productsCount: number;
    getProductQuantity: (id: string)=> number;
    addOneToCart: (id:string)=> Promise<void>;
    removeOneFromCart: (id: string) => void;
    deleteFromCart: (id: string) => void;
    getTotalCost: () => Promise<number>;
    isOpenCart: boolean;
    onOpenCart: () => void;
    onCloseCart: () => void;
    getCourseData: (id: string) => Promise<CourseEntity>;
}
export const CartContext = createContext<CartContextType | undefined>(undefined)

interface Props {
    children: ReactNode;
}
export const CartProvider = ({children} : Props) => {
    const [cartProducts, setCartProducts] = useState<Product[]>([])
    const [isOpenCart, setIsOpenCart] = useState<boolean>(false)
    const {getCourseById} = useCourses();
    const onCloseCart = () => setIsOpenCart(false)
    const onOpenCart = () => setIsOpenCart(true)


    const getProductQuantity = (id: string):number => {
        const quantity = cartProducts.find(product => product.id === id)?.quantity;
        if (quantity === undefined) {
            return 0;
        }
        return quantity;
    }

    const addOneToCart = async (id: string): Promise<void> => {
        const quantity = getProductQuantity(id);

        if (quantity === 0) {
            const courseData = await getCourseData(id)
            setCartProducts(
                [
                    ...cartProducts,
                    {
                        id: id,
                        quantity: 1,
                        name: courseData.name,
                        url: courseData.photoUrl,
                        price: courseData.price,
                    }
                ]
            )

        } else {
            setCartProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product.id === id
                        ? { ...product, quantity: product.quantity + 1 }
                        : product
                )
            );
        }
    }

    const deleteFromCart = (id: string): void => {
        setCartProducts((prevProducts) =>
            prevProducts.filter((product) => product.id !== id)
        );
    };

    const removeOneFromCart = (id):void => {
        const quantity = getProductQuantity(id);
        if (quantity === 1 ) {
            deleteFromCart(id)
        } else if (quantity > 1) {
            setCartProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product.id === id
                        ? { ...product, quantity: product.quantity - 1 }
                        : product
                )
            );
        }
    };

    const productsCount = cartProducts.reduce((prev, curr) => Number(prev) +  Number(curr.quantity), 0)

    const getTotalCost = async ():Promise<number> => {
       const totalCostArray = await Promise.all(cartProducts.map(async (cartItem) => {
           const productData = await getCourseById(cartItem.id);
           return productData.course.price * cartItem.quantity
       }))
        return totalCostArray.reduce((prev, curr) => prev + curr, 0)
    }

    const getCourseData = async(id: string): Promise<CourseEntity> => {
        const res = await getCourseById(id)
        return res.course
    }

    const contextValue = {
        items: cartProducts,
        productsCount,
        getCourseData,
        getProductQuantity,
        addOneToCart,
        removeOneFromCart,
        deleteFromCart,
        getTotalCost,
        isOpenCart,
        onOpenCart,
        onCloseCart,
    }
    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    )
}


