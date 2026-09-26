import {Modal} from "./Modal.tsx";
import {CategoryCreateForm} from "./CategoryCreateForm.tsx";
import type {Category, Product} from "../types.ts";
import {type Dispatch, type SetStateAction, useState} from "react";
import {CategoryList} from "./CategoryList.tsx";
import {CategoryUpdateForm} from "./CategoryUpdateForm.tsx";
import {CategoryDeleteConfirmation} from "./CategoryDeleteConfirmation.tsx";

export type CategoryContentProps = {
    categories: Category[];
    setCategories: Dispatch<SetStateAction<Category[]>>;
    products: Product[];
    setProducts: Dispatch<SetStateAction<Product[]>>;
}

export function CategoryContent({categories, setCategories, products, setProducts}: CategoryContentProps) {

    const [updatingCategory, setUpdatingCategory] = useState<Category | null>(null);
    const [updatingCategoryValue, setUpdatingCategoryValue] = useState('');
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isOpenUpdate, setIsOpenUpdate] = useState<boolean>(false)
    const [deletingCategory, setDeletingCategory] = useState<Category | null>(null);

    function deleteCategory(category: Category) {
        setCategories(current => current.filter(item => item.id !== category.id));
    }

    return (
        <>
            <button onClick={() => setIsOpen(true)}>Create category</button>

            {isOpen &&
                <Modal onClose={() => setIsOpen(false)}>
                    <CategoryCreateForm
                        categories={categories}
                        setCategories={(categories: Category[])=> setCategories(categories)}
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

            {deletingCategory &&
                <Modal onClose={() => setDeletingCategory(null)}>
                    <CategoryDeleteConfirmation
                        category={deletingCategory}
                        relatedProducts={products.filter(
                            product => product.category?.id === deletingCategory.id
                        )}
                        onClose={() => setDeletingCategory(null)}
                        onConfirm={() => {
                            deleteCategory(deletingCategory);
                            setProducts(current => current.filter(
                                product => product.category?.id !== deletingCategory.id
                            ));
                            setDeletingCategory(null);
                        }}
                    />
                </Modal>
            }

            <CategoryList
                categories={categories}
                setUpdatingCategory={(category: Category) => {
                    setUpdatingCategory(category);
                    setUpdatingCategoryValue(category.name);
                    setIsOpenUpdate(true);
                }}
                setDeletingCategory={(category: Category) => {
                    const hasRelatedProducts = products.some(
                        product => product.category?.id === category.id
                    );

                    if (hasRelatedProducts) {
                        setDeletingCategory(category);
                    } else {
                        deleteCategory(category);
                    }
                }}
            />

        </>
    )
}
