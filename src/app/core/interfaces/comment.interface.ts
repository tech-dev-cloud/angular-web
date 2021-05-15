export enum ECommentType {
    product_review = 'product_review',
    lecture_query = 'lecture_query',
    feedback = 'feedback'
}
export interface IComment {
    _id: string;
    message: string;
    object_id: string;
    type: ECommentType;
    approved_type: 'pending' | 'main' | 'detail';
    createdAt: Date;
    rating: number;
    user?: any;
    is_edited: boolean;
    commentData?: IComment[];
    commentCounts?: number;
}
