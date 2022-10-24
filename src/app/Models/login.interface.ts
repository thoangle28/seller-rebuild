export interface iLogin {
    username: string,
    password: string
}

export interface iVerifyToken {
    access_token: string,
    user_id: string
}

export interface iUserProfile {
    user_email: string,
    user_id: string
}

export interface iUserUpdate extends iUserProfile {

}