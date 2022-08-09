import jwt from 'jsonwebtoken'
import {settings} from "../settings/settings";
import {ObjectId} from "mongodb";
import {toString} from "express-validator/src/utils";

export const jwtService = {
    async createJWT(user:any){
        const token = jwt.sign({userId: user.id}, settings.JWT_SECRET, {expiresIn: '1h'} )
        return token
    },

    async getUserIdByToken (token: string){
        try{
            const result:any =  jwt.decode(token)
            return result.userId
        } catch (error) {
            return null
        }
    }
}