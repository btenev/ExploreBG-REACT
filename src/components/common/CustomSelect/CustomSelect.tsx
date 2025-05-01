import { useEffect, useRef, useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';

import './CustomSelect.scss';
import useCloseOnEscapeTabAndClickOutside from '../../../hooks/uiHooks/useCloseOnEscapeTabClick';

interface Props<T extends string | number> {
  options: T[];
  value: T;
  onChange: (value: T) => void;
}

const CustomSelect = <T extends string | number>({ options, value, onChange }: Props<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const selectRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const closeDropdown = () => {
    setIsOpen(false);
    setCurrentIndex(-1);
  };

  useEffect(() => {
    if (isOpen) {
      dropdownRef.current?.focus();
      const index = options.findIndex((opt) => opt === value);
      setCurrentIndex(index >= 0 ? index : 0);
    }
  }, [isOpen, options, options]);

  const handleSelect = (selectedValue: T) => {
    onChange(selectedValue);
    closeDropdown();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!isOpen && ['Enter', 'ArrowDown', 'ArrowUp'].includes(e.key)) {
      e.preventDefault();
      setIsOpen(true);
      setCurrentIndex(0);
      return;
    }

    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setCurrentIndex((prev) => (prev < options.length - 1 ? prev + 1 : prev));
        break;

      case 'ArrowUp':
        e.preventDefault();
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
        break;

      case 'Enter':
        e.preventDefault();
        if (currentIndex >= 0 && currentIndex < options.length) {
          handleSelect(options[currentIndex]);
        }
        break;

      case 'Escape':
        e.preventDefault();
        closeDropdown();
        break;

      default:
        break;
    }
  };

  useCloseOnEscapeTabAndClickOutside(selectRef, closeDropdown);

  return (
    <div ref={selectRef} onKeyDown={handleKeyDown} className="custom-select">
      <div
        tabIndex={0}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`custom-select__field ${isOpen ? 'open' : ''}`}
      >
        <span>{value}</span>
        <MdKeyboardArrowDown className={isOpen ? 'rotate' : ''} />
      </div>

      {isOpen && (
        <div ref={dropdownRef} tabIndex={-1} className="custom-select__dropdown">
          <div className="custom-select__dropdown__options">
            {options.map((v, index) => (
              <div
                key={v}
                onClick={() => handleSelect(v)}
                className={`custom-select__dropdown__options__option 
                                    ${index === currentIndex ? 'active' : ''}
                                    ${v === value ? 'selected' : ''} 
                                `}
              >
                {v}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
