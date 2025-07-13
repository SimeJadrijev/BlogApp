import c from './index.module.css';
import { useComments } from '../../hooks/useComments.ts';
import { useAddComment } from '../../hooks/useAddComment.ts';
import React, { useState } from 'react';

type CommentsSectionProps = {
    blogId: string;
};

export const CommentsSection: React.FC<CommentsSectionProps> = ({ blogId }) => {
    const { data: comments, isLoading } = useComments(blogId);
    const addComment = useAddComment(blogId);
    const [commentText, setCommentText] = useState('');

    const handleAddComment = () => {
        if (commentText.trim()) {
            addComment.mutate(commentText, {
                onSuccess: () => {
                    setCommentText('');
                },
            });
        }
    };

    return (
        <div className={c.commentsSection}>
            <h3>Comments</h3>
            {isLoading ? (
                <p>Loading comments...</p>
            ) : (
                comments?.map((comment) => (
                    <div key={comment._id} className={c.comments}>
                        <p>
                            <strong>{comment.author.username}: &nbsp;</strong>
                            {comment.content}
                        </p>
                    </div>
                ))
            )}
            <div className={c.commentForm}>
                <textarea
                    placeholder="Write a comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                />
                <button onClick={handleAddComment}>Add Comment</button>
            </div>
        </div>
    );
};
