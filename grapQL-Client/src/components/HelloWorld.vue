<template>
  <div class="container">
    <div class="d-flex mb-2">
        <button @click='showCreateForm' class="btn btn-success" v-if='!isCreate'>Create</button>
        <div id="form-create" v-if='isCreate'>
            <div class="form-inline">
              <div class="form-group mx-sm-3 mb-2">
                <label for="title" class="sr-only">title</label>
                <input type="text" v-model='title' class="form-control" id="title" placeholder="title">
              </div>
              <button class="btn btn-success mb-2" @click='createCategory'>OK</button>
            </div>
        </div>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">id</th>
          <th scope="col">Title</th>
          <th scope="col">Detail</th>
          <th scope="col">Edit</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody>
          <tr v-for="(category, index) in categoryList" :key='index'>
              <td>{{ category.id }}</td>
              <td>
                  <div>
                      <p v-if='!isUpdate'>{{ category.title }}</p>
                      <UpdateCate
                          :id-category="category.id"
                          :cate-title="category.title"
                      />
                  </div>
              </td>
              <td>
                <a href="#" data-toggle="modal" :id="category.id" @click="showDetail">Detail</a>
              </td>
              <td><a href="#" data-toggle="modal" :data-target="'#cate' + category.id">Update</a></td>
              <td><a href="#" @click='deleteCate(category.id)'>Delete</a></td>
          </tr>
          <ShowDetailCate />
      </tbody>
    </table>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import UpdateCate from '@/components/UpdateCate.vue';
import ShowDetailCate from '@/components/ShowDetailCate.vue'
import { mapGetters } from 'vuex';
export default {
    components: {
        UpdateCate,
        ShowDetailCate
    },
    data() {
        return {
          isCreate: false,
          isUpdate: false,
          title: '',
        }
    },
    computed: {
        ...mapGetters([
            'categoryList'
        ])
    },
    created(){
        this.$store.dispatch('fetchCatogoryList');
    },
    apollo: {
        getAllCategories: {
          query: gql`
            {
              getAllCategories {
                id
                title
              }
            }
          `,
        }
    },
    methods: {
        showCreateForm() {
            this.isCreate = true;
        },
        showUpdateForm() {
            this.isUpdate = true;
        },

        createCategory() {
            this.$store.dispatch('createCategory', this.title);
        },

        getCategories() {
            this.$apollo.query({
              query: gql`
              {
                getAllCategories {
                  id
                  title
                  description
                }
              }
            `
            }).then( result => {
            //   this.categories = result.data.getAllCategories;
            } )
        },

        deleteCate(catID) {
            this.$store.dispatch('deleteCategory', catID);
        },
        showDetail(el) {
            BusEvents.$emit('showBox', el.target.id);
        }
    }
};
</script>
<style type="text/css" scope>
    .input-show {
        background: #fff;
        border: none !important;
    }
</style>