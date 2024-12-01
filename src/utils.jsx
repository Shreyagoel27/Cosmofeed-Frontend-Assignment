export const globalSearch = (data, query) => {
  console.log("Input Data:", data);
  console.log("Query:", query);

  if (!query) {
    return [];
  }

  const regex = new RegExp(query, "gi"); // Case-insensitive search
  const x = data.map((item) => {
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

  console.log("Processed Data (x):", x);
  return x;
};
