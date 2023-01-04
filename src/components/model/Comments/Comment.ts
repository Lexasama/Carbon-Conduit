import Profile from "../Users/Profile";

type CommentModel = {
    id: number,
    createdAt: string,
    updatedAt: string,
    body: string,
    author: Profile
}

export default CommentModel;