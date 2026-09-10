import {useState} from "react";
import type {Category} from "../types.ts";

export type CategoryCreateFormProps = {
    categories: Category[],
    setCategories: (category: Category[]) => void
}

export function CategoryCreateForm({categories, setCategories}: CategoryCreateFormProps) {

    const [categoryName, setCategoryName] = useState('');

    function handleSubmit(e: React.SubmitEvent) {
        e.preventDefault();
        console.log(categoryName);
        setCategories([...categories, {"id": crypto.randomUUID(), "name": categoryName}]);
        setCategoryName('');
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
            <button>Save</button>
        </form>
    )
}