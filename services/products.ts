import { api } from "./api";
import { Product, ProductSize } from "@/types/product";

export interface GetProductsResponse {
    page: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
    products: Product[];
};

export interface GetProductsParams {
    page?: number;
    perPage?: number;
    sortBy?: "price" | "createdAt" | "title";
    order?: "asc" | "desc";
    search?: string;
    size?: ProductSize;
    category?: string;
};

export interface CreateProductPayload {
    title: string;    
    description?: string;    
    price: number;    
    sizes: ProductSize[];    
    category?: string;   
    imageUrl?: string[];    
    inStock?: boolean;    
}

export interface UpdateProductPayload {
    title?: string;
    description?: string;
    price?: number;
    sizes?: ProductSize[];
    category?: string;
    imageUrl?: string[];
    inStock?: boolean;
}

export const getAllProducts = async (params?: GetProductsParams): Promise<GetProductsResponse> => {
    const { data } = await api.get<GetProductsResponse>("/products", { params });
    return data;
};

export const getProductById = async (id: string): Promise<Product> => {
    const { data } = await api.get<Product>(`/products/${id}`);
    return data;
};

export const createProduct = async (productData: CreateProductPayload): Promise<Product> => {
    const { data } = await api.post<Product>("/products", productData);
    return data;
};

export const deleteProduct = async (id: string): Promise<Product> => {
    const { data } = await api.delete<Product>(`/products/${id}`);
    return data;
};

export const updateProduct = async (id: string, productData: UpdateProductPayload): Promise<Product> => {
    const { data } = await api.patch<Product>(`/products/${id}`, productData);
    return data;
};

export const uploadProductImages = async (id: string, formData: FormData): Promise<{ url: string[] }> => {
    const { data } = await api.patch<{ url: string[] }>(`/products/${id}/images`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return data;
};