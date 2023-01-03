import {Link} from "react-router-dom";
import profile from "../model/Users/Profile";
import {convertToDate} from "../../utils";
import React, {useState} from "react";
import ArticleTag from "../tags/article-tag";
import classNames from "classnames";

type articlePreviewProps = {
    favoritesCount: number;
    favorited: boolean;
    tagList: string[];
    description: string;
    title: string;
    slug: string;
    createdAt: string;
    author: profile;
}

const ArticlePreview = ({article}: { article: articlePreviewProps }) => {

    const [favorited, setFavorited] = useState(article.favorited);
    const [favoritesCount, setFavoritesCount] = useState(article.favoritesCount);
    const [disabled, setDisabled] = useState(false);

    return (
        <div className="article-preview">
            <div className="article-meta">
                <Link to={`/profile/${article.author.username}`}>
                    <img src={article.author.image}/>
                </Link>
                <div className="info">
                    <Link to={`/profile/${article.author.username}`} className="author">
                        {article.author.username}
                    </Link>
                    <span className="date">{convertToDate(article.createdAt)}</span>
                </div>
                <button
                    className={classNames('btn btn-sm', {
                        'btn-primary': favorited,
                        'btn-outline-primary': !favorited,
                        'disabled': disabled
                    })}>
                    <i className="ion-heart"></i> {favoritesCount}
                </button>
            </div>
            <Link to={`/article/${article.slug}`} className="preview-link">
                <h1>{article.title}</h1>
                <p>{article.description}</p>
                <span>Read more...</span>
                <ul className="tag-list">
                    {article.tagList.map((tag) =>
                        <ArticleTag key={tag} name={tag}/>
                    )}
                </ul>
            </Link>
        </div>
    );
}

export default ArticlePreview;