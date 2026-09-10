import type {Category} from "../types.ts";

export type CategoryListProps = {
    categories: Category[];
    setUpdatingCategory: (category: Category) => void;
    setDeletingCategory: (category: Category) => void;
    }

export function CategoryList(
    {
        categories,
        setUpdatingCategory,
        setDeletingCategory
    } : CategoryListProps) {
    return (
        <div className="list">
            {categories.length> 0 ?
                <table>
                    <tr>
                        <th>Name</th>
                        <th></th>
                    </tr>
                    {categories.map(category => (
                        <tr key={category.id}>
                            <td>{category.name}</td>
                            <td>
                                <button onClick={() => setUpdatingCategory(category)}>Edit</button>
                                <button onClick={() => setDeletingCategory(category)}>Delete</button>
                            </td>
                        </tr>
                    ))
                    }
                </table>
                :
                <p>List is empty</p>
            }
        </div>
    )
}