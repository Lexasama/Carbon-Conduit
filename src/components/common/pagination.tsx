import classNames from "classnames";
import {Link} from "react-router-dom";

const Pagination = ({
                        page,
                        articlesCount,
                        setPage,
                        url
                    }: { page: number, articlesCount: number, setPage: (num: number) => void, url: string }) => {

    const pageLength = Math.ceil(articlesCount / 10);
    const pageNums = Array.from(Array(pageLength).keys()).map((p) => p + 1);

    if (pageLength === 1) return null;

    return (
        <>
            <nav>
                <ul className='pagination'>
                    {pageNums.map((num: number) => (
                        <li key={num}
                            className={classNames('page-item', {'active': page === num})}
                        >
                            <Link to={url}
                                  className='page-link'
                                  onClick={() => setPage(num)}>
                                {num}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
}
export default Pagination;