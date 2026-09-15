import type {Category} from "../types.ts";
import type {Dispatch, SetStateAction} from "react";

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

    function handleUpdate(e: React.SubmitEvent){
        e.preventDefault();
        if(!updatingCategory) return;

        setCategories(categories.map(category =>
            category.id === updatingCategory.id
                ? {...updatingCategory, name: updatingCategoryValue}
                : category
        ));
        setUpdatingCategory(null);
        setUpdatingCategoryValue('');
        setIsOpenUpdate(false)

    }
    return (
        <>
            {updatingCategory && (
                <form onSubmit={handleUpdate}>
                    <input type="text" value={updatingCategoryValue} onChange={e => setUpdatingCategoryValue(e.target.value)}/>
                    <button>Save</button>
                </form>
            )}
        </>
    )
}