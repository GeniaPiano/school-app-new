import {RateCourseEntity} from "../types/rateCourse";

export const averageRateCourse = (rates: RateCourseEntity[]): number | string => {
    if (rates.length !== 0) {
        const sumOfStars = rates.reduce((prev, next) => prev + Number(next.stars), 0)
        return sumOfStars/rates.length

    } else return '0/0'

}