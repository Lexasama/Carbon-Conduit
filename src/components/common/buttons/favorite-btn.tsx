import React from "react";
import classNames from "classnames";

type FavoriteBtnProps = { favorited: boolean, favoritesCount: number, disabled: boolean, onClick: () => void };
const FavoriteBtn = ({favorited, favoritesCount, disabled, onClick}: FavoriteBtnProps) => {

    const favoriteBtnTxt = favorited ? 'Unfavorite Article' : 'Favorite Article';

    return (
        <button className={classNames("btn btn-sm", {'btn-outline-primary': !favorited, 'btn-primary': favorited})}
                onClick={onClick}
                disabled={disabled}
        >
            <i className="ion-heart"></i>
            &nbsp; {favoriteBtnTxt} <span className="counter">{favoritesCount}</span>
        </button>
    );
}

export default FavoriteBtn;