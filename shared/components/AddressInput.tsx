'use client';

// react dadata
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

interface Props {
  onChange?: (value?: string) => void;
}

const AddressInput: React.FC<Props> = ({ onChange }) => {
  return (
    <AddressSuggestions
      token="f3e36df80af10db0a880c8fb346801fe01550af8"
      onChange={(data) => onChange?.(data?.value)}
    />
  );
};

export default AddressInput;
