import bcrypt from "bcrypt";
import {UsersDBType} from "../repositories/db";
import {ObjectId} from "mongodb";
import {authRepository} from "../repositories/auth-repository";
import {v4 as uuidv4} from 'uuid'
import add from 'date-fns/add'
import {emailService} from "./email-service";



class AuthService {
    async createUser (login: string,email:string, password: string){

        const passwordSalt = await bcrypt.genSalt(10)
        const passwordHash = await this._generateHash(password, passwordSalt)
        const code = uuidv4()
        const newUser: UsersDBType = {
            id: new ObjectId().toString(),
            login: login,
            email: email,
            createdDat: new Date(),
            passwordSalt,
            passwordHash,
            emailConfirmation: {
                confirmationCode: code ,
                expirationDate: add(new Date(), {
                    hours: 1,
                    minutes: 3,
                }),
                isConfirmed: false,
            }
        }
        await emailService.sendEmail(email, newUser.emailConfirmation.confirmationCode)

        return await authRepository.createUser(newUser)
    }
    async _generateHash(password: string, salt: string){
        return await bcrypt.hash(password, salt)
    }
    async checkExistEmail (email:string){
        return await authRepository.checkExistEmail(email)
    }
    async checkExistLogin (login: string){
        return await authRepository.checkExistLogin(login)
    }
    async confirmEmail (code:string) {
        const user = await authRepository.checkExistConfirmCode(code)
         if(!user) return false

        if (user.emailConfirmation.expirationDate > new Date() && !user.emailConfirmation.isConfirmed) {
             let result = await authRepository.updateConfirmation(user.id)
            if (result){
                await  emailService.resendEmail(user.email, "Your email was confirmed", "Hello! Your email was confirmed")
                return true
            }
            return
        }

    }
    async resendingEmailConfirm(email: string) {
        const user = await authService.checkExistEmail(email)
        if(user === null || !user ) return false

        const newEmailConfirmation: any = {
            id: user.id,
            login: user.login,
            email: email,
            createdDat: new Date(),
            emailConfirmation: {
                confirmationCode: uuidv4(),
                expirationDate: add(new Date(), {
                    hours: 1,
                    minutes: 3,
                }),
                isConfirmed: false,
            }
        }
        await authRepository.updateUnconfirmedEmailData(newEmailConfirmation)
        await emailService.sendEmail(email, newEmailConfirmation.emailConfirmation.confirmationCode)
        return
    }
    async checkTokenInBlackList (refreshToken: string){
        return await authRepository.checkTokenInBlackList(refreshToken)
    }
    async addTokenInBlackList (refreshToken: string){
        return await authRepository.addTokenInBlackList(refreshToken)
    }
 }
export const authService = new AuthService()