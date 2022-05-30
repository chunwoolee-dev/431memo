import { prisma } from '../../db'
import { isAuthorized, getAccessTokenData } from '../../tokenFunctions'
import { Request, Response } from 'express'

export async function deleteMemos (req: Request, res: Response) {

    const { ids } = req.body
    // 변수가 없는 경우 에러 처리
    if (!Array.isArray(ids))
        return res.status(400).send('ids가 배열이 아닙니다.')

    // 없는 경우 로그인이 안된 상태로 전달
    if (!req.cookies.jwt)
        return res.status(400).send('쿠키가 없습니다.')

    // 요청받은 쿠키가 잘못되거나 만료된 경우 오류 처리
    if(!isAuthorized(req.cookies.jwt))
        return res.status(403).send('쿠키가 잘못되거나 만료되었습니다.')

    const { email } = getAccessTokenData(req.cookies.jwt)

    // user의 아이디를 가져오기 위해 email로 쿼리.
    const userInfo = await prisma.user.findFirst({
        where: { email: email, },
    })

    // 메모를 지운다.
    await Promise.all(
        ids.map(id=>
            prisma.memo.deleteMany({
                where: {
                    id: Number(id),
                    authorId: userInfo?.id
                }
            })
        )
    )

    return res.status(200).send();
}