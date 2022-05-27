import { addMemo } from './memo/addMemo'
import { auth } from './users/auth'
import { fileUploader } from './fileUploadFunctions'
import { googleCallback } from './callback/google'
import { logout } from './users/logout'
import { uploadMemoImage } from './memo/uploadMemoImage'
import { withdrawal } from './users/withdrawal'

const controllers = {
    addMemo,
    auth,
    fileUploader,
    googleCallback,
    logout,
    uploadMemoImage,
    withdrawal,
}

export default controllers
