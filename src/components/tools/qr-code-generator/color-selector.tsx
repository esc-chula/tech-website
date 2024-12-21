import { Label } from '~/components/ui/label';
import { colorOptions } from '~/constants/qr-code-generator';
import { cn } from '~/lib/utils';

interface ColorSelectorProps {
  title: string;
  color: string;
  setColor: (color: string) => void;
}

const ColorSelector: React.FC<ColorSelectorProps> = ({
  title,
  color,
  setColor,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <Label>{title}</Label>
      <div className="flex flex-wrap gap-2">
        {colorOptions.map((colorOption) => (
          <button
            key={colorOption}
            style={{ backgroundColor: colorOption }}
            type="button"
            className={cn(
              'w-6 aspect-square rounded-full',
              colorOption === color && 'border-[3px] border-neutral-400',
            )}
            onClick={() => setColor(colorOption)}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorSelector;
