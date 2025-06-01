import { visitYoutube, watchMovieTrending } from "../support/pages/Youtube.js";

describe("Youtube E2E Test", () => {
  it("Watch the Thrid Movie Trending", () => {
    visitYoutube.visit();
    watchMovieTrending.watchTrendingVideo();
  });
});
