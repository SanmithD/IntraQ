import { AuthDetails } from "@/app/store/UseAuthStore";
import { QuestionDetails } from "./QuestionTypes";

export type HistoryDetails ={
    _id?: string;
    userId: AuthDetails;
    questionId: QuestionDetails;
    createdAt?: Date;
    updatedAt?: Date;
}

export type SearchHistory ={
    _id?: string;
    company: string;
    language: string;
    question: string;
    role: string;
    solution?: string;
    userId: AuthDetails;
    createdAt?: Date;
    updatedAt?: Date;
}