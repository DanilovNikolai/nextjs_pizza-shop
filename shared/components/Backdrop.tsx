import { cn } from '../lib/utils';

interface BackdropProps {
  isVisible: boolean;
  onClick?: () => void;
  zIndex?: number;
}

export const Backdrop: React.FC<BackdropProps> = ({ isVisible, onClick, zIndex = 50 }) => {
  return isVisible ? (
    <div
      className={cn(
        'fixed inset-0 bg-black/50 transition-opacity',
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
      style={{ zIndex }}
      onClick={onClick}
    ></div>
  ) : null;
};
