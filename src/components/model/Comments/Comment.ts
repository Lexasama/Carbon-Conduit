import Profile from "../Users/Profile";

type Comment = {
    id: number,
    createdAt: string,
    updatedAt: string,
    body: string,
    author: Profile
}

export default Comment;