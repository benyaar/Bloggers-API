import jwt from 'jsonwebtoken'
import {settings} from "../settings/settings";
import {ObjectId} from "mongodb";
import {toString} from "express-validator/src/utils";
import {UsersDBType} from "../repositories/db";

export const jwtService = {
    async createJWT(user:any){
        const token = jwt.sign({userId: user.id}, settings.JWT_SECRET, {expiresIn: '1h'} )
        return token
    },

    async getUserIdByToken (token: string){
        try{
            const result:any =  jwt.verify(token, settings.JWT_SECRET)
            return result.userId
        } catch (error) {
            return null
        }
    },
    async createJWTPair (user:UsersDBType) {
        const accessToken = jwt
            .sign({userId: user.id},
                process.env.JWT_SECRET || '123', {expiresIn: '10s'})
        const refreshToken = jwt
            .sign({userId: user.id},
                process.env.JWT_SECRET || '123', {expiresIn: '20s'})
        const jwtTokenPair = {accessToken, refreshToken}
        return jwtTokenPair
    }
}