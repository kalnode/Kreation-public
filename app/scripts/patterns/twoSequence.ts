import { isEven } from '../utils'

export default (start:number, count:number, numA:number, numB:number) => {

    // Outputs a 2-sequence pattern.
    // ie "add 3, then add 1, then add 3, etc"

    // For example:
    // This: twoSequencePattern(1, 12, 3, 1)
    // Generates a pattern like: [1, 4, 5, 8, 9, 12, 13, ...

    // One use case: A nice 3 column CSS grid waterfall where some items are "wide", some "narrow", when correctly applied.
    // Difficult to do dynamically in CSS when you don't know how many rows & columns you'll have.

    let result = []
    let current = start    

    for (let i = 0; i < count; i++) {
        result.push(current)
        current += isEven(i) ? numA : numB
    }

    return result
}