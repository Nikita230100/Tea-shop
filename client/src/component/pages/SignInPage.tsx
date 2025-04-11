
import SignInForm from '../ui/SignInForm';

interface SignInPageProps {
  setUser: (user: any) => void; //  Замените any на конкретный тип user, если он известен
}

export default function SignInPage({ setUser }: SignInPageProps) {
  return (
    <SignInForm setUser={setUser} />
  );
}