export default (timeToWait:number) => {
   
    // Usage:
    // import {delay} from ".."
    // await delay(300)

    return new Promise(async (resolve) => await setTimeout(resolve, timeToWait))

}