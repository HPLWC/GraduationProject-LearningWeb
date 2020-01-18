/**
 * Created by HPLWC on 2020/01/15.
 * */
import * as crypto from 'crypto'

export const jwtSecret = 'hplwcyy)(*&^_a_'
export const jwtExp = 30 * 60 // 过期时间  单位秒
export const secretKey = 'hplwcyy!@($^_a_'

export function encrypto(pwd) {
  return crypto.createHmac('sha256', secretKey)
    .update(pwd)
    .digest('hex')
}