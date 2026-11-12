
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiFetch(endpoint, options = {}) {
    let accessToken = sessionStorage.getItem("access");

    // First request
    let response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${accessToken}`,
        },
    });

    // If access token has expired
    if (response.status === 401) {
        const refreshToken = sessionStorage.getItem("refresh");

        if (!refreshToken) {
            sessionStorage.clear();
            window.location.href = "/login";
            return response;
        }

        try {
            // Request a new access token
            const refreshResponse = await fetch(
                `${API_URL}/api/token/refresh/`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        refresh: refreshToken,
                    }),
                }
            );

            if (!refreshResponse.ok) {
                throw new Error("Token refresh failed");
            }

            const data = await refreshResponse.json();

            // Save the new access token
            accessToken = data.access;
            sessionStorage.setItem("access", accessToken);

            // Retry original request
            response = await fetch(`${API_URL}${endpoint}`, {
                ...options,
                headers: {
                    ...options.headers,
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            return response;
        } catch (error) {
            console.error("Authentication refresh failed:", error);

            sessionStorage.clear();
            window.location.href = "/login";
            return response;
        }
    }

    return response;
}
