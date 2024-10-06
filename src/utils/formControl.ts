

import { Images } from '../assets/images';
import { OtherInputsContent, SelectContent, TextAreaContent, InputTypes } from '../components/formControl/formControl'

//FC ===> formcontrol config
//stateV ===> state value


export const FirstNameFC: OtherInputsContent = {
  type: InputTypes.text,
  name: 'firstName',
  placeHolder: "ّFirst Name"
}
export const LastNameFC: OtherInputsContent = {
  type: InputTypes.text,
  name: 'lastName',
  placeHolder: "ّLast Name"
}
export const EmailFC: OtherInputsContent = {
  type: InputTypes.email,
  name: 'email',
  label: 'Email',
  placeHolder: "Email"
}
export const VerificationCodeFC: OtherInputsContent = {
  type: InputTypes.text,
  name: 'verificationCode',
  label: 'verification code'
}
export const PostNameFC: OtherInputsContent = {
  type: InputTypes.text,
  name: 'name',
  placeHolder: "ّName"
}
//------------------------------------------------
export const PasswordFC: OtherInputsContent = {
  type: InputTypes.password,
  name: 'Password',
  placeHolder: "Password",
  icon: Images.Password,
  iconHover: Images.Password
}

export const ConfirmPasswordFC: OtherInputsContent = {
  type: InputTypes.password,
  name: 'confirmPassword',
  placeHolder: 'Confirm password',
  icon: Images.Password,
  iconHover: Images.Password
}

export const OldPasswordFC: OtherInputsContent = {
  type: InputTypes.password,
  name: 'oldPassword',
}

// -----------------------------------
export const PostDescFC: TextAreaContent = {
  type: InputTypes.textArea,
  rows: 5,
  name: 'postDescription',
  label: 'description',
  placeHolder: "description"
}


//-----------------------------------------------


// export const RoleFC_creator = (roles: RoleT[]): SelectContent => {
//   return {
//     type: InputTypes.select,
//     name: 'role',
//     label: "choose one role",
//     options: [ ...roles.map(role => ({ label: role.name, value: role.value }))],
//   }
// }

// export const Role_WithoutDefaultOption_FC_creator = (roles: RoleT[]): SelectContent => {
//   return {
//     type: InputTypes.select,
//     name: 'role',
//     label: "choose one role",
//     options: roles.map(role => ({ label: role.name, value: role.value })),
//   }
// }


