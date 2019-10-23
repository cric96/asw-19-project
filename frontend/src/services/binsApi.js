import { apiService } from "./apiService";

const ENDPOINT_BINS = "/buildings/{0}/bins"

export default {
	getBins: function(building, filter) {
		if(filter === undefined) {
			return apiService.get(ENDPOINT_BINS.format(building._id), null, true)		
		}
		
		return apiService.get(ENDPOINT_BINS.format(building._id), filter, true)
	},
	/*
		return an association between uset and its trash thrown inside a building,
		the return structure is: [
			[
				member : {.. member object ...},
				trashes : {.. collected trash object ..}
			]
		].
		
	*/
	getBinsGroupByMember: function(building) {
		var binsForUsers = building.members.map(
			member => {
				return this.getBins(building, {userId : member.firebase_uid})
					.then(trashes => [member, trashes])
			}
		)
		return Promise.all(binsForUsers)
	},
	/**
	 * filtering helper used to create a 
	 * filter that limit the trash thrown inside a temporal interval.
	 */
	filterBy: {
		DAY : () => {
			var today = new Date();
			return {from: today.setDate(today.getDate() - 1)}
		},
		WEEK : () => {
			var today = new Date();
			return {from: today.setDate(today.getDate() - 7)}
		},
		MONTH : () => {
			var today = new Date();
			return {from: today.setDate(today.getDate() - 30)}
		}
	}
};
