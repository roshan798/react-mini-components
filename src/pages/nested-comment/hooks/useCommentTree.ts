import { useState } from "react"
import { Comment } from "../types/Comment"
import { Comment as CommentInterface } from "../types/Comment";
export type CommentActionsType = "upvote" | "downvote" | "edit";

const insertNode = (commentsTree: CommentInterface[], commentId: number, newComment: CommentInterface): CommentInterface[] => {
    return commentsTree.map((comment) => {
        if (comment.id === commentId) {
            return {
                ...comment,
                replies: [...comment.replies, newComment]
            }
        }

        return {
            ...comment,
            replies: insertNode(comment.replies, commentId, newComment)
        }
    });
}
const editNode = (commentsTree: CommentInterface[], commentId: number, type: CommentActionsType, content: string | undefined) => {
    return commentsTree.map((comment): Comment => {
        if (comment.id === commentId) {
            return editComment(comment, type, content)
        }

        return {
            ...comment,
            replies: editNode(comment.replies, commentId, type, content)
        }
    });
}

const deleteNode = (commentsTree: CommentInterface[], commentId: number): CommentInterface[] => {
    return commentsTree.reduce<CommentInterface[]>((acc, comment) => {
        if (comment.id === commentId) {
            return acc;
        }

        const updatedComment = {
            ...comment,
            replies: deleteNode(comment.replies, commentId)
        };

        acc.push(updatedComment);
        return acc;
    }, []);
};


const editComment = (comment: CommentInterface, type: CommentActionsType, content: string | undefined): Comment => {
    switch (type) {
        case "upvote":
            return { ...comment, votes: comment.votes + 1 }
        case "downvote":
            return { ...comment, votes: (comment.votes <= 0 ? comment.votes : comment.votes - 1) }
        case "edit":
            if (content)
                return { ...comment, content: content }
            return comment
    }
}


function useCommentTree(initialComments: Comment[]) {

    const [comments, setComments] = useState(initialComments);
    const insertComment = (commentId: number | null, content: string) => {
        const newComment: CommentInterface = {
            id: Date.now(),
            content: content.trim(),
            timestamp: new Date().toISOString(),
            replies: [],
            votes: 0
        }
        if (commentId !== null) {
            // it's a reply since it has comment ID
            setComments(prevComment => insertNode(prevComment, commentId, newComment))
        }
        else {
            // it is a new comment
            setComments(prev => [newComment, ...prev,])
        }
    }

    const editComment = (commentId: number, content: string) => {
        setComments(prevComments => editNode(prevComments, commentId, "edit", content));
    }

    const vote = (commentId: number, type: "upvote" | "downvote") => {
        setComments(prevComments => editNode(prevComments, commentId, type, undefined));
    }
    const deleteComment = (commentId: number) => {
        setComments(prevComments => deleteNode(prevComments, commentId));
    }
    return {
        comments,
        insertComment,
        editComment,
        deleteComment,
        upVote: (commentId: number) => {
            vote(commentId, "upvote")
        },
        downVote: (commentId: number) => { vote(commentId, "downvote") }
    }
}

export default useCommentTree