import {Link} from "react-router-dom";

type TagProps = {
    name: string,
    onClick: any
}
const Tag = ({name, onClick}: TagProps) => {
    return (
        <Link to="/" className="tag-default tag-pill" onClick={onClick}>
            {name}
        </Link>
    );
}

export default Tag;