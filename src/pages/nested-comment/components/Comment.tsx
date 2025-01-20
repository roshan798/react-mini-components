import { useState } from "react";
import { Comment as CommentInterface } from "../types/Comment";
import Tooltip from "./Tooltip"
import { Reply, Edit, Trash, EyeOff, Eye, ThumbsUp, ThumbsDown } from "lucide-react";
import ConfirmationDialog from "./ConfirmationDialog";

interface CommentProps {
    comment: CommentInterface;
    handleReply: (commentId: number | null, content: string) => void;
    handleEditReply: (commentId: number, content: string) => void;
    upVote: (commentId: number) => void;
    downVote: (commentId: number) => void;
    deleteComment: (commentId: number) => void;
}

function Comment({
    comment,
    handleReply,
    upVote,
    downVote,
    deleteComment,
    handleEditReply,
}: CommentProps) {
    const [expanded, setExpanded] = useState<boolean>(false);
    const [showReplies, setShowReplies] = useState<boolean>(false);
    const [reply, setReply] = useState<string>("");
    const [isReplying, setIsReplying] = useState<boolean>(false);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

    const handleReplySubmit = () => {
        if (reply.trim().length > 0) {
            handleReply(comment.id, reply);
            setReply("");
            setExpanded(false);
            setShowReplies(true);
        }
    };

    const toggleReplies = () => setShowReplies((prev) => !prev);

    const confirmDelete = () => {
        console.log("confirmDelete : ", comment.id);

        deleteComment(comment.id);
        setIsDialogOpen(false);
    };

    const handleEditReplyClick = () => {
        handleEditReply(comment.id, reply);
        setReply("");
        setIsReplying(false);
        setExpanded(false);
    };

    return (
        <div className="relative border-l-4 border-blue-500 pl-4 transition-all">
            {/* Comment Content */}
            <div className="p-4 rounded-md shadow-sm dark:text-white bg-gray-100 dark:bg-neutral-800">
                <p className="text-sm font-medium">{comment.content}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                    {new Date(comment.timestamp).toLocaleString()}
                </p>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                    {/* Upvote Button */}
                    <Tooltip tooltipText="Upvote">
                        <button
                            className="flex items-center justify-center gap-1 text-green-600 bg-green-500 bg-opacity-10 hover:bg-opacity-20 border-green-600 border rounded-md py-2 px-4 transition-all"
                            onClick={() => upVote(comment.id)}
                            aria-label="Upvote this comment"
                        >
                            <ThumbsUp size={16} />
                            <span className=" border-l border-green-600 border-opacity-50 pl-1 text-xs">{comment.votes}</span>
                        </button>
                    </Tooltip>

                    {/* Downvote Button */}
                    <Tooltip tooltipText="Downvote">
                        <button
                            className="flex items-center justify-center gap-1 text-red-600 bg-red-500 bg-opacity-10 hover:bg-opacity-20 border-red-600 border rounded-md py-2 px-4 transition-all"
                            onClick={() => downVote(comment.id)}
                            aria-label="Downvote this comment"
                        >
                            <ThumbsDown size={16} />
                        </button>
                    </Tooltip>

                    {/* Show/Hide Replies Button */}
                    {comment.replies.length > 0 && (
                        <Tooltip tooltipText={showReplies ? "Hide replies" : "Show replies"}>
                            <button
                                className="flex items-center gap-1 text-sm text-blue-600 bg-blue-500 bg-opacity-5 hover:bg-opacity-20 border-blue-600 border rounded-md py-2 px-4 transition-all"
                                onClick={toggleReplies}
                                aria-label={showReplies ? "Hide replies" : "Show replies"}
                            >
                                {showReplies ? <EyeOff size={16} /> : <Eye size={16} />}
                                <span className="text-blue-800">{comment.replies.length}</span>
                            </button>
                        </Tooltip>
                    )}

                    {/* Reply Button */}
                    <Tooltip tooltipText="Reply to this comment">
                        <button
                            className="flex items-center gap-1 text-sm text-blue-600 bg-blue-500 bg-opacity-5 hover:bg-opacity-20 border-blue-600 border rounded-md py-2 px-4 transition-all"
                            onClick={() => {
                                if (isReplying) {
                                    setReply("")
                                }
                                setIsReplying(false);

                                setExpanded(true);
                            }}
                            aria-label="Reply to this comment"
                        >
                            <Reply size={16} />
                        </button>
                    </Tooltip>

                    {/* Edit Button */}
                    <Tooltip tooltipText="Edit this comment">
                        <button
                            className="flex items-center gap-1 text-sm text-green-600 bg-green-500 bg-opacity-10 hover:bg-opacity-20 border-green-600 border rounded-md py-2 px-4 transition-all"
                            onClick={() => {
                                setIsReplying(true);
                                setReply(comment.content);
                                setExpanded(true);
                            }}
                            aria-label="Edit this comment"
                        >
                            <Edit size={16} />
                        </button>
                    </Tooltip>

                    {/* Delete Button */}
                    <Tooltip tooltipText="Delete this comment">
                        <button
                            className="flex items-center gap-1 text-sm text-red-600 bg-red-500 bg-opacity-10 hover:bg-opacity-20 border-red-600 border rounded-md py-2 px-4 transition-all"
                            onClick={() => setIsDialogOpen(true)}
                            aria-label="Delete this comment"
                        >
                            <Trash size={16} />
                        </button>
                    </Tooltip>
                </div>
            </div>

            {/* Replies Section */}
            {showReplies && comment.replies.length > 0 && (
                <div className="mt-4 space-y-4">
                    {comment.replies.map((reply) => (
                        <Comment
                            key={reply.id}
                            comment={reply}
                            handleReply={handleReply}
                            upVote={upVote}
                            downVote={downVote}
                            deleteComment={deleteComment}
                            handleEditReply={handleEditReply}
                        />
                    ))}
                </div>
            )}

            {/* Reply Input Box */}
            {expanded && (
                <div className="mt-4 relative flex items-center gap-2 border p-2 rounded-md border-gray-300 shadow-sm bg-white dark:bg-neutral-800 dark:border-neutral-600">
                    <textarea
                        name="add reply"
                        value={reply}
                        onChange={(e) => setReply(e.target.value)}
                        rows={1}
                        className="flex-grow outline-none p-2 text-base text-gray-700 bg-gray-50 rounded-md border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:outline-none dark:text-gray-100 dark:bg-neutral-700 dark:border-neutral-500 resize-none"
                        placeholder="Your reply..."
                        autoFocus
                    />
                    <button
                        type="button"
                        className="flex items-center gap-2 bg-gray-400 text-white px-4 py-2 text-sm rounded-md hover:bg-gray-500 transition-all"
                        onClick={() => {
                            setExpanded(false);
                        }}
                        aria-label="Cancel reply"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 text-sm rounded-md hover:bg-blue-700 transition-all disabled:opacity-50"
                        onClick={isReplying ? handleEditReplyClick : handleReplySubmit}
                        disabled={!reply.trim()}
                        aria-label="Post reply"
                    >
                        {isReplying ? "Edit" : " Post"}
                    </button>
                </div>
            )}

            {/* Confirmation Dialog */}
            <ConfirmationDialog
                isOpen={isDialogOpen}
                message="Are you sure you want to delete this comment?"
                onConfirm={confirmDelete}
                onCancel={() => setIsDialogOpen(false)}
            />
        </div>
    );
}

export default Comment;
