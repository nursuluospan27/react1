import {Modal} from "./Modal.tsx";
import {CategoryCreateForm} from "./CategoryCreateForm.tsx";
import type {Category} from "../types.ts";
import {type Dispatch, type SetStateAction, useState} from "react";
import {CategoryList} from "./CategoryList.tsx";
import {CategoryUpdateForm} from "./CategoryUpdateForm.tsx";
import {deleteCategory} from "../services/api.ts";

export type CategoryContentProps = {
    categories: Category[];
    setCategories: Dispatch<SetStateAction<Category[]>>
}

export function CategoryContent({categories,setCategories }:CategoryContentProps) {

    const [updatingCategory, setUpdatingCategory] = useState<Category | null>(null);
    const [updatingCategoryValue, setUpdatingCategoryValue] = useState('');
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isOpenUpdate, setIsOpenUpdate] = useState<boolean>(false);
    const [error, setError] = useState('');

    return (
        <>
            <button onClick={() => setIsOpen(true)}>Create category</button>

            {isOpen &&
                <Modal onClose={() => setIsOpen(false)}>
                    <CategoryCreateForm
                        categories={categories}
                        setCategories={setCategories}
                        setIsOpen={setIsOpen}
                    />
                </Modal>
            }

            {isOpenUpdate &&
                <Modal  onClose={() => setIsOpenUpdate(false)}>
                    <CategoryUpdateForm
                        updatingCategoryValue={updatingCategoryValue}
                        updatingCategory={updatingCategory}
                        categories={categories}
                        setCategories={setCategories}
                        setUpdatingCategoryValue={setUpdatingCategoryValue}
                        setUpdatingCategory={setUpdatingCategory}
                        setIsOpenUpdate={setIsOpenUpdate}
                    />

                </Modal>
            }

            {error && <p className="error">{error}</p>}
            <CategoryList
                categories={categories}
                setUpdatingCategory={(category: Category) => {
                    setUpdatingCategory(category);
                    setUpdatingCategoryValue(category.name);
                    setIsOpenUpdate(true);
                }}
                setDeletingCategory={(deletingCategory: Category) => {
                    setError('');
                    deleteCategory(deletingCategory.id)
                        .then(() => {
                            setCategories(categories.filter(category => deletingCategory.id !== category.id))
                        })
                        .catch(() => {
                            setError('Failed to delete the category.');
                        });

                }}
            />

        </>
    )
}