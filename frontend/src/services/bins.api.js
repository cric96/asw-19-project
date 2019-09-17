import { apiService } from "./apiService";

const resourceEndpoint = "/buildings/{0}/bins";
// ("/cities/{cap}/binCategory");

export default {
  getBins: function(building) {
    return apiService
      .get(`/cities/${building.city.cap}/binCategories`, null, true)
      .then(binCategories => {
        return apiService
          .get(`/buildings/${building._id}/bins`, null, true)
          .then(bins => {
            for (const binCategory of binCategories) {
              if (!bins.some(bin => bin.binCategory._id == binCategory._id)) {
                bins.push({
                  binCategory: binCategory,
                  collectedTrashes: []
                });
              }
            }
            return bins;
          });
      });
  }
};
