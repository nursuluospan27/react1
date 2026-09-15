import * as React from "react";
import {type Dispatch, type SetStateAction, useState} from "react";
import type {Product} from "../types.ts";

export type ProductContentProps = {
    products: Product[];
    setProducts: Dispatch<SetStateAction<Product[]>>
}

export  function ProductContent({products, setProducts}: ProductContentProps){
    const [nameValue, setNameValue] = useState('');
    const [priceValue, setPriceValue] = useState(0);

    function handleSubmit(e: React.SubmitEvent) {
        e.preventDefault();

        setProducts([...products, {"name": nameValue, "price": priceValue}]);
        setNameValue('');
        setPriceValue(0);
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={nameValue}
                    onChange={(e) => setNameValue(e.target.value)}
                    required
                    minLength={2}
                    placeholder={"Input Name"}
                />
                <input
                    type="number"
                    value={priceValue}
                    onChange={(e) => setPriceValue(Number(e.target.value))}
                    required
                    min={1}
                    placeholder={"Input Price"}
                />
                <button>Save</button>
            </form>
            <div className="list">
                {products.length> 0 ?
                    <table>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                        </tr>
                        {products.map(product => (
                            <tr>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
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