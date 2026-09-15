import type {Product} from "../types.ts";

export type ProductListProps = {
    products: Product[],
    setUpdatingProduct: (product: Product) => void;
    setDeletingProduct: (product: Product) => void;
}

export function ProductList(
    {
        products,
        setUpdatingProduct,
        setDeletingProduct
    }: ProductListProps) {
    return (
        <div className="list">
            {products.length> 0 ?
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th></th>
                    </tr>
                    {products.map(product => (
                        <tr>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product?.category?.name}</td>
                            <td>
                                <button onClick={() => setUpdatingProduct(product)}>Edit</button>
                                <button onClick={() => setDeletingProduct(product)}>Delete</button>
                            </td>
                        </tr>
                    ))
                    }
                </table>
                :
                <p>Product`s list is empty</p>
            }
        </div>
    )
}