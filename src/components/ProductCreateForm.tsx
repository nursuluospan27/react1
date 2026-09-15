import * as React from "react";
import {type Dispatch, type SetStateAction, useState} from "react";
import type {Category, Product} from "../types.ts";

export type ProductCreateFormProps = {
    products: Product[]
    setProducts: Dispatch<SetStateAction<Product[]>>,
    categories: Category[],
    setIsOpen: Dispatch<SetStateAction<boolean>>
}
export function ProductCreateForm (
    {
        products,
        setProducts,
        categories,
        setIsOpen
    } : ProductCreateFormProps){

    const [nameValue, setNameValue] = useState('');
    const [priceValue, setPriceValue] = useState(0);
    const [categoryValue, setCategoryValue] = useState<string>('');


    function handleSubmit(e: React.SubmitEvent) {
        e.preventDefault();
        const selectedCategory = categories.find(
            (item) => item.id === categoryValue
        );
        if (!selectedCategory) return

        setProducts([...products, {id:  crypto.randomUUID(), name: nameValue, price: priceValue, category: selectedCategory}]);
        setNameValue('');
        setPriceValue(0);
        setCategoryValue('');
        setIsOpen(false);
    }

    return (
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
            <select
                name="category"
                id="category"
                value={categoryValue}
                required
                onChange={(e) => setCategoryValue(e.target.value)}
            >
                <option value="" disabled>
                    Select category
                </option>
                {categories.map((item) => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                ))}
            </select>
            <button>Save</button>
        </form>
    )
}