import * as multer from 'koa-multer'
import createBody from '../config/createBody'

let storage = (url) => {
  return multer.diskStorage({
    destination: 'static/upload/'+ url + new Date().getFullYear() + ( new Date().getMonth() + 1 ) + new Date().getDate(),
    filename (ctx, file, cb) {
      const filenameArr = file.originalname.split('.')
      cb(null,Date.now() + '.' + filenameArr[filenameArr.length - 1])
    }
  })
}

/*const storage = multer.diskStorage({
  destination: 'static/upload/img/' + new Date().getFullYear() + ( new Date().getMonth() + 1 ) + new Date().getDate(),
  filename (ctx, file, cb) {
    const filenameArr = file.originalname.split('.')
    cb(null,Date.now() + '.' + filenameArr[filenameArr.length - 1])
  }
})*/
const upload = multer({storage: storage('img/')})
async function imageUpload (ctx) {
  const filename = ctx.req.file.filename
  const desArr = ctx.req.file.destination.split('/')
  desArr.shift()
  const destination = desArr.join('/') + '/'
  ctx.body = createBody({"uploaded":1, "fileName": filename, "url": destination, "default": destination + filename})
}

const uploadSection = multer({storage: storage('section/')})
async function sectionUpload (ctx) {
  const filename = ctx.req.file.filename
  const desArr = ctx.req.file.destination.split('/')
  desArr.shift()
  const destination = desArr.join('/') + '/'
  ctx.body = createBody({"uploaded":1, "fileName": filename, "url": destination, "default": destination + filename})
}

export default (routes, prefix) => {
  routes.post(prefix + '/image/upload', upload.single('upload'), imageUpload)
  routes.post(prefix + '/section/upload', uploadSection.single('upload'), sectionUpload)
}
