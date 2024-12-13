// lucide icons
import { Asterisk } from 'lucide-react';
// ui
import { Input } from '../ui';
// components
import { ErrorText } from '../ErrorText';

interface FormInputProps {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  name,
  label,
  required,
  className,
  ...props
}) => {
  return (
    <div className={className}>
      {label && (
        <p className="font-medium mb-2">
          {label} {required && <Asterisk className="text-red-500" />}
        </p>
      )}

      <div className="relative">
        <Input className="h-12 text-md" {...props} />
      </div>

      <ErrorText text="Поле обязательно для заполнения" className="mt-2" />
    </div>
  );
};
