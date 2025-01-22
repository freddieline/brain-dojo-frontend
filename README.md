## Word Games

### Word Wheel

![word-wheel](https://github.com/user-attachments/assets/b10aa767-d2db-48c0-99c0-845f0f2046e2)


<b>Description:</b> A game where a user has 10 minutes to create words using the letters displayed and must include the central letter. The word must be 4 or more letters. The total score is the number of words found. 

<b>Technical implementation: </b> The API call fetches a random word. The frontend randomises the letters in the word for display and then runs a `findDerivedWords` function which finds permutations of 4 or more of the letters and checks for matches in a word list (`/lib/exampleWordList.ts`). The derived words are added to the word class and displayed when the user has finished making his own suggestions.

This solution means a lot of processing can be handled by the front-end saving on costs.

<b>API calls:</b>

| Method | Endpoint         | Description                   | Example Request/Response   | 
|--------|-------------------|-------------------------------|---------------------------------
| GET    | `/api/words`     | Retrieve a *random* word   |   Response body: `{"id": 17,"word": "elaborate","hint","Intricate in design","mainLetter": "b",}`
| POST   | `/api/words`     | Create a new word            |  Request body: `{"word": "elaborate","hint","Intricate in design","mainLetter": "b",}`
| PUT    | `/api/words/:id` | Update a quiz question by ID           | Response body: `{"id": 17,"word": "elaborate","hint","Intricate in design","mainLetter": "b",}`
| POST   | `/api/leaderboard`     | Adds a user to the leaderboard.         | Request body: `{"game": "word wheel","name": "Badass", "score": 10}`


## Memory games

### Memorise the sequence

Description:</b> A game where a number of images (of animals) on cards are show to the user for a few seconds. Afterwards the cards are flipped around hiding the image and the user has to select the correct image in the correct order from a selection of four images. The user wins if he selects all the correct animals in the correct order (no time limit).

<b>API calls: </b>No API calls or backend database as the data is not likely to change or it will change very infrequently.

The list of animals is stored as an array of string:

`export const animals = [ "beaver", "cheetah", "cricket", ...`


### Memorise the capitals cities

A game where a list of countries and the associated capital cities is shown for 20 seconds and then removed. The user then has to type in the correct capital city with the correct spelling for a correct answer.

The validation is case insensitive and accents on characters are ignored.

<b>API calls:</b>

| Method | Endpoint         | Description                   |
|--------|-------------------|-------------------------------|
| GET    | `/api/capitals`     | Retrieve a list of capitals. Optional `continent` url param    |
| POST   | `/api/capitals`     | Create a new capital city            |
| GET    | `/api/capitals/:id` | Retrieve a capital city by         |
| PUT    | `/api/capitals/:id` | Update a capital city by ID           |
| DELETE | `/api/capitals/:id` | Delete a capital city by ID           |




