
export const UserType = {
  BASIC: 'basic',
  MANAGER: 'manager',
  ADMIN: 'admin'
}
export interface IUser{
    id:number,
    username:string,
    user_type:string,
    is_active:boolean
    password:string,
}
