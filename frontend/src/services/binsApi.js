import { apiService } from "./apiService";

const resourceEndpoint = "/buildings/{0}/bins";

export default {
	getBins: function(building) {
		return apiService.get(`/buildings/${building._id}/bins`, null, true)
	}
};
