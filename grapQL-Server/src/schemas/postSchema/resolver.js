import { postModel } from '../../models/postModel';

export const resolver = {
    Query: {
        getAllPosts: () => postModel.getAllPosts(),
    },
    Mutation: {
        createPost: (root, { input: PostInput }) => {
            return postModel.createPost(PostInput);
        },
        deletePost(root, { id }) {
            return postModel.deletePost(id);
        },
        updatePost(root, { id, input: inputPost }) {
            if (id) {
                return postModel.updateCategory(id, inputPost);
            }
            return false;
        }
    }
}