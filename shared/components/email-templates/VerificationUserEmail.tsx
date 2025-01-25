interface Props {
  code: string;
  fullName: string;
}

export const VerificationUserEmail: React.FC<Props> = ({ code, fullName }) => {
  return (
    <div>
      <h1>
        Здравствуйте, <b>{fullName}</b>!
      </h1>
      <p>Спасибо за регистрацию на нашем сайте!</p>
      <p>
        Ваш код подтверждения: <h2>{code}</h2>
      </p>

      <p>
        <a href={`http://localhost:3000/api/auth/verify?code=${code}`}>Подтвердить регистрацию</a>
      </p>
    </div>
  );
};
