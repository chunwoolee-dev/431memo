import axios from "axios"
import { generateAccessToken } from "../tokenFunctions"
import { prisma } from '../db'
import { Request, Response, CookieOptions} from 'express'

export async function googleCallback (req: Request, res: Response) {
    
    const { code } = req.body

    // 변수가 없는 경우 에러 처리
    if (!code)
        return res.status(400).send('code 변수가 없습니다.')

    // 토큰을 받아온다
    const client_id     = process.env.GOOGLE_CLIENT_ID
    const redirect_uri  = `${process.env.BASIC_URL}/auth`
    const client_secret = process.env.GOOGLE_CLIENT_SECRET
    const grant_type    = "authorization_code"
    const url           = "https://www.googleapis.com/oauth2/v4/token" +
                                    `?code=${code}`                    +
                                    `&client_id=${client_id}`          +
                                    `&client_secret=${client_secret}`  +
                                    `&redirect_uri=${redirect_uri}`    + 
                                    `&grant_type=${grant_type}`
    const headers       = { headers: { "Content-Type": "application/x-www-form-urlencoded"} }

    const { access_token } = ( await axios.post( url, headers ) ).data

    // 받아온 토큰으로 이메일을 가져온다.
    const { email,picture } = (await axios.get(
        "https://www.googleapis.com/oauth2/v2/userinfo" +
            `?access_token=${access_token}`,
        headers
    )).data

    const cookieOptions:CookieOptions = {
        sameSite: 'none',
        secure: true,
    }

    // 이미 가입되어있는지 체크한다.
    const userInfo = await prisma.user.findFirst({
        where: {
            email:email
        }
    })
    if (userInfo) {
        // jwt 토큰을 쿠키에 저장
        const accessToken = await generateAccessToken({email:email, picture:picture})
        return res.cookie("jwt", accessToken, cookieOptions).status(200).send()
    }

    // 회원가입 한다.
    await prisma.user.create({
        data: {
            email: email
        }
    })

    // jwt 토큰을 쿠키에 저장
    const accessToken = await generateAccessToken({email:email, picture:picture})
    return res.cookie("jwt", accessToken, cookieOptions).status(200).send()

}