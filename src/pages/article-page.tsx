import Article from "../components/model/Articles/Article";
import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {getArticle} from "../components/articles/article-api";
import useAuthHook from "../components/authentification/use-auth.hook";
import {convertToDate} from "../utils";
import Comment from "../components/comments/comment";
import {deleteComment, getComments} from "../components/comments/comment-api";

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
    const [comments, setComments] = useState<Comment[]>([]);

    const {articleSlug} = useParams();
    const {user} = useAuthHook();
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
    }, [articleSlug, user.username, navigate])

    const removeComment = async (id: number) => {
        await deleteComment({slug: articleSlug!, id});
        await initComments()
    };
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
                            &nbsp; Follow Eric Simons <span className="counter">(10)</span>
                        </button>
                        &nbsp;&nbsp;
                        <button className="btn btn-sm btn-outline-primary">
                            <i className="ion-heart"></i>
                            &nbsp; Favorite Post <span className="counter">(29)</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="container page">
                <div className="row article-content">
                    <div className="col-md-12">
                        <p>
                            Web development technologies have evolved at an incredible clip over the past few years.
                        </p>
                        <h2 id="introducing-ionic">Introducing RealWorld.</h2>
                        <p>It's a great solution for learning how other frameworks work.</p>
                    </div>
                </div>

                <hr/>

                <div className="article-actions">
                    <div className="article-meta">
                        <a href="profile.html"><img src="http://i.imgur.com/Qr71crq.jpg"/></a>
                        <div className="info">
                            <a href="" className="author">Eric Simons</a>
                            <span className="date">January 20th</span>
                        </div>

                        <button className="btn btn-sm btn-outline-secondary">
                            <i className="ion-plus-round"></i>
                            &nbsp; Follow Eric Simons
                        </button>
                        &nbsp;
                        <button className="btn btn-sm btn-outline-primary">
                            <i className="ion-heart"></i>
                            &nbsp; Favorite Post <span className="counter">(29)</span>
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
                                <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img"/>
                                <button className="btn btn-sm btn-primary">Post Comment</button>
                            </div>
                        </form>
                        <>
                            {
                                comments.map((comment) => (
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