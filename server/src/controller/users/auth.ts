import { prisma } from '../db'
import { isAuthorized, getAccessTokenData, AccessTokenData} from '../tokenFunctions'
import { Request, Response } from 'express'

export async function auth (req: Request, res: Response) {
    
    // 없는 경우 로그인이 안된 상태로 전달
    if (!req.cookies.jwt)
        return res.status(200).send(false)

    // 요청받은 쿠키가 잘못되거나 만료된 경우 오류 처리
    if(!isAuthorized(req.cookies.jwt))
        return res.status(403).json(false)

    // 로그인 되어있다고 전달
    return res.status(200).json(true)
}