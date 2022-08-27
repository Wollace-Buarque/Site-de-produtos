interface ErrorProps {
  error: string;
}

export default function FireError(props: ErrorProps) {
  if (!props.error || props.error.length == 0) return null;

  return <span className="text-md text-red-500 pt-6">{handleError(props.error)}</span>
}

function handleError(code: any): string {
  if (fireErros[code]) return fireErros[code];

  for (let error in fireErros) {
    if (code.includes(error)) {
      return fireErros[error];
    }
  }

  return `Ocorreu um erro! ${code}`;
}

interface FireErrors {
  [index: string]: string;
}

const fireErros = {
  "auth/too-many-requests": "Você já tentou várias vezes e foi temporariamente bloqueado.",
  "auth/email-already-exists": "O e-mail já está em uso por outro usuário.",
  "auth/email-already-in-use": "O e-mail já está em uso por outro usuário.",
  "auth/weak-password": "A sua senha é muito fraca.",
  "auth/invalid-display-name": "Digite um nome válido.",
  "auth/invalid-email": "E-mail inválido!",
  "auth/wrong-password": "Senha incorreta!",
  "auth/invalid-phone-number": "O número do seu celular está inválido.",
  "auth/invalid-photo-url": "Por favor escreva um URL válido.",
  "auth/operation-not-allowed": "Este método está temporariamente desabilitado!",
  "auth/phone-number-already-exists": "Esse número já está registrado por algum usuário.",
  "auth/user-not-found": "Usuário não encontrado."
} as FireErrors;