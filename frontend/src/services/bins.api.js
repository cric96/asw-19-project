import { apiService } from "./apiService";

const resourceEndpoint = "/buildings/{0}/bins";

export default {
  getBins: function(buildingId) {
    return apiService.get(`/buildings/${buildingId}/bins`, null, true);
  }
};
