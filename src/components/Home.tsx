import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import useAuthHook from "./authentification/use-auth.hook";
import TagList from "./tags/tag-list";
import classNames from "classnames";
import {getTags} from "./tags/tag-api";
import Feed from "./articles/feed";

function Home() {

    const {isConnected} = useAuthHook();
    const [feedToggle, setFeedToggle] = useState(isConnected ? 1 : 0);
    const [tagList, setTagList] = useState<string[]>([]);
    const [selectedTag, setSelectedTag] = useState<string>("");
    const handleSelectedTag = (tag: string) => {
        setFeedToggle(2);
        setSelectedTag(tag)
    };

    useEffect(() => {
        initTags();
    }, []);

    const initTags = async () => {
        const tags = await getTags();
        setTagList(tags)
    }

    return (
        <>
            <div className="home-page">
                <div className="banner">
                    <div className="container">
                        <h1 className="logo-font">conduit</h1>
                        <p>A place to share your knowledge.</p>
                    </div>
                </div>

                <div className="container page">
                    <div className="row">
                        <div className="col-md-9">
                            <div className="feed-toggle">
                                <ul className="nav nav-pills outline-active">
                                    <li className="nav-item">
                                        <Link to="/"
                                              hidden={!isConnected}
                                              className={classNames('nav-link', {'active': feedToggle === 1})}
                                              onClick={() => setFeedToggle(1)}
                                        >Your Feed</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/" className={classNames('nav-link', {'active': feedToggle === 0})}
                                              onClick={() => setFeedToggle(0)}>Global Feed</Link>
                                    </li>
                                    {selectedTag !== "" && (
                                        <li className="nav-item">
                                            <Link to="/"
                                                  className={classNames('nav-link', {'active': feedToggle === 2})}
                                                  onClick={() => setFeedToggle(2)}>{`#${selectedTag}`}</Link>
                                        </li>)}
                                </ul>
                            </div>
                            {feedToggle === 0 && (<Feed query={"?"} url="/" limit={10}/>)}
                            {(feedToggle === 1 && isConnected) && (<Feed query={"/feed?"} url="/" limit={10}/>)}
                            {feedToggle === 2 && (<Feed query={`?tag=${selectedTag}&`} url="/" limit={10}/>)}
                        </div>

                        <div className="col-md-3">
                            <div className="sidebar">
                                <TagList tagList={tagList} onClick={handleSelectedTag}></TagList>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;