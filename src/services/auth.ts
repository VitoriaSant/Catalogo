import { api } from "@/services/api";

// Tipagem para a resposta da API
interface AuthResponse {
    token_Acesso: string;
}

interface AuthError {
    idError: string;
    messageError: string;
    error: unknown; // Pode ser mais específico dependendo de como o erro é estruturado
}

export async function auth(): Promise<string> {
    try {
        const atentication = await api.post<AuthResponse>(
            import.meta.env.VITE_API_AUTH_URL,
            {
                token: import.meta.env.VITE_TOKEN_PESSOA,
                sistema: 1,
                quebra: 1,
            }
        );
        return atentication.data.token_Acesso;
    } catch (error: unknown) {
        // Lançando o erro com o tipo correto
        throw {
            idError: "ERR_AUTH",
            messageError: "Falha na autenticação com a API",
            error,
        } as AuthError;
    }
}
