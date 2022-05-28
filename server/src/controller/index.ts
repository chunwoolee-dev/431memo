import { addMemo } from './memo/addMemo'
import { auth } from './users/auth'
import { deleteMemo } from './memo/deleteMemo'
import { fileUploader } from './fileUploadFunctions'
import { googleCallback } from './callback/google'
import { logout } from './users/logout'
import { modifyMemo } from './memo/modifyMemo'
import { uploadMemoImage } from './memo/uploadMemoImage'
import { viewMemo } from './memo/viewMemo'
import { withdrawal } from './users/withdrawal'

const controllers = {
    addMemo,
    auth,
    deleteMemo,
    fileUploader,
    googleCallback,
    logout,
    modifyMemo,
    uploadMemoImage,
    viewMemo,
    withdrawal,
}

export default controllers
