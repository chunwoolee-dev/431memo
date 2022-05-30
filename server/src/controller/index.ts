import { addMemo } from './memo/addMemo'
import { auth } from './users/auth'
import { deleteMemo } from './memo/deleteMemo'
import { fileUploader } from './fileUploadFunctions'
import { getMemo } from './memo/getMemo'
import { getMemos } from './memo/list/getMemos'
import { getUserInfo } from './users/getUserInfo'
import { googleCallback } from './callback/google'
import { logout } from './users/logout'
import { modifyMemo } from './memo/modifyMemo'
import { uploadMemoImage } from './memo/uploadMemoImage'
import { withdrawal } from './users/withdrawal'

const controllers = {
    addMemo,
    auth,
    deleteMemo,
    fileUploader,
    getUserInfo,
    googleCallback,
    logout,
    modifyMemo,
    uploadMemoImage,
    getMemo,
    getMemos,
    withdrawal,
}

export default controllers
