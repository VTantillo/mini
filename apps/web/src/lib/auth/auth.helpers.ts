import { randomBytes, scrypt, timingSafeEqual } from 'crypto'
import { cookies } from 'next/headers'

const keyLength = 32

export async function hashPassword(password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const salt = randomBytes(16).toString('hex')

    scrypt(password, salt, keyLength, (err, derivedKey) => {
      if (err) reject(err)
      resolve(`${salt}:${derivedKey.toString('hex')}`)
    })
  })
}

export async function checkPassword(
  password: string,
  hash: string,
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const [salt, hashKey] = hash.split(':')
    const hashKeyBuff = Buffer.from(hashKey, 'hex')
    scrypt(password, salt, keyLength, (err, derivedKey) => {
      if (err) {
        reject(err)
      }

      resolve(timingSafeEqual(hashKeyBuff, derivedKey))
    })
  })
}

export function getSessionToken() {
  // TODO: Validate the session token
  return cookies().get('session-token')?.value
}

export function generateSessionToken() {
  return randomBytes(32).toString('hex')
}
