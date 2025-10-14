import { AuthDetails } from "@/app/store/UseAuthStore";
import { QuestionDetails } from "./QuestionTypes";

export type BookmarkDetails ={
    _id: string;
    createdAt?: Date;
    updatedAt?: Date;
    questionId: QuestionDetails;
    userId: AuthDetails
}