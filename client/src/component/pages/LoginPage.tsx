
import SignUpForm from '../ui/SignUpForm';

interface LoginPageProps {
  setUser: (user: any) => void; //  Замените any на конкретный тип user, если он известен
}

export default function LoginPage({ setUser }: LoginPageProps) {
  return (
    <SignUpForm setUser={setUser} />
  );
}