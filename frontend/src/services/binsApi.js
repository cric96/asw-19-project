import { apiService } from "./apiService";

const ENDPOINT_BINS = "/buildings/{0}/bins"

export default {
	getBins: function(building) {
		return apiService.get(ENDPOINT_BINS.format(building._id), null, true)
	}
};
