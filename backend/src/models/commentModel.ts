import mongoose, { Document, Schema } from 'mongoose';

interface IComment extends Document {
    content: string;
    author: mongoose.Types.ObjectId;
    blog: mongoose.Types.ObjectId;
}

const commentSchema: Schema = new Schema(
    {
        content: { type: String, required: true },
        author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        blog: { type: Schema.Types.ObjectId, ref: 'Blog', required: true },
    },
    {
        timestamps: true,
    }
);

const Comment = mongoose.model<IComment>('Comment', commentSchema);

export default Comment;
