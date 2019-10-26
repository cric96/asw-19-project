import { apiService } from './apiService'
const limit = 20
function getRank(rankTarget, ascOrder, otherQueryParams) {
    otherQueryParams.sort = ascOrder ? "asc" : "desc"
    otherQueryParams.limit = limit
    return apiService.get(`/ranks/${rankTarget}/`, otherQueryParams, true)
}
export default {
    getLevelRank : function(ascOrder = true){
        var queryParams = {orderBy : "level"}
        return getRank("users", ascOrder, queryParams)
    },
    getScoreRank : function(ascOrder = true) {
        var queryParams = {orderBy : "score"}
        return getRank("users", ascOrder, queryParams)
    },
    getTrashRankByUser : function(ascOrder = true, categoryName,  cityCap = null) { 
        var queryParams = {orderBy : categoryName}
        if(cityCap !== null) {
            queryParams.cap = cityCap
        }
        return getRank("users", ascOrder, queryParams)
    },
    getTrashRankByCity : function(ascOrder = true, categoryName) {
        var queryParams = {orderBy : categoryName}
        return getRank("cities", ascOrder, queryParams)
    },
    getTrashRankByBuilding : function(ascOrder = true, categoryName,  cityCap = null) {
        var queryParams = {orderBy : categoryName}
        if(cityCap !== null) {
            queryParams.cap = cityCap
        }
        return getRank("buildings", ascOrder, queryParams)
    }
}
