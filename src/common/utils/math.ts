export const randomIntBetween: (min: number, max: number) => number = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
