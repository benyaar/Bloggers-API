import {body} from "express-validator";

export const nameValidation = body('name').trim().isLength({min: 1, max: 15}).trim()
export const urlValidation = body('youtubeUrl').isURL().trim().isLength({min: 10, max: 100})
export const titleValidation = body('title').trim().isLength({min: 1, max: 30})
export const shortDescriptionValidation = body('shortDescription').trim().isLength({min: 1, max: 100})
export const contentValidation = body('content').trim().isLength({min: 1, max: 1000})
export const loginValidation = body('login').trim().isLength({min: 1, max: 1000})
export const passwordValidation = body('password').trim().isLength({min: 1, max: 20})
