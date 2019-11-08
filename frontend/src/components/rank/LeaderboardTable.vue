<template>
  <v-data-table
    :headers="rankHeaders"
    :items="rankRows"
    :items-per-page="20" 
    hide-default-footer
    disable-filtering
    disable-sort
    :mobile-breakpoint="0"
    :loading="emptyRows"
    loading-text="Calcolo classifica in corso.."
    class="elevation-3 overline header"
  >
  <!--item.user.nickname || item.user.email-->
     <template v-slot:item.user="{ item }">
      <span v-if="item.user._id === loggedUserRow._id"><b>{{item.user.nickname || item.user.email}}    </b></span>     
      <span v-else>{{item.user.nickname || item.user.email}}</span>
      <v-icon v-if="item.user._id === loggedUserRow._id" color="primary" class="mb-1">star</v-icon>
    </template>
  </v-data-table>
</template>

<script>
export default {
    name : "LeaderboardTable",
    props : {
        rankHeaders : {type : Array},
        rankRows : {type : Array},
        loggedUserRow : {type : Object}
    },
    computed : {
        emptyRows : function() {
            return this.rankRows.length == 0
        }
    }
    
}
</script>
<style>
thead.v-data-table-header {
   background-color: #aed681 !important
}
</style>