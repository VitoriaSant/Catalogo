import { api } from "@/services/api";

interface AuthResponse {
    token_Acesso: string;
}

interface AuthError {
    idError: string;
    messageError: string;
}
export async function auth(){
    try {
        const atentication = await api.post<AuthResponse>(
            import.meta.env.VITE_API_AUTH_URL,
            {
                token: import.meta.env.VITE_TOKEN_PESSOA,
                sistema: 1,
                quebra: 1,
            }
        );
        localStorage.setItem("auth_token", atentication.data.token_Acesso);
        // return atentication.data.token_Acesso;
    } catch (error: unknown) {
        // Lançando o erro com o tipo correto
        throw {
            idError: "ERR_AUTH",
            messageError: "Falha na autenticação com a API",
            error,
        } as AuthError;
    }
}
