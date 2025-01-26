import { useState } from "react";
import useCommentTree from "./hooks/useCommentTree";
import Comment from "./components/Comment";
import { Send, Filter, ThumbsUp, ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import comments from "./data/nestedCommentsData.json"
function NestedComments() {
    const {
        comments: commentsData,
        insertComment,
        editComment,
        deleteComment,
        upVote,
        downVote,
        sortComments
    } = useCommentTree(comments);

    const [comment, setComment] = useState<string>("");
    const [isFilterOpen, setIsFilterOpen] = useState(false);

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
        } else {
            deleteComment(commentId);
        }
    };

    const toggleFilter = () => {
        setIsFilterOpen(!isFilterOpen);
    };

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
            <div className="comments-list mt-6 space-y-4 py-4 px-2 border border-solid rounded border-gray-800 bg-white dark:bg-neutral-800">
                {/* Filter Header */}
                <div className="flex justify-between items-center px-4 py-2 bg-gray-100 dark:bg-neutral-700 rounded-md shadow-sm">
                    <span className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                        Comments
                    </span>
                    <div className="relative">
                        {/* Filter Button */}
                        <button
                            className="flex items-center gap-2 bg-violet-600 text-white px-3 py-2 text-sm rounded-md hover:bg-violet-700 transition-all"
                            onClick={toggleFilter}
                        >
                            <Filter size={18} />
                            <span>Filter</span>
                        </button>

                        {/* Dropdown Menu */}
                        {isFilterOpen && (
                            <div className="z-10 absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg dark:bg-neutral-700 dark:border-neutral-500">
                                <button onClick={() => sortComments("newest")} className="flex items-center w-full p-2 hover:bg-gray-100 dark:hover:bg-neutral-600 text-gray-800 dark:text-gray-100">
                                    <ArrowDownCircle size={18} className="mr-2" />
                                    Newest
                                </button>
                                <button onClick={() => sortComments("oldest")} className="flex items-center w-full p-2 hover:bg-gray-100 dark:hover:bg-neutral-600 text-gray-800 dark:text-gray-100">
                                    <ArrowUpCircle size={18} className="mr-2" />
                                    Oldest
                                </button>
                                <button onClick={() => sortComments("most-votes")} className="flex items-center w-full p-2 hover:bg-gray-100 dark:hover:bg-neutral-600 text-gray-800 dark:text-gray-100">
                                    <ThumbsUp size={18} className="mr-2" />
                                    By Most Votes
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Nested Comments */}
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
