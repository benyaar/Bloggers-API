import jwt from 'jsonwebtoken'
import {settings} from "../settings/settings";

import {UsersDBType} from "../repositories/db";

class JwtService {
    async createJWT(user:any){
        const token = jwt.sign({userId: user.id}, settings.JWT_SECRET, {expiresIn: '1h'} )
        return token
    }

    async getUserIdByToken (token: string){
        try{
            const result:any =  jwt.verify(token, settings.JWT_SECRET)
            return result.userId
        } catch (error) {
            return null
        }
    }
    async createJWTPair (user:UsersDBType) {
        const accessToken = jwt.sign({userId: user.id},
                settings.JWT_SECRET, {expiresIn: '1h'})
        const refreshToken = jwt.sign({userId: user.id},
                settings.JWT_SECRET, {expiresIn: '2h'})
        const jwtTokenPair = {accessToken, refreshToken}
        return jwtTokenPair
    }
    async getTokenTime(token: string){
        try{
            const result:any =  jwt.verify(token, settings.JWT_SECRET)
            if(result) {
                return result.exp
            } else {
                return false
            }
        } catch (error) {
            return false
        }
    }
}
export const jwtService  = new JwtService()