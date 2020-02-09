findLikeDislike = (comments, id, value, field) => {
    for (let i = 0; i < comments.length; i++) {
        if (comments[i]._id == id) {
            if (field == 'like') {
                ++comments[i].like;
            } else {
                ++comments[i].dislike;
            }
            break;
        } else {
            findLikeDislike(comments[i].comments, id, value, field)
        }
    }
}



module.exports = findLikeDislike