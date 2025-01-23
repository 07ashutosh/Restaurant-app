class ApiError extends Error {
    statusCode: number;            // HTTP status code (e.g., 400, 404, 500)
    data: any | null;              // Optional data, defaulting to null
    success: boolean;              // Indicates success, always false for errors
    errors: string[];              // Array of detailed error messages (if any)
    
    constructor(
        statusCode: number,                  // HTTP status code (required)
        message: string = "Something went wrong", // Default error message
        errors: string[] = [],               // Detailed error messages (optional)
        stack?: string                       // Optional stack trace for debugging
    ) {
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.success = false;
        this.errors = errors;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export { ApiError };
