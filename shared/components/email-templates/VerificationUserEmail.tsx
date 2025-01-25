interface Props {
  code: string;
  fullName: string;
}

export const VerificationUserEmail: React.FC<Props> = ({ code, fullName }) => {
  return (
    <div>
      <h1>Здравствуйте, {fullName}!</h1>
      <p>Спасибо за регистрацию на нашем сайте!</p>
      <p>
        Ваш код подтверждения: <h2>{code}</h2>
      </p>

      <p>
        <a href={`https://nextjs-pizza-shop.vercel.app/api/auth/verify?code=${code}`}>
          Подтвердить регистрацию
        </a>
      </p>
    </div>
  );
};
