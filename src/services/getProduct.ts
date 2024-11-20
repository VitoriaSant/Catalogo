import { api } from "@/services/api";

interface Produto {
    id: number;
    nome: string;
    preco: number;
}

interface ApiError {
    idError: string;
    messageError: string;
    error: unknown;
}

export async function getProdutos(token: string): Promise<Produto[]> {
    try {
        const response = await api({
            method: "GET",
            url: `${import.meta.env.VITE_API_URL}?UnitEMetodo=CATALOGO&Body=0`,
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data; 
    } catch (error: unknown) {
        throw {
            idError: "ERR_GET_PRODUCT",
            messageError: "Falha na busca de Produtos da API",
            error,
        } as ApiError;
    }
}
