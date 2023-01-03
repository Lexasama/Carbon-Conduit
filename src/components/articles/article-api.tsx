import {getAsync} from "../../helpers/api-helper";
import Articles from "../model/Articles/Articles";

const URl: string = process.env.REACT_APP_BACKEND + "/articles"
export const getArticles = async (query: string): Promise<Articles> => {
    const response = await getAsync(`${URl}${query}`);
    return (await response.json())
}