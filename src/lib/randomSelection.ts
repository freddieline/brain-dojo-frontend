export function randomSelection<T>(
  items: T[],
  numItems: number,
  excluding: T[] = [],
): T[] {
  const availableItems = items.filter((item) => !excluding.includes(item));

  if (numItems > availableItems.length) {
    throw new Error("Cannot select more items than are in the list.");
  }

  const selectedItems: T[] = [];
  const itemsCopy = [...availableItems];
  for (let i = 0; i < numItems; i++) {
    const randomIndex = Math.floor(Math.random() * itemsCopy.length);
    selectedItems.push(itemsCopy[randomIndex]);
    itemsCopy.splice(randomIndex, 1);
  }

  return selectedItems;
}
