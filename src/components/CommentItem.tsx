import React, { useState } from "react";
import { Button } from "react-bootstrap";
import axios from 'axios'

export const CommentItem = ({data, fetchComments} : any) => {

    const [onEdit, setOnEdit] = useState(false)
    const [text, setText] = useState(data.content)

    const handleEdit = () => {
        if(onEdit){
            setText(data.content)
        }
        setOnEdit(!onEdit)
    }

    const handleCancel = () => {
        setText(data.content)
        setOnEdit(false)
    }

    const updateComment = async () => {
        try {
            data.content = text
            await axios.put(`http://127.0.0.1:8000/comments/update/${data._id}`, data)
            setOnEdit(false)
        } catch (error) {
            console.log(error);
        }
    }

    const deleteComment = async () => {
        try {
            const lol = await axios.delete(`http://127.0.0.1:8000/comments/delete/${data._id}`)
            fetchComments(true)
            console.log(lol);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="comment-item animate__animated animate__fadeInLeft">
            <div className="comment-info">
                <div className="user-info">
                    <i className="fas fa-user"></i>
                    <span> user</span>
                </div>
                <div className="comment-options">
                    <i className="fas fa-edit" onClick={handleEdit}></i>
                    <i className="fas fa-trash" onClick={deleteComment}></i>
                </div>
            </div>
            {
                onEdit ? 
                (
                    <div className="comment-edit">
                        <textarea value={text} onChange={(e) => setText(e.target.value)}></textarea>
                        <Button variant="primary" onClick={updateComment}>Update</Button>
                        <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
                    </div>
                )
                : <p>{data.content}</p>
            }
        </div>
    );
};
