import {RateCourseEntity} from "../types/rateCourse";

export const averageRateCourse = (rates: RateCourseEntity[]) => {
    const sumOfStars = rates.reduce((prev, next) => prev + Number(next.stars), 0)
    return sumOfStars/rates.length
}