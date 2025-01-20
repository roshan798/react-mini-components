import { useState } from "react";
import useCommentTree from "./hooks/useCommentTree";
import { Comment as CommentInterface } from "./types/Comment";
import Comment from "./components/Comment";
import { Send } from "lucide-react";


function NestedComments({ comments }: { comments: CommentInterface[] }) {
    const { comments: commentsData,
        insertComment,
        editComment,
        deleteComment,
        upVote,
        downVote
    } = useCommentTree(comments);
    const [comment, setComment] = useState<string>("");

    const handleReply = (commentId: number | null, content: string) => {
        if (content.trim().length > 0) {
            insertComment(commentId, content);
            if (commentId === null) {
                setComment("");
            }
        }
    };
    const handleEditReply = (commentId: number, content: string) => {
        if (content.trim()) {
            editComment(commentId, content);
        }
        else {
            // this will delete without confirmation so don't use it    
            deleteComment(commentId)
        }
    }

    return (
        <div className="p-4">
            {/* Add Comment Input Section */}
            <div className="relative flex items-center gap-2 border p-3 rounded-md border-gray-300 shadow-sm bg-white dark:bg-neutral-800 dark:border-neutral-600 my-4">
                <textarea
                    name="add-comment"
                    id="add-comment"
                    rows={1}
                    className="flex-grow outline-none p-1 text-base text-gray-700 bg-gray-50 rounded-md border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:outline-none dark:text-gray-100 dark:bg-neutral-700 dark:border-neutral-500 "
                    placeholder="Add a new comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button
                    type="button"
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 text-sm rounded-md hover:bg-blue-700 transition-all"
                    style={{ height: "100%" }}
                    onClick={() => handleReply(null, comment)}
                >
                    <Send size={16} /> Add Comment
                </button>
            </div>

            {/* Comments Section */}
            <div className="comments-list mt-6 space-y-4 py-4 px-2  border border-solid rounded border-gray-800">
                {commentsData.map((comment) => (
                    <Comment
                        key={comment.id}
                        comment={comment}
                        upVote={upVote}
                        downVote={downVote}
                        handleReply={handleReply}
                        deleteComment={deleteComment}
                        handleEditReply={handleEditReply}
                    />
                ))}
            </div>
        </div>
    );
}

export default NestedComments;
