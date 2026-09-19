import type {Category} from "../types.ts";
import {type Dispatch, type SetStateAction, useState} from "react";
import {updateCategory} from "../services/api.ts";

export type CategoryUpdateFormProps = {
    updatingCategoryValue: string;
    updatingCategory: Category | null;
    categories: Category[];
    setCategories: Dispatch<SetStateAction<Category[]>>;
    setUpdatingCategoryValue: Dispatch<SetStateAction<string>>;
    setUpdatingCategory: Dispatch<SetStateAction<Category | null>>;
    setIsOpenUpdate: Dispatch<SetStateAction<boolean>>
}

export function CategoryUpdateForm(
    {
        updatingCategoryValue,
        updatingCategory,
        categories,
        setCategories,
        setUpdatingCategory,
        setUpdatingCategoryValue,
        setIsOpenUpdate
    } : CategoryUpdateFormProps){

    const [error, setError] = useState('');

    function handleUpdate(e: React.SubmitEvent){
        e.preventDefault();
        setError('');
        if(!updatingCategory) {
            setError('Failed to update the category. NULL');
            return
        }
        updateCategory({...updatingCategory, name:updatingCategoryValue})
            .then((category: Category) => {
                setCategories(categories.map(item =>
                    item.id === category.id
                        ? category
                        : item
                ));
                setUpdatingCategory(null);
                setUpdatingCategoryValue('');
                setIsOpenUpdate(false);
            })
            .catch(() => {
                setError('Failed to update the category.');
            });
    }
    return (
        <form onSubmit={handleUpdate}>
            <input type="text" value={updatingCategoryValue} onChange={e => setUpdatingCategoryValue(e.target.value)}/>
            {error && <p className="error">{error}</p>}
            <button>Save</button>
        </form>
    )
}