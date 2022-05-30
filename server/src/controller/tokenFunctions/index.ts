require('dotenv').config()
import { sign, verify, VerifyCallback } from 'jsonwebtoken'

export type AccessTokenData = {
    email: string,
    picture: string,
}

export async function generateAccessToken (data: object):Promise<string> {
    return await sign(data, process.env.ACCESS_SECRET as string)
}

export function getAccessTokenData (jwt: string): AccessTokenData {
    let decodeData
    const callback: VerifyCallback = (_,decoded) => {
        decodeData = decoded
    }
    verify(jwt, process.env.ACCESS_SECRET as string, callback)
    return decodeData || { email:'', picture:'' }
}

export function isAuthorized (jwt: string): boolean {
    // 인증 완료
    try {
        verify(jwt, process.env.ACCESS_SECRET as string)
        return true
    }

    // 인증 실패
    catch (error) {
        // 토큰이 만료 or 유효하지 않는 토큰
        return false
    }
}