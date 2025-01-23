class ApiResponse<T> {
    statusCode: number;  // HTTP status code (e.g., 200, 201, 400, 500)
    data: T;            // Generic type for the response data
    message: string;     // Message associated with the response
    success: boolean;    // Indicates if the response is successful

    constructor(
        statusCode: number,       // HTTP status code (required)
        data: T,                  // Response data (required)
        message: string = "success" // Default message (optional)
    ) {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400; // Consider success if status code is less than 400
    }
}

export { ApiResponse };
