import React from "react";
import classNames from "classnames";

const FollowBtn = ({following, username, disabled, onClick}: { following: boolean, username: string, disabled: boolean, onClick: () => void }) => {

    const followBtnTxt = following ? `unfollow ${username}` : `Follow ${username}`

    return (
        <button className={classNames("btn btn-sm action-btn", {'btn-outline-secondary': !following, 'btn-secondary': following})}
                disabled={disabled}
                onClick={onClick}>
            <i className="ion-plus-round"></i>
            &nbsp; {followBtnTxt}
        </button>
    );
}

export default FollowBtn;