const animals = new Map (
    [
        [1, "rat"],
        [2, "bull"],
        [3, "tiger"],
        [4, "rabbit"],
        [5, "dragon"],
        [6, "snake"],
        [7, "horse"],
        [8, "goat"],
        [9, "monkey"],
        [10, "rooster"],
        [11, "dog"],
        [0, "boar"]
    ]
)

const getAnimal = (year) => {
    return animals.get(year%12)
}
module.exports = getAnimal