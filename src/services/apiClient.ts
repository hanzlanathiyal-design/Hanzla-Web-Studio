export class ApiError extends Error {
  public status: number;
  public details?: any;

  constructor(message: string, status = 500, details?: any) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

export async function apiClient<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
    ...options,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMsg =
      data.message ||
      (data.errors && data.errors.map((e: any) => e.message).join(", ")) ||
      `Request failed with status ${response.status}`;
    throw new ApiError(errorMsg, response.status, data.errors);
  }

  return data as T;
}
