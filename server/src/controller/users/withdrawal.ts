import { prisma } from '../db'
import { isAuthorized, getAccessTokenData } from '../tokenFunctions'
import { Request, Response } from 'express'

export async function withdrawal(req: Request, res: Response) {
    
    // 쿠키가 없는 경우 에러 처리
    if (!req.cookies.jwt)
        return res.status(401).send('쿠키가 없습니다.')

    // 쿠키가 잘못되거나 없는 경우 오류 처리
    if (!isAuthorized(req.cookies.jwt))
        return res.status(401).send('쿠키가 만료 되었거나 올바르지 않습니다.')

    const { email, authCode } = getAccessTokenData(req.cookies.jwt)

    // 이메일값과 authCode user 테이블에서 유저정보를 가져온다
    const userInfo = await prisma.user.findFirst({
        where: {
            email: email,
            authCode: authCode,
        }
    })

    // 이메일과 authCode 맞지 않으면 오류 처리
    if (!userInfo)
        return res.status(406).send('authCode가 올바르지 않습니다.')

    // user 테이블에서 유저정보 제거
    await prisma.user.deleteMany({
        where: {
            email: req.body.email,
            authCode: authCode,
        }
    })

    //  jwt 쿠키를 제거
    return res.status(200).clearCookie('jwt').send()
}
