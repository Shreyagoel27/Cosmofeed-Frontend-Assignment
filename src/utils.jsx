export const globalSearch = (data, query) => {
  if (!query) {
    return [];
  }

  const regex = new RegExp(query, "gi"); // Case-insensitive search
  return data.map((item) => {
    const matchedTitle = item.summary?.replace(
      regex,
      (match) => `<mark>${match}</mark>`,
    );
    const matchedDueDate = item.dueDate?.replace(
      regex,
      (match) => `<mark>${match}</mark>`,
    );
    const matchedPriority = item.priority?.replace(
      regex,
      (match) => `<mark>${match}</mark>`,
    );

    const matchedCreatedAt = item.createdAt?.replace(
      regex,
      (match) => `<mark>${match}</mark>`,
    );

    return {
      ...item,
      summary: matchedTitle,
      dueDate: matchedDueDate,
      priority: matchedPriority,
      createdAt: matchedCreatedAt,
    };
  });
};

export const sortData = (data, field, order) => {
  if (!field) {
    return data;
  }

  const sortedData = [...data];
  console.log("Sorted Data:", sortedData);
  sortedData.sort((a, b) => {
    if (a[field] < b[field]) {
      return order === "asc" ? -1 : 1;
    }
    if (a[field] > b[field]) {
      return order === "asc" ? 1 : -1;
    }
    return 0;
  });

  return sortedData;
};
