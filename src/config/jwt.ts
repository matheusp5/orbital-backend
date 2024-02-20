const jwtBodyFactory = (id: string) => {
  return { id }
}

const options = {
  algorithm: 'HS256',
  expiresIn: '1d',
}

export { jwtBodyFactory, options as jwtOptions }
