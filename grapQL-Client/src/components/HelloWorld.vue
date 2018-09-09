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
              <button class="btn btn-success mb-2" @click='createCategory'>ok</button>
            </div>
        </div>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">id</th>
          <th scope="col">Title</th>
          <th scope="col">Edit</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody>
            <tr v-for="category in getAllCategories" :category='category'>
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
            <td><a href="#" data-toggle="modal" :data-target="'#cate' + category.id">Update</a></td>
            <td><a href="#" @click='deleteCate($event, category.id)'>Delete</a></td>
          </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import UpdateCate from '@/components/UpdateCate.vue'
export default {
    components: {
        UpdateCate
    },
    data() {
        return {
          isCreate: false,
          isUpdate: false,
          title: ''
        }
    },
    created(){
        console.log(this.getAllCategories);
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
            this.$apollo.mutate({
                mutation: gql`
                  mutation ($title: String!) {
                    createCategory(input: {
                        title: $title,
                    })  {
                            title
                    }
                  }
                `,
            variables: { title: this.title },
            }).then(()=>{
                this.$forceUpdate();
                console.log(this.getAllCategories);
            });
            this.isCreate = false;
            location.reload();
        },

        deleteCate(event, idCate) {
            this.$apollo.mutate({
                mutation: gql`
                  mutation ($id: ID!) {
                    deleteCategory(id:$id){
                        id
                    }
                  }
                `,
            variables: { id: idCate },
            });
            location.reload();
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