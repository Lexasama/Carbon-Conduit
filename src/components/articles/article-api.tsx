import {getAsync} from "../../helpers/api-helper";
import Articles from "../model/Articles/Articles";
import Article from "../model/Articles/Article";

const URl: string = process.env.REACT_APP_BACKEND + "/articles"
export const getArticles = async (query: string): Promise<Articles> => {
    const response = await getAsync(`${URl}${query}`);
    return (await response.json())
}

export const getArticle = async (slug: string): Promise<Article> => {
    const response = await getAsync(`${URl}/${slug}`);
    const result = await response.json();
    return result.article;
}

export const getArticleFeed = async (): Promise<Articles> => {

    const response = await getAsync(`${URl}/feed`);

    return (await response.json())
}

