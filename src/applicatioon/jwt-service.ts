import jwt from 'jsonwebtoken'
import {settings} from "../settings/settings";

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
        const accessToken = jwt.sign({userId: user.id},
                settings.JWT_SECRET, {expiresIn: '10s'})
        const refreshToken = jwt.sign({userId: user.id},
                settings.JWT_SECRET, {expiresIn: '20s'})
        const jwtTokenPair = {accessToken, refreshToken}
        return jwtTokenPair
    },
    async getTokenTime(token: string){
        try{
            const result:any =  jwt.verify(token, settings.JWT_SECRET)
            if(result) {
                return result.exp
            } else {
                return false
            }
        } catch (error) {
            return null
        }
    },
}