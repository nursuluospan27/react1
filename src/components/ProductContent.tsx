import {type Dispatch, type SetStateAction, useState} from "react";
import type {Category, Product} from "../types.ts";
import {Modal} from "./Modal.tsx";
import {ProductCreateForm} from "./ProductCreateForm.tsx";
import {ProductList} from "./ProductList.tsx";
import {ProductUpdateForm} from "./ProductUpdateForm.tsx";
import {deleteCategory, deleteProduct} from "../services/api.ts";

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
    const [error, setError] = useState('');

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
                        category={categories.find(
                            category => category.id === updatingProduct?.categoryId
                        )}
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
            {error && <p className="error">{error}</p>}
            <ProductList
                products={products}
                categories={categories}
                setUpdatingProduct={(product: Product) => {
                    setUpdatingProduct(product);
                    setUpdatingProductName(product.name);
                    setUpdatingProductPrice(product.price);
                    setIsOpenUpdate(true);
                }}
                setDeletingProduct={(deletingProduct: Product) => {
                    setError('');
                    deleteProduct(deletingProduct.id)
                        .then(() => {
                            setProducts(products.filter(product => deletingProduct.id !== product.id))
                        })
                        .catch(() => {
                            setError('Failed to delete the product.');
                        });

                }}

            />
        </>
    )
}