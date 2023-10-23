interface ErrorOptions {
    message: string;
    code?: number | string;
};

export class BaseError extends Error {
    public code: number | string;

    constructor(options: ErrorOptions) {
        super(options.message);
        this.name = this.constructor.name;
        this.code = options?.code || "UNKNOWN_CODE";
        Error.captureStackTrace(this, this.constructor);
    };
};

export class InvalidBuilder extends BaseError { };
export class FetchError extends BaseError { };