import type {Product} from "../types.ts";
import type {Dispatch, SetStateAction} from "react";

export type ProductUpdateFormProps = {
    products: Product[];
    setProducts: Dispatch<SetStateAction<Product[]>>;
    updatingProduct: Product;
    updatingProductName: string;
    updatingProductPrice: number;
    setUpdatingProduct: Dispatch<SetStateAction<Product | null>>;
    setUpdatingProductName: Dispatch<SetStateAction<string>>;
    setUpdatingProductPrice:Dispatch<SetStateAction<number>>;
    setIsOpenUpdate: Dispatch<SetStateAction<boolean>>
}
export function ProductUpdateForm(
    {
        products,
        setProducts,
        updatingProduct,
        updatingProductName,
        updatingProductPrice,
        setUpdatingProduct,
        setUpdatingProductName,
        setUpdatingProductPrice,
        setIsOpenUpdate
    } : ProductUpdateFormProps){

    function handleUpdate(e: React.SubmitEvent){
        e.preventDefault();
        if(!updatingProduct) return;

        setProducts(products.map(product =>
            product.id === updatingProduct.id
                ? {...updatingProduct, name: updatingProductName, price: updatingProductPrice}
                : product
        ));
        setUpdatingProduct(null);
        setUpdatingProductName('');
        setUpdatingProductPrice(0);
        setIsOpenUpdate(false)

    }

    return (
        <form onSubmit={handleUpdate}>
            <input
                type="text"
                value={updatingProductName}
                required
                minLength={2}
                onChange={e => setUpdatingProductName(e.target.value)}
            />
            <input
                type="number"
                value={updatingProductPrice}
                required
                min={1}
                onChange={e => setUpdatingProductPrice(Number(e.target.value))}
            />
            <input
                type="text"
                value={updatingProduct.categoryId}
                disabled={true}
            />
            <button>Save</button>
        </form>
    )
}
