import type {Category, Product} from "../types.ts";

type CategoryDeleteConfirmationProps = {
    category: Category;
    relatedProducts: Product[];
    onClose: () => void;
    onConfirm: () => void;
}

export function CategoryDeleteConfirmation({
    category,
    relatedProducts,
    onClose,
    onConfirm
}: CategoryDeleteConfirmationProps) {
    return (
        <div className="delete-confirmation">
            <h2>{category.name}:</h2>
            <ul>
                {relatedProducts.map(product => (
                    <li key={product.id}>{product.name}</li>
                ))}
            </ul>
            <p>У этой категории есть связанные товары.</p>
            <p>Желаете удалить их вместе?</p>
            <div className="delete-confirmation__actions">
                <button onClick={onClose}>Отменить</button>
                <button onClick={onConfirm}>Подтвердить</button>
            </div>
        </div>
    )
}
