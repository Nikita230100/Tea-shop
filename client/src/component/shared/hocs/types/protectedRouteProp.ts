import { JSX } from "react"
import { IUser } from "../../entities/users/model"

export interface ProtRoutProp {
  children: JSX.Element
  authUser: boolean | IUser, 
  redirectTo: string 
}
