export const firstLetterToUpper = (word: string):string => {
    if (word.length > 0) {
        return word[0].toUpperCase() + word.slice(1).toLowerCase()
    }
    return word
   }

