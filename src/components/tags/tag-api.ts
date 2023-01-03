import {getAsync} from "../../helpers/api-helper";

const URL: string = process.env.REACT_APP_BACKEND + '/tags';
export const getTags = async (): Promise<string[]> => {
    const response = await getAsync(URL);
    return (await response.json()).tags;
};