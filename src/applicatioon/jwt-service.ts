import jwt from 'jsonwebtoken'
import {settings} from "../settings/settings";

export const jwtService = {
    async createJWT(user:any){
        const token = jwt.sign({userId: user._id}, settings.JWT_SECRET, {expiresIn: '1h'} )
        return token

    }
}