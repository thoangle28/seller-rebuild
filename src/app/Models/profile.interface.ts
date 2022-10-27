export interface iGetInfoUser {
  user_id: string
  user_email: string
}

export interface iChangePassword {
  old_password: string
  new_password: string
  password_confirm: string
  user_id: string
}
