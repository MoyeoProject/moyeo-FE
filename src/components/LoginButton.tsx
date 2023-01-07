import { LoginInputField } from '../types/AppTypes';

type LoginButtonProps = {
  loginInputField: LoginInputField;
  onClickLogin: ({ email, password }: LoginInputField) => void;
};

export default function LoginButton({ loginInputField, onClickLogin }: LoginButtonProps) {
  const { email, password } = loginInputField;

  return (
    <button type="button" onClick={() => onClickLogin({ email, password })}>
      로그인
    </button>
  );
}
