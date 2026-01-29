export interface CreateMeal {
    cuisine: string,
    description: string,
    name: string,
    tags: string[],
    providerId: string,
    price: number
}