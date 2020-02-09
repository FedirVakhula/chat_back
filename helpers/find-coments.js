findComments = (parent, id, value, field) => {
    if (parent._id == id && field != 'comments') {
        parent.name = value;
    } else  if (parent._id == id && field == 'comments' && parent.comments.length == 0) {
        parent.comments.push(value);
    } else {
        for (let i = 0; i < parent.comments.length; i++) {

            if (parent._id == id) {
                 if (field == 'comments') {
                    parent.comments.push(value);
                 } else {
                    parent.name = value;
                 }

                break;
            } else {
                findComments(parent.comments[i], id, value, field)
            }
        }
    }
}

module.exports = findComments