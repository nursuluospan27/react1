import type {Category, Product} from "../types.ts";

const BASE_URL = 'https://practicetasks.kz/api';

function request<T, B = undefined>(path: string, method: string = 'GET', body?: B) : Promise<T> {
    return fetch(BASE_URL + path, {
        method: method,
        body: body !== undefined ? JSON.stringify(body) : undefined
    })
        .then(resp => {
            if(!resp.ok) {
                throw new Error('');
            }
            if (resp.status === 204) {
                return undefined as T;
            }
            return resp.json();
        })
        .then(data => data as T)
}

export function getAllCategories(): Promise<Category[]> {
    return request<Category[]>('/categories')
}

export function getAllProducts(): Promise<Product[]> {
    return request<Product[]>('/products')
}

export function createCategory(name: string) {
    return request<Category, { name: string }>('/categories', 'POST', {name})
}

export function updateCategory(category: Category) {
    return request<Category, Category>('/categories', 'PUT', category)
}

export function deleteCategory(id: number) {
    return request<void>(`/categories/${id}`, 'DELETE')
}

export function createProduct(name: string, price: number, categoryId: number) {
    return request<Product, { name: string, price: number, categoryId: number }>('/products', 'POST', {name, price, categoryId})
}

export function updateProduct(product: Product) {
    return request<Product, Product>('/products', 'PUT', product)
}

export function deleteProduct(id: number) {
    return request<void>(`/products/${id}`, 'DELETE')
}