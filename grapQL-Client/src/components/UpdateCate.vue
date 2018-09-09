<template>
  <!-- Modal -->
  <div class="modal fade" :id="'cate' + idCategory" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Update Category - ID: {{ idCategory }}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <input type="text" v-model='title' class="form-control">
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" @click="updateCategory($event, idCategory, title)">Update</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import gql from 'graphql-tag';

export default {
    props: ['idCategory', 'cateTitle'],
    data() {
        return {
          title: this.cateTitle
        }
    },
    created(){
    },
    methods: {
      updateCategory(event, idCate, title) {
          this.isUpdate = false;
          this.$apollo.mutate({
              mutation: gql`
                mutation ($id: ID!, $title: String!) {
                  updateCategory(id: $id, input: {
                      title: $title,
                  })  {
                      title
                  }
                }
              `,
              variables: { id: idCate, title: this.title }
          });
          this.hideModal();
          this.$forceUpdate();
          location.reload();
        },
        hideModal() {
          $('#cate' + this.idCategory).modal('hide');
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