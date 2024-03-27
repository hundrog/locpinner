export type ApiError = {
    message?: string
}

export type ApiResponse = {
    data: any,
    error: ApiError | null
}
