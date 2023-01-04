import Article from "../components/model/Articles/Article";
import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {getArticle} from "../components/articles/article-api";
import useAuthHook from "../components/authentification/use-auth.hook";
import {convertToDate} from "../utils";
import Comment from "../components/comments/comment";
import {deleteComment, getComments} from "../components/comments/comment-api";
import CommentModel from "../components/model/Comments/Comment";
import classNames from "classnames";

const ArticlePage = () => {
    const navigate = useNavigate();
    const [article, setArticle] = useState<Article>({
        author: {username: '', image: '', bio: '', following: false},
        title: "",
        body: '',
        createdAt: '',
        description: '',
        favorited: false,
        favoritesCount: 0,
        slug: '',
        tagList: [],
        updatedAt: ''
    });
    const [loading, setLoading] = useState(true);
    const [isCurrentUser, setIsCurrentUser] = useState(false);
    const [comments, setComments] = useState<CommentModel[]>([]);
    const author = article.author;
    const authorPP = author.image;
    const authorProfileLink = `/profile/${author.username}`
    const {articleSlug} = useParams();
    const {user: currentUser} = useAuthHook();
    const initArticle = async () => {
        try {
            setLoading(true);
            const article = await getArticle(articleSlug!);
            setArticle(article);
        } catch (error) {
            console.error(error);
        }
    }

    const initComments = async () => {
        try {
            const comments = await getComments(articleSlug!);
            setComments(comments);
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        initArticle().then(() => setLoading(false))
    }, [articleSlug, currentUser.username, navigate])

    const removeComment = async (id: number) => {
        await deleteComment({slug: articleSlug!, id});
        await initComments()
    };

    const favoriteBtnTxt = article.favorited ? 'Unfavorite Article' : 'Favorite Article';
    const followBtnTxt = article.author.following ? `unfollow ${author.username}` : `Follow ${author.username}`
    return (
        <div className="article-page">
            <div className="banner">
                <div className="container">
                    <h1>{article.title}</h1>

                    <div className="article-meta">
                        <Link to={`profile/${article.author.username}`}>
                            <img
                                src={article.author.image}/></Link>
                        <div className="info">
                            <Link to={`/profile/${article.author.username}`}
                                  className="author">{article.author.username}</Link>
                            <span className="date">{convertToDate(article.createdAt)}</span>
                        </div>
                        <button className="btn btn-sm btn-outline-secondary">
                            <i className="ion-plus-round"></i>
                            &nbsp; -Follow Eric Simons
                        </button>
                        &nbsp;&nbsp;
                        <button className="btn btn-sm btn-outline-primary">
                            <i className="ion-heart"></i>
                            &nbsp; Favorite Post <span className="counter">{article.favoritesCount}</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="container page">
                <div className="row article-content">
                    <div className="col-md-12">
                        <p>
                            {article.description}
                        </p>
                        <h2 id="introducing-ionic">{article.title}</h2>
                        <p>{article.body}</p>
                    </div>
                </div>

                <hr/>

                <div className="article-actions">
                    <div className="article-meta">
                        <Link to={authorProfileLink}><img src={authorPP}/></Link>
                        <div className="info">
                            <a href="" className="author">{author.username}</a>
                            <span className="date">{convertToDate(article.createdAt)}</span>
                        </div>

                        <button className={classNames("btn btn-sm btn-outline-secondary")}>
                            <i className="ion-plus-round"></i>
                            &nbsp; {followBtnTxt}
                        </button>
                        &nbsp;
                        <button className="btn btn-sm btn-outline-primary">
                            <i className="ion-heart"></i>
                            &nbsp; {favoriteBtnTxt} <span className="counter">{article.favoritesCount}</span>
                        </button>
                    </div>
                </div>

                <div className="row">
                    <div className="col-xs-12 col-md-8 offset-md-2">
                        <form className="card comment-form">
                            <div className="card-block">
                                <textarea className="form-control" placeholder="Write a comment..." rows={3}></textarea>
                            </div>
                            <div className="card-footer">
                                <img src={currentUser.image} className="comment-author-img"/>
                                <button className="btn btn-sm btn-primary">Post Comment</button>
                            </div>
                        </form>
                        <>
                            {
                                comments.map((comment: CommentModel) => (
                                    <Comment key={comment.id}
                                             comment={comment} removeComment={removeComment}/>
                                ))
                            }</>
                    </div>
                </div>
            </div>
        </div>);
}
export default ArticlePage;