import axios from 'axios'

/* Constants */
const initialData = {
    comments: []
}

/* Types */
const GET_COMMENTS = "GET_COMMENTS"

const POST_COMMENT = "POST_COMMENT"

const UPDATE_COMMENT = "UPDATE_COMMENT"

const DELETE_COMMENT = "DELETE_COMMENT"

/* Reducers */
export default function commentsReducer(state = initialData, action : any){
    switch(action.type){
        case GET_COMMENTS:
            return {...state, comments: action.payload}

        case POST_COMMENT:
            return {...state, comments: [action.payload, ...state.comments]}

        case UPDATE_COMMENT:
            const newComment = action.payload
            const comments = state.comments.map((comment: any) => (
                comment._id === newComment._id ? newComment : comment
            ))
            return {...state, comments}
        
        case DELETE_COMMENT:
            const removedCommentId = action.payload
            const updatedComments = state.comments.filter((comment: any) => comment._id !== removedCommentId)
            return {...state, comments: updatedComments}

        default:
            return state
    }
}

/* Actions */
export const getComments = () => async (dispatch : any, getState : any) => {
    try {
        const query = await axios.get("http://127.0.0.1:8000/comments")
        dispatch({
            type: GET_COMMENTS,
            payload: query.data.comments
        })
    } catch (error) {
        console.log(error);
    }
}

export const postComment = (comment : String) => async (dispatch : any, getState : any) => {
    try {
        const query = await axios.post("http://127.0.0.1:8000/comments/create", {
            date: new Date(),
            content: comment,
        })

        const newComment = query.data.comment

        dispatch({
            type: POST_COMMENT,
            payload: newComment
        })

    } catch (error) {
        console.log(error)
    }
}

export const updateComment = (data : any, comment : String) => async (dispatch : any, getState : any) => {
    try {
        data.content = comment
        const query = await axios.put(`http://127.0.0.1:8000/comments/update/${data._id}`, data)

        const updatedComment = query.data.commentUpdated

        dispatch({
            type: UPDATE_COMMENT,
            payload: updatedComment
        })

    } catch (error) {
        console.log(error);
    }
}

export const deleteComment = (id : String) => async (dispatch : any, getState : any) => {
    try {
        const query = await axios.delete(`http://127.0.0.1:8000/comments/delete/${id}`)
        
        const commentRemovedId = query.data.commentRemoved._id

        dispatch({
            type: DELETE_COMMENT,
            payload: commentRemovedId
        })
    } catch (error) {
        console.log(error);
    }
}