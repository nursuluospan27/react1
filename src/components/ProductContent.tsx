import {type Dispatch, type SetStateAction, useState} from "react";
import type {Category, Product} from "../types.ts";
import {Modal} from "./Modal.tsx";
import {ProductCreateForm} from "./ProductCreateForm.tsx";
import {ProductList} from "./ProductList.tsx";
import {ProductUpdateForm} from "./ProductUpdateForm.tsx";

export type ProductContentProps = {
    products: Product[];
    setProducts: Dispatch<SetStateAction<Product[]>>
    categories: Category[]
}

export  function ProductContent(
    {
        products,
        setProducts,
        categories
    }: ProductContentProps){

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isOpenUpdate, setIsOpenUpdate] = useState<boolean>(false);

    const [updatingProduct, setUpdatingProduct] = useState<Product | null>(null);
    const [updatingProductName, setUpdatingProductName] = useState('');
    const [updatingProductPrice, setUpdatingProductPrice] = useState(0);


    return (
        <>
            <button onClick={() => setIsOpen(true)} disabled={categories.length===0}>Create product</button>

            {isOpen &&
                <Modal onClose={() => setIsOpen(false)}>
                    <ProductCreateForm
                        products={products}
                        setProducts={setProducts}
                        categories={categories}
                        setIsOpen={setIsOpen}
                    />
                </Modal>
            }
            {isOpenUpdate &&
                <Modal onClose={() => setIsOpenUpdate(false)}>
                    <ProductUpdateForm
                        products={products}
                        setProducts={setProducts}
                        updatingProduct={updatingProduct}
                        updatingProductName={updatingProductName}
                        updatingProductPrice={updatingProductPrice}
                        setUpdatingProduct={setUpdatingProduct}
                        setUpdatingProductName={setUpdatingProductName}
                        setUpdatingProductPrice={setUpdatingProductPrice}
                        setIsOpenUpdate={setIsOpenUpdate}
                    />
                </Modal>
            }

            <ProductList
                products={products}
                setUpdatingProduct={(product: Product) => {
                    setUpdatingProduct(product);
                    setUpdatingProductName(product.name);
                    setUpdatingProductPrice(product.price);
                    setIsOpenUpdate(true);
                }}
                setDeletingProduct={(deletingProduct: Category) => {
                    setProducts(products.filter(product => deletingProduct.id !== product.id))
                }}

            />
        </>
    )
}