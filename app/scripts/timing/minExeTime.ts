export default async (promise: any, timeMin: number) => {
    return await Promise.all([ promise, new Promise(resolve => setTimeout(resolve, timeMin))])
}