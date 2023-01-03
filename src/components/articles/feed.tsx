import ArticlePreview from "./article-preview";
import {useEffect, useState} from "react";
import Article from "../model/Articles/Article";
import Pagination from "../common/pagination";
import {getArticles} from "./article-api";
import Loading from "../common/loading";

type  FeedProps = {
    query: string,
    url: string,
    limit: number
}

const Feed = ({query, url, limit}: FeedProps) => {

    const [articles, setArticles] = useState<Article[]>([]);
    const [articlesCount, setArticleCount] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        initArticles().then(() => setLoading(false));
    }, [page, query, limit]);

    const initArticles = async () => {
        const queryString = `${query}limit=${limit}&offset=${10 * (page - 1)}`;
        try {
            const {articles, articlesCount} = await getArticles(queryString)
            setArticleCount(articlesCount);
            setArticles(articles)
        } catch (e) {
            console.error(e);
        }
    };

    if (loading) {
        return (
            <div className="article-preview">
                <Loading text="articles"/>
            </div>);
    }

    if (articlesCount === 0) {
        return <div className="article-preview">No articles are here... yet.</div>;
    }

    return (
        <>
            {articles.map((article) => (
                <ArticlePreview article={article} key={article.slug}/>
            ))}
            <Pagination
                page={page}
                articlesCount={articlesCount}
                setPage={setPage}
                url={url}/>
        </>);
}

export default Feed;