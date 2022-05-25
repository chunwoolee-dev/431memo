import { Request, Response } from 'express'

export function logout(req: Request, res: Response) {

    // 로그아웃 요청 시, 발행한 jwt 토큰을 제거 후 로그아웃 처리
    return res.status(205).clearCookie('jwt').send();
};