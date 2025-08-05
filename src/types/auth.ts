import { AddressData } from "./member";

interface LoginFormValues {
  email: string;
  password: string;
}

interface UserDataResponse {
  memberId: number;
  name: string;
  email: string;
  phoneNumber: string;
  address: AddressData;
  birthday: string;
  gender: 'FEMALE' | 'MALE';
  provider: null | string;
  providerId: null | number;
  receiveSms: boolean;
  receiveEmail: boolean;
}

export type {
  LoginFormValues,
  UserDataResponse,
}