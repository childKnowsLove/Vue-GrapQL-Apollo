import Vue from 'vue'
import Vuex from 'vuex'
import gql from 'graphql-tag';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const apolloClient = new ApolloClient({
  // Provide the URL to the API server.
  link: new HttpLink({ uri: 'http://localhost:8181/graphql' }),
  // Using a cache for blazingly
  // fast subsequent queries.
  cache: new InMemoryCache(),
});

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    categoryList: []
  },
  getters: {
    categoryList (state) {
      return [...state.categoryList];
    }
  },
  mutations: {
    fetchCatogoryList (state, category) {
      state.categoryList = category;
    },
    updateCategoryOnDB (state, category) {
      const catArray = Array.from(state.categoryList);
      let index = 0;
      for (index; index < catArray.length; index++) {
        const element = catArray[index];
        if (element.id == category.id) {
          catArray[index] = category;
          break;
        }
      }
      state.categoryList = catArray;
    },
    createCategory (state, category) {
      const catArray = Array.from(state.categoryList);
      catArray.push(category);
      state.categoryList = catArray;
    },
    deleteCategory (state, category) {
      const catArray = Array.from(state.categoryList);
      let index = -1;
      for (index = 0; index < catArray.length; index++) {
        const element = catArray[index];
        if (element.id == category.id) {
          break;
        }
      }

      if (index != -1) {
        catArray.splice(index, 1);
        state.categoryList = catArray;
      }
    },
    getCategoryList (state) {
      console.log([...state.categoryList]);
      return [...state.categoryList];
    },
  },
  actions: {
    async fetchCatogoryList (context) {
      const response = await apolloClient.query({
        query: gql`
          {
            getAllCategories {
              id
              title
            }
          }
        `,
      });
      context.commit('fetchCatogoryList', response.data.getAllCategories);
    },
    getCategoryList (context) {
      context.commit('getCategoryList');
    },
    async updateCategoryOnDB (context, category) {
      const response = await apolloClient.mutate({
          mutation: gql`
            mutation ($id: ID!, $title: String!) {
              updateCategory(id: $id, input: {
                title: $title,
              }) {
                id
                title
              }
            }
          `,
          variables: { id: category.id, title: category.title }
      }).then(response => {
        context.commit('updateCategoryOnDB', response.data.updateCategory);
      });
    },
    async createCategory (context, title) {
      const response = await apolloClient.mutate({
        mutation: gql`
          mutation ($title: String!) {
            createCategory(input: {
              title: $title,
            }) {
              id
              title
            }
          }
        `,
        variables: { title: title },
        }).then((response)=>{
          context.commit('createCategory', response.data.createCategory);
        });
    },
    async deleteCategory (context, catID) {
      // console.log('store delete: ', catID);
      const response = await apolloClient.mutate({
        mutation: gql`
          mutation ($id: ID!) {
            deleteCategory(id:$id){
              id
            }
          }
        `,
        variables: { id: catID },
        }).then((response)=>{
          context.commit('deleteCategory', response.data.deleteCategory);
        });
    },
  }

})
