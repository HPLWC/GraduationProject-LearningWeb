const nodemailer = require('nodemailer')

// 创建 SMTP服务器
const config = {
  host: 'smtp.163.com',
  port: 465,
  auth: {
    user: '15113125919@163.com',
    pass: 'LFUDHISKYZFDQXAM'
  }
}

// 客户端
const transporter = nodemailer.createTransport(config)

export default function(mail) {
  transporter.sendMail(mail, function(error, info){
    if(error) {
      return console.log(error)
    }
    console.log('mail sent:', info.response)
  })
}