<template>
  <!-- Modal -->
  <div class="modal fade" id="modalDetailBox" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Detail Category</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Update</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import gql from 'graphql-tag';

export default {
    props: [],
    data() {
        return {
          data: null
        }
    },

    computed: {

    },

    created() {
      BusEvents.$on('showBox', (data) => {
          this.getDetailCategory(data);
      });
    },

    methods: {
      getDetailCategory(idCate) {
          this.$apollo.query({
            query: gql`
              query getCategoryAndPosts($id: ID!) {
                getCategoryAndPosts ( id: $id ) {
                  id
                  title
                  posts {
                    id
                    title
                  }
                }
              }
            `,
            variables: { id: idCate }
          }).then(result => {
            console.log(result);
          })
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