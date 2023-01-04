import CommentModel from '../model/Comments/Comment'
import {Link} from "react-router-dom";
import {convertToDate} from "../../utils";
import useAuthHook from "../authentification/use-auth.hook";

const Comment = ({comment, removeComment}: { comment: CommentModel, removeComment: (id: number) => void }) => {

    const {user} = useAuthHook();
    return (
        <div className="card">
            <div className="card-block">
                <p className="card-text">
                    {comment.body}
                </p>
            </div>
            <div className="card-footer">
                <Link to={`/profile/${comment.author.username}`} className="comment-author">
                    <img src={comment.author.image} className="comment-author-img"/>
                </Link>
                &nbsp;
                <Link to={`/profile/${comment.author.username}`}
                      className="comment-author"> {comment.author.username}</Link>
                <span className="date-posted">{convertToDate(comment.createdAt)}</span>
                {
                    comment.author.username === user.username && (
                        <span className="mod-options">
                          <i className="ion-trash-a" onClick={() => removeComment(comment.id)}></i>
                        </span>
                    )
                }
            </div>
        </div>
    );
}

export default Comment;