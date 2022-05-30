import { prisma } from '../../db'
import { isAuthorized, getAccessTokenData } from '../../tokenFunctions'
import { Request, Response } from 'express'
import { stringify } from 'querystring'

export async function getMemos (req: Request, res: Response) {

    const sortTarget = req.query.sortTarget || 'id'
    const orderBy = req.query.orderBy?.toString() || 'asc'
    let count = Number(req.query.count)
    let page = Number(req.query.page)

    if (req.query.count === undefined)
        count = 10

    if (req.query.page === undefined)
        page = 1

    // 없는 경우 로그인이 안된 상태로 전달
    if (!req.cookies.jwt)
        return res.status(400).send('쿠키가 없습니다.')

    // 요청받은 쿠키가 잘못되거나 만료된 경우 오류 처리
    if(!isAuthorized(req.cookies.jwt))
        return res.status(403).send('쿠키가 잘못되거나 만료되었습니다.')

    const { email } = getAccessTokenData(req.cookies.jwt)

    // 요청한 유저가 가지고 있는 메모를 찾는다
    const userInfo = await prisma.user.findFirst({
        where: {
            email: email,
        },
        include: {
            memos: {
                skip: (page-1)*count,
                take: count,
                orderBy: {
                    [sortTarget as string]: orderBy
                }
            }
        }
    })

    // 필요한 속성만 뽑는다.
    const memos = userInfo?.memos.map(memo=>({
        id: memo.id,
        title: memo?.title,
        context: memo?.context
    })) || []

    return res.status(200).json(memos);
}