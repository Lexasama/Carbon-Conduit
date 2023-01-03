import Comment from "../model/Comments/Comment";
import {getAsync, postAsync} from "../../helpers/api-helper";

const URl: string = process.env.REACT_APP_BACKEND + "/articles"

export const getComments = async (slug: string): Promise<Array<Comment>> => {
    const response = await getAsync(`${URL}/${slug}/comments`);
    const {comments} = await response.json()
    return comments;
}

export const createComment = async (slug: string, body: string): Promise<Comment> => {
    const data = JSON.stringify({comment: {body}});
    const response = await postAsync(`${URL}/${slug}/comments`, data);
    return (await response.json()).comment;
}

type DeleteCommentPayload = {
    slug: string,
    id: number
}

export const deleteComment = async (payload: DeleteCommentPayload): Promise<void> => {
    const response = await getAsync(`${URL}/${payload.slug}/comments/${payload.id}`);
}