export function randomSelection<T>(items: T[], numItems: number): T[] {
  if (numItems > items.length) {
    throw new Error("Cannot select more items than are in the list.");
  }

  const selectedItems = [];
  for (let i = 0; i < numItems; i++) {
    const randomIndex = Math.floor(Math.random() * items.length);
    selectedItems.push(items[randomIndex]);
    items.splice(randomIndex, 1); // Remove   

  }

  return selectedItems;
}