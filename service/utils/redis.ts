import * as Redis from 'ioredis'

const redis = new Redis()

export const set = (key, value, maxAge = 20 * 60) => {
  redis.set(key, typeof value === 'string' ? value : JSON.stringify(value), 'EX', maxAge)
}
export const expire = (key, maxAge = 20 * 60) => {
  redis.expire(key, maxAge)
}
export const del = (key) => {
  redis.del(key)
}
export const get = async (key) => {
  const data = await redis.get(key)
  try {
    return JSON.parse(data)
  } catch (e) {
    return data
  }
}