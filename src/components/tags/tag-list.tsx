import Tag from "./tag";

type TagListProps = {
    tagList: string[],
    onClick: (tag:string) => void
}
const TagList = ({tagList, onClick}: TagListProps) => {
    return (
        <>
            <p>Popular Tags</p>
            <div className="tag-list">
                {
                    tagList.map((tag) =>
                        (<Tag key={tag}
                              name={tag}
                              onClick={() => onClick(tag)}
                        ></Tag>)
                    )
                }

            </div>
        </>
    );
}

export default TagList;