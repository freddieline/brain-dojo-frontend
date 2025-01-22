export const animals = [
    "beaver",
    "cheetah",
    "cricket",
    "crocodile",
    "hen",
    "kanga",
    "ladybird",
    "lion",
    "parrot",
    "pelican",
    "pig",
    "snail",
    "rabbit",
    "tortoise",
    "wolf",
];
export var Size;
(function (Size) {
    Size[Size["small"] = 0] = "small";
    Size[Size["medium"] = 1] = "medium";
    Size[Size["large"] = 2] = "large";
})(Size || (Size = {}));
export var SequenceRecallGameState;
(function (SequenceRecallGameState) {
    SequenceRecallGameState[SequenceRecallGameState["PreGame"] = 0] = "PreGame";
    SequenceRecallGameState[SequenceRecallGameState["HowToPlay"] = 1] = "HowToPlay";
    SequenceRecallGameState[SequenceRecallGameState["Start"] = 2] = "Start";
    SequenceRecallGameState[SequenceRecallGameState["Memorize"] = 3] = "Memorize";
    SequenceRecallGameState[SequenceRecallGameState["Play"] = 4] = "Play";
    SequenceRecallGameState[SequenceRecallGameState["Won"] = 5] = "Won";
    SequenceRecallGameState[SequenceRecallGameState["Lost"] = 6] = "Lost";
})(SequenceRecallGameState || (SequenceRecallGameState = {}));
export var GeneralGameState;
(function (GeneralGameState) {
    GeneralGameState[GeneralGameState["Memorize"] = 0] = "Memorize";
    GeneralGameState[GeneralGameState["Play"] = 1] = "Play";
    GeneralGameState[GeneralGameState["Correct"] = 2] = "Correct";
    GeneralGameState[GeneralGameState["Incorrect"] = 3] = "Incorrect";
    GeneralGameState[GeneralGameState["Finish"] = 4] = "Finish";
})(GeneralGameState || (GeneralGameState = {}));
