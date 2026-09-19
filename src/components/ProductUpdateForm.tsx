import type {Category, Product} from "../types.ts";
import {type Dispatch, type SetStateAction, useState} from "react";
import {updateProduct} from "../services/api.ts";

export type ProductUpdateFormProps = {
    products: Product[];
    category: Category;
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
        category,
        setProducts,
        updatingProduct,
        updatingProductName,
        updatingProductPrice,
        setUpdatingProduct,
        setUpdatingProductName,
        setUpdatingProductPrice,
        setIsOpenUpdate
    } : ProductUpdateFormProps){

    const [error, setError] = useState('');

    function handleUpdate(e: React.SubmitEvent){
        e.preventDefault();
        setError('');
        if(!updatingProduct) {
            setError('Failed to update the category. NULL');
            return
        }
        updateProduct({...updatingProduct, name: updatingProductName, price: updatingProductPrice })
            .then((product: Product) => {
                setProducts(products.map(item =>
                    item.id === product.id
                        ? product
                        : item
                ));
                setUpdatingProduct(null);
                setUpdatingProductName('');
                setUpdatingProductPrice(0);
                setIsOpenUpdate(false)
            })
            .catch(() => {
                setError('Failed to update the product.');
            });
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
                value={category?.name ?? "No category"}
                disabled={true}
            />
            {error && <p className="error">{error}</p>}
            <button>Save</button>
        </form>
    )
}
