import { Post } from '../../connectors';

export const postModel = {
    getAllPosts: () => Post.find(),
    createPost: dataPostInput => {
        if (dataPostInput) {
            return Post.create(dataPostInput);
        }
        return false;
    },
    deletePost: id => {
        if (id) {
            return Post.findOneAndRemove({id});
        }
        return fales;
    },
    updatePost: (id, inputPost) => {
        if (id) {
            return Post.findOneAndUpdate({ id }, { $set: inputPost }, { new: true });
        }
        return false;
    }
}