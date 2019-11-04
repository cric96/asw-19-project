<template>
  <v-data-table
    :headers="rankHeaders"
    :items="rankRows"
    :items-per-page="20" #TODO passare da fuori
    hide-default-footer
    disable-filtering
    disable-sort
    :mobile-breakpoint="0"
    :loading="emptyRows"
    loading-text="Calcolo classifica in corso.."
    class="elevation-3 overline header"
  ></v-data-table>
</template>

<script>
export default {
    name : "LeaderboardTable",
    props : {
        rankHeaders : {type : Array},
        rankRows : {type : Array}
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