import { prisma } from '../db'
import { isAuthorized, getAccessTokenData} from '../tokenFunctions'
import { Request, Response } from 'express'

export async function getUserInfo (req: Request, res: Response) {
    
    // 없는 경우 로그인이 안된 상태로 전달
    if (!req.cookies.jwt)
        return res.status(400).send()

    // 요청받은 쿠키가 잘못되거나 만료된 경우 오류 처리
    if(!isAuthorized(req.cookies.jwt))
        return res.status(403).send()

    const cookieData = getAccessTokenData(req.cookies.jwt)

    return res.status(200).json(cookieData)
}