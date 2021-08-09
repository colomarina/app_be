interface User { 
  email: string, 
  password: string, 
  passwordConfirm: string, 
  nombreCompleto: string, 
  celular: string, 
  admin: boolean,
}

const validate = ({ email, password, passwordConfirm, nombreCompleto, celular, admin }: User) => {
  if (password === passwordConfirm) {
    return true
  } else {
    return false
  }
}

export default validate;