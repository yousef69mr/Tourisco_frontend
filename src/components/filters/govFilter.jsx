export function filtergov(governorates, searchQuery) {
  // Filter governorates by name
  const filteredGovernoratesByName = governorates.filter(governorate => {
    return !searchQuery || governorate.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return filteredGovernoratesByName;
}