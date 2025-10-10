import { AuthDetails } from "@/app/store/UseAuthStore";

export type QuestionDetails ={
    id?: string;
    userId: AuthDetails;
    company: string;
    language: string;
    role: string;
    question: string;
    solution?: string;
    createdAt?: Date;
    updatedAt?: Date;
}