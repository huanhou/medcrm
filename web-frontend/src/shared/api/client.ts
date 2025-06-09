interface FetchOptions extends RequestInit {
    url: string;
    json?: any;
    requireAuth?: boolean;
}

export async function apiClient<T = any>(options: FetchOptions): Promise<T> {
    const { url, json, requireAuth = false, ...fetchOptions } = options;

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(fetchOptions.headers as Record<string, string> || {}),
    };

    const response = await fetch(url, {
        ...fetchOptions,
        headers,
        credentials: requireAuth ? 'include' : 'same-origin',
        body: json ? JSON.stringify(json) : fetchOptions.body,
    });

    if (response.status === 401 && requireAuth) {
        throw new Error('Unauthorized');
    }

    return parseResponse<T>(response);
}

async function parseResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
        let errorMessage = `Error ${response.status}: ${response.statusText}`;
        try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorMessage;
        } catch {}
        throw new Error(errorMessage);
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
        return response.json();
    }

    return response.text() as unknown as T;
}
