export interface Credential {
    Email: string;
    Password: string;
    ConfirmPassword: string;
    Role: string;
}

export interface Quote {
    QuoteID: number;
    quoteType: string;
    Contact: string;
    Task: string;
    DueDate: string;
    TaskType: string;
}