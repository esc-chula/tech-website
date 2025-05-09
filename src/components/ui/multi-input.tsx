/* eslint-disable react/no-array-index-key -- to handle cases */
import { Minus, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Input } from '~/components/ui/input'

interface MultiInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string[] | undefined
  onChange: (value: string[]) => void
}

const MultiInput: React.FC<MultiInputProps> = ({
  value,
  onChange,
  ...props
}) => {
  const [inputs, setInputs] = useState<string[]>(
    !value || value.length === 0 ? [''] : value
  )

  useEffect(() => {
    onChange(inputs)
  }, [inputs, onChange])

  return (
    <div className='flex flex-col gap-3'>
      {inputs.map((input, index) => (
        <div key={index} className='flex items-center gap-2'>
          <Input
            value={input}
            onChange={(e) => {
              const newInputs = [...inputs]
              newInputs[index] = e.target.value
              setInputs(newInputs)
            }}
            {...props}
          />
          {index === inputs.length - 1 ? (
            <button
              className='aspect-square rounded-full border border-white/10 p-1.5 hover:bg-white/5'
              type='button'
              onClick={() => setInputs([...inputs, ''])}
            >
              <Plus size={14} />
            </button>
          ) : (
            <button
              className='aspect-square rounded-full border border-white/10 p-1.5 hover:bg-white/5'
              type='button'
              onClick={() => {
                if (inputs.length === 1) {
                  return
                }

                const newInputs = [...inputs]
                newInputs.splice(index, 1)
                setInputs(newInputs)
              }}
            >
              <Minus size={14} />
            </button>
          )}
        </div>
      ))}
    </div>
  )
}

export default MultiInput
