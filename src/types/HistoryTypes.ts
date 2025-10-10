import { AuthDetails } from "@/app/store/UseAuthStore";
import { QuestionDetails } from "./QuestionTypes";

export type HistoryDetails ={
    id?: string;
    userId: AuthDetails;
    questionId: QuestionDetails;
    createdAt?: Date;
    updatedAt?: Date;
}