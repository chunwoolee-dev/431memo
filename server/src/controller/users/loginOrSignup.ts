import { prisma } from '../db'
import { generateAccessToken } from '../tokenFunctions'
import { Request, Response } from 'express'

export async function loginOrSignup (req: Request, res: Response) {

    // 변수가 없는 경우 에러 처리
    if(!req.body.email)
        return res.status(400).send('body에 email 변수가 없습니다.')
    if(!req.body.authCode)
        return res.status(400).send('body에 authCode 변수가 없습니다.')

    const { email, authCode } = req.body

    // 아이디가 있는 경우 로그인 처리
    const userInfo = await prisma.user.findFirst({ where: { email: email, } })
    if(userInfo){
        if(userInfo.authCode === authCode){
            // 토큰을 쿠키에 저장
            const accessToken= await generateAccessToken({email,authCode})
            return res.cookie("jwt", accessToken).status(200).send()
        }
        return res.status(401).send('가입된 이메일과 매칭된 코드가 다릅니다.')
    }

    // 아이디가 없는 경우 회원 가입 처리
    await prisma.user.create({
        data: {
            email: email,
            authCode: authCode,
        }
    })
    // 토큰을 쿠키에 저장
    const accessToken = await generateAccessToken({email,authCode})
    return res.cookie("jwt", accessToken).status(200).send()
}