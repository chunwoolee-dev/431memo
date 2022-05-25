import { fileUploader } from './fileUploadFunctions'
import { withdrawal } from './users/withdrawal'
import { loginOrSignup } from './users/loginOrSignup'
import { logout } from './users/logout'
import { auth } from './users/auth'
import { uploadMemoImage } from './memo/uploadMemoImage'

const controllers = {
    auth,
    fileUploader,
    loginOrSignup,
    logout,
    withdrawal,
    uploadMemoImage,
}

export default controllers
