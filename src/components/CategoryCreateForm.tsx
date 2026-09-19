import {type Dispatch, type SetStateAction, useState} from "react";
import type {Category} from "../types.ts";
import {createCategory} from "../services/api.ts";

export type CategoryCreateFormProps = {
    categories: Category[],
    setCategories: Dispatch<SetStateAction<Category[]>>,
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

export function CategoryCreateForm(
    {
        categories,
        setCategories,
        setIsOpen
    }: CategoryCreateFormProps) {

    const [categoryName, setCategoryName] = useState('');
    const [error, setError] = useState('');

    function handleSubmit(e: React.SubmitEvent) {
        e.preventDefault();
        setError('');

        createCategory(categoryName)
            .then((category: Category) => {
                setCategories([
                    ...categories,
                    category
                ]);
                setCategoryName('');
                setIsOpen(false);
            })
            .catch(() => {
                setError('Failed to create the category.');
            });
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                required
                minLength={2}
                placeholder={"Input Name"}
            />
            {error && <p className="error">{error}</p>}
            <button>Save</button>
        </form>
    )
}