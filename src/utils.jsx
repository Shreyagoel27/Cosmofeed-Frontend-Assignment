export const globalSearchArray = (data, query) => {
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

export const globalSearch = (data, query) => {
  if (!query) {
    return {};
  }

  const searchData = Object.keys(data).reduce((acc, key) => {
    const filteredTasks = globalSearchArray(data[key], query);
    acc[key] = filteredTasks;
    return acc;
  }, {});
  return searchData;
};

export const sortDataArray = (data, field, order) => {
  if (!field) {
    return data;
  }
  const sortedData = Object.values(data).flat();

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

export const sortData = (data, field, order) => {
  if (!field) {
    return data;
  }
  const sortedData = Object.keys(data).reduce((acc, key) => {
    const sortedList = sortDataArray(data[key], field, order);
    acc[key] = sortedList;
    return acc;
  }, {});
  return sortedData;
};

export const groupBy = (data, type) => {
  if (!type) {
    const groupedData = Object.values(data).flat();
    return {
      "": groupedData,
    };
  }
  const arrayData = Object.values(data).flat();
  console.log("Array Data:", arrayData);
  const groupedData = arrayData.reduce((acc, item) => {
    const key = item[type];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {});

  const sortedSearchData = Object.keys(groupedData)
    .sort() // Sort the keys alphabetically
    .reduce((sortedAcc, key) => {
      sortedAcc[key] = groupedData[key]; // Add entries to the new object in sorted order
      return sortedAcc;
    }, {});

  return sortedSearchData;
};

export const editTaskList = (data, task, groupByValue) => {
  const updatedData = Object.keys(data).reduce((acc, key) => {
    const updatedList = data[key].map((item) => {
      if (item.id === task?.id) {
        return {
          ...task,
        };
      }
      return item;
    });

    // Preserve the key and the updated task list
    acc[key] = updatedList;
    return acc;
  }, {});
  if (groupByValue !== "none") {
    const data = groupBy(updatedData, groupByValue);
    return data;
  }
  return updatedData; // Return the updated object
};

export const deleteTaskList = (data, id) => {
  const updatedData = Object.keys(data).reduce((acc, key) => {
    const updatedList = data[key].filter((item) => item.id !== id);
    acc[key] = updatedList;
    return acc;
  }, {});
  return updatedData;
};

export const addTaskList = (list, groupByVlaue, data) => {
  try {
    const latestList = [...Object.values(list).flat(), data];
    const groupedData = groupBy({ "": latestList }, groupByVlaue);

    return groupedData;
  } catch (error) {
    console.log("error:", error);
  }
};
