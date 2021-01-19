import axios from "axios";
import React, { KeyboardEvent, useEffect, useState } from "react";
import { CommentItem } from "./CommentItem";

import '../sass/styles.scss'

const ENTER = "Enter";

export const ForumApp = () => {
    const [comment, setComment] = useState("")
    const [comments, setComments] = useState([])
    const [fetchComments, setFetchComments] = useState(true)
 
    useEffect(() => {
        const getComments = async () => {
            try {
                const query = await axios.get("http://127.0.0.1:8000/comments")
                setComments(query.data.comments)
            } catch (error) {
                console.log(error);
            } finally{
                setFetchComments(false)
            }
        }
        fetchComments && getComments()
    }, [fetchComments])

    const handleEnter = (e: KeyboardEvent) => {
        if (e.key === ENTER && !e.shiftKey) {
            e.preventDefault();
            makeComment();
        }
    };

    const makeComment = async () => {
        try {
            await axios.post("http://127.0.0.1:8000/comments/create", {
                date: new Date(),
                content: comment,
            })

            setComment("")
            setFetchComments(true)
        } catch (error) {
            console.log(error)
        }
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
                        <CommentItem key={comment._id} data={comment} fetchComments={setFetchComments}/>
                    ))
                }
            </div>
        </div>
    )
}
