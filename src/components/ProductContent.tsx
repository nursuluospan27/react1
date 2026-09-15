import * as React from "react";
import {type Dispatch, type SetStateAction, useState} from "react";
import type {Category, Product} from "../types.ts";
import {Modal} from "./Modal.tsx";
import {CategoryCreateForm} from "./CategoryCreateForm.tsx";
import {ProductCreateForm} from "./ProductCreateForm.tsx";

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
    const [isOpenUpdate, setIsOpenUpdate] = useState<boolean>(false)



    return (
        <>
            <button onClick={() => setIsOpen(true)} disabled={categories.length===0}>Create product</button>

            {isOpen &&
                <Modal onClose={() => setIsOpen(false)}>
                    <ProductCreateForm products={products} setProducts={setProducts} categories={categories}/>
                </Modal>
            }


            <div className="list">
                {products.length> 0 ?
                    <table>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                        </tr>
                        {products.map(product => (
                            <tr>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product?.category?.name}</td>
                            </tr>
                        ))
                        }
                    </table>
                    :
                    <p>Product`s list is empty</p>
                }
            </div>
        </>
    )
}