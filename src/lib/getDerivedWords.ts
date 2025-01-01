export function findDerivedWords(
  inputString: string,
  wordList: string[],
): Set<string> {
  function permute(
    chars: string[],
    prefix: string = "",
    results: Set<string> = new Set(),
    minLength: number = 4,
  ): Set<string> {
    // Base case: If there are no more characters to permute, add the prefix to results

    if (prefix.length >= minLength) {
      results.add(prefix);
    }

    // Stop recursion when there are no more characters to use
    if (chars.length === 0) {
      return results;
    }

    // Iterate through each character in the input array
    for (let i = 0; i < chars.length; i++) {
      // Remove the current character (chars[i]) and pass the remaining characters
      const remaining = chars.slice(0, i).concat(chars.slice(i + 1));
      // Recur with the current character added to the prefix
      permute(remaining, prefix + chars[i], results, minLength);
    }

    return results;
  }

  // Step 1: Convert the word list to a Set for quick lookup (O(1) average case for searching)
  const wordSet = new Set(wordList);

  // Step 2: Generate all unique permutations of the input string
  const permutations = permute(inputString.split(""), "", new Set(), 5);

  // Step 3: Filter the permutations to find valid words
  const derivedWords = new Set<string>();
  for (const word of permutations) {
    if (wordSet.has(word)) {
      derivedWords.add(word);
    }
  }

  return derivedWords;
}
