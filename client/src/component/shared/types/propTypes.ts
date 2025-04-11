import { ChangeEventHandler, Dispatch, FormEventHandler, SetStateAction } from "react";
import { IUser, IUserSingUpData } from "../../entities/users/model";
import { ILoadAndError } from "./stateTypes";

export interface ILayoutProp {
  user: IUser | null,
  setUser: Dispatch<SetStateAction<IUser | null>>
}

export interface IMainPageProp {
  users: IUser[],
  deleteUserHandler: (id: number) => Promise<void>,
  load: ILoadAndError,
  user: IUser | null
}

export interface IUserCartProp {
  el: IUser,
  deleteUserHandler: (id: number) => Promise<void>,
  user: IUser | null
}

export interface ISignUpForm {
  userFormHandler: FormEventHandler,
  userInputs: IUserSingUpData,
  userInputsHandler: ChangeEventHandler
}

export interface ISignInProp {
  loginHandler: FormEventHandler,
  userInputs: IUserSingUpData,
  userInputsHandler: ChangeEventHandler
}
