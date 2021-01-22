import React, { KeyboardEvent, useEffect, useState } from "react";
import { CommentItem } from "./CommentItem";
import { useDispatch, useSelector } from "react-redux";

import '../sass/styles.scss'
import { getComments, postComment } from "../redux/comments";

const ENTER = "Enter";

export const ForumApp = () => {
    const [comment, setComment] = useState("")

    const dispatch = useDispatch()
    const comments = useSelector((store : any) => store.comments.comments)

    useEffect(() => {
        dispatch(getComments())
    },[dispatch])

    const handleEnter = (e: KeyboardEvent) => {
        if (e.key === ENTER && !e.shiftKey) {
            e.preventDefault()
            makeComment()
        }
    };

    const makeComment = () => {
        dispatch(postComment(comment))
        setComment("")
    };

    return (
        <div className="forum-app">
            <div className="comment-board">
                <h1>Post your comment</h1>
                <textarea
                    placeholder="Write something to us"
                    onChange={(e) => setComment(e.target.value)}
                    onKeyDown={handleEnter}
                    value={comment}
                ></textarea>
                <br />
                <button onClick={makeComment}>Comment</button>
            </div>
            <div className="comments-display">
                {
                    comments.map((comment : any) => (
                        <CommentItem key={comment._id} data={comment} />
                    ))
                }
            </div>
        </div>
    )
}
