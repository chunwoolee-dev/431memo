import express from 'express';
import cors from 'cors';
import https from 'https'
import fs from 'fs'
import cookieParser from 'cookie-parser'
import controllers from './controller'
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(
    cors({
      exposedHeaders:['set-cookie'],
      origin: ['https://localhost:3000', 'https://memo.431web.com'],
      credentials: true,
      methods: ['GET','POST','PATCH','DELETE']
    })
  );
app.use(cookieParser())

app.get('/auth', controllers.auth);

app.post('/memo', controllers.addMemo);
app.post('/logout', controllers.logout);
app.post('/memo/image', controllers.fileUploader, controllers.uploadMemoImage);
app.post('/callback/google', controllers.googleCallback);

app.delete('/withdrawal', controllers.withdrawal);

const HTTPS_PORT = process.env.HTTPS_PORT || 8080

let server;

// privateKey 인증서와 certificate 인증서가 존재하는 경우 https 서버로 실행
if (fs.existsSync('./key.pem') && fs.existsSync('./cert.pem')) {
    const privateKey = fs.readFileSync('./key.pem', 'utf8')
    const certificate = fs.readFileSync('./cert.pem', 'utf8')
    const credentials = { key: privateKey, cert: certificate }

    server = https.createServer(credentials, app)
    server.listen(HTTPS_PORT, () => console.log('https server runnning'))
} else {
  
    // 인증서가 존재하지 않는 경우 http 서버로 실행
    server = app.listen(HTTPS_PORT, () => console.log('http server runnning'))
}
module.exports = server;
