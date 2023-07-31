import {pool} from "./db";

export const getName = async(id:string):Promise<number> => {
    const [results] = await pool.execute("SELECT `is_admin` FROM `admin` ");
    return results
}
