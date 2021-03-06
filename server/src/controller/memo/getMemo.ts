import { prisma } from '../db'
import { isAuthorized, getAccessTokenData } from '../tokenFunctions'
import { Request, Response } from 'express'

export async function getMemo (req: Request, res: Response) {

    const { id } = req.query
    // 변수가 없는 경우 에러 처리
    if (!id)
        return res.status(400).send('id 변수가 없습니다.')
    
    if (!parseInt(id as string))
        return res.status(400).send("id 변수가 숫자가 아닙니다.");

    // 없는 경우 로그인이 안된 상태로 전달
    if (!req.cookies.jwt)
        return res.status(400).send('쿠키가 없습니다.')

    // 요청받은 쿠키가 잘못되거나 만료된 경우 오류 처리
    if(!isAuthorized(req.cookies.jwt))
        return res.status(403).send('쿠키가 잘못되거나 만료되었습니다.')

    const { email } = getAccessTokenData(req.cookies.jwt)

    // 요청한 유저가 가지고 있는 메모를 한개만 찾는다
    const userInfo = await prisma.user.findFirst({
        where: {
            email: email,
        },
        include: {
            memos: {
                take:1,
                where: {
                    id: Number(id)
                }
            }
        }
    })

    if (userInfo!.memos.length === 0)
        return res.status(200).json([]);

    // 유저의 첫번째 메모만 가져온다.
    const [ memo ] = userInfo?.memos || []

    return res.status(200).json(memo);
}