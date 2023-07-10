export function filterLandmarks(
  landmarks,
  selectedCategory,
  searchQuery,
  activeOnly,
  ratingRange = null,
  searchQuerycategory
) {
  const groupedLandmarksByCategory = landmarks?.reduce((acc, landmark) => {
    const categoryLandmarks =
      acc[landmark.landmark.tourismCategoryObject] || [];
    return {
      ...acc,
      [landmark.landmark.tourismCategoryObject]:
        categoryLandmarks.concat(landmark),
    };
  }, {});

  // Filter landmarks based on selected category
  const filteredLandmarksByCategory = selectedCategory
    ? groupedLandmarksByCategory[selectedCategory] || []
    : landmarks;

  // Filter landmarks by active status and name
  const filteredLandmarksByActiveAndName = landmarks.filter((landmark) => {
    return (
      (!activeOnly || landmark.landmark.active) &&
      (!searchQuery ||
        landmark.title.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  let filteredLandmarksByRating = filteredLandmarksByActiveAndName;
  if (ratingRange !== null && ratingRange !== "") {
    filteredLandmarksByRating = filteredLandmarksByRating.filter((landmark) => {
      const reviews = landmark.landmark.reviews;
      const ratingCount = reviews.length;
      const ratingSum = reviews.reduce((sum, review) => sum + review.rating, 0);
      const averageRating = ratingCount > 0 ? ratingSum / ratingCount : null;
      const roundedRating =
        averageRating !== null ? Math.round(averageRating) : null;

      return roundedRating !== null && roundedRating === parseInt(ratingRange);
    });
  }

  const filteredLandmarksByTypeCategory = filteredLandmarksByCategory.filter(
    (landmark) => {
      return (
        !searchQuerycategory ||
        landmark.category_type
          .toLowerCase()
          .includes(searchQuerycategory.toLowerCase())
      );
    }
  );

  console.log("filteredLandmarksByRating:", filteredLandmarksByRating);

  // Combine all filters

  const filteredLandmarks = filteredLandmarksByRating.filter((landmark) =>
    filteredLandmarksByTypeCategory.includes(landmark)
  );

  return filteredLandmarks;
}
