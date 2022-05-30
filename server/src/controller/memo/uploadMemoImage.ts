import { now } from '../../lib/date'
import { prisma } from '../db'
import { isAuthorized } from '../tokenFunctions'
import { Request, Response, Express } from 'express'

export async function uploadMemoImage(req: Request, res: Response) {

    // 인자가 없으면 오류 처리
    if (!req.query.memoId)
        return res.status(406).send('postId is empty')

    // 토큰이 맞지 않으면 오류 처리
    if(!isAuthorized(req.cookies.jwt))
        return res.status(401).send('Mismatched Cookies')

    // 파일이 없으면 오류 처리
    if (!req.file)
        return res.status(400).send('file is empty')

    const file = req.file as Express.MulterS3.File 

    try {
        // postId와 url을 저장
        await prisma.file.create({
            data: {
                memoId: Number(req.query.memoId),
                url: `http://431memo.s3-website.ap-northeast-2.amazonaws.com/${file.key}`,
                createdAt: now(),
                updatedAt: now(),
            }
        })
        return res.status(200).send()
    } catch (error) {
        return res.status(501).send((error as Error).name)
    }
}
