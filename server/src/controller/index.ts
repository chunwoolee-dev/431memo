import { addMemo } from './memo/addMemo'
import { auth } from './users/auth'
import { fileUploader } from './fileUploadFunctions'
import { loginOrSignup } from './users/loginOrSignup'
import { logout } from './users/logout'
import { uploadMemoImage } from './memo/uploadMemoImage'
import { withdrawal } from './users/withdrawal'

const controllers = {
    addMemo,
    auth,
    fileUploader,
    loginOrSignup,
    logout,
    uploadMemoImage,
    withdrawal,
}

export default controllers
