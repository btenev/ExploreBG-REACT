import { useCallback, useRef, useState } from 'react';

import './FormInputSearch.scss';

import useCloseOnEscapeTabAndClickOutside from '../../../hooks/uiHooks/useCloseOnEscapeTabClick';

interface ISuggestion {
  id: number;
  [key: string]: any;
}

interface Props {
  suggestions: ISuggestion[];
  value?: ISuggestion[];
  onChange: (newValues: ISuggestion[]) => void;
  suggestionName: string;
}

const FormInputSearch = ({ suggestions, value, onChange, suggestionName }: Props) => {
  const selectedValue = value ?? [];

  const [search, setSearch] = useState<string>('');
  const [filteredSuggestions, setFilteredSuggestions] = useState<ISuggestion[]>([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState<number>(-1);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const resetSuggestions = useCallback(() => {
    setFilteredSuggestions([]);
    setSearch('');
    setActiveSuggestionIndex(-1);
  }, []);

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setSearch(inputValue);

    if (!inputValue) {
      setFilteredSuggestions([]);
      return;
    }

    const filtered = suggestions.filter((s) =>
      s[suggestionName]?.toLowerCase().includes(inputValue.toLowerCase())
    );

    setFilteredSuggestions(filtered);
    setActiveSuggestionIndex(-1);
  };

  const selectSuggestion = useCallback(
    (suggestion: ISuggestion) => {
      if (selectedValue.some((selected) => selected.id === suggestion.id)) return;

      onChange([...selectedValue, suggestion]);
      resetSuggestions();
    },
    [value, onChange, resetSuggestions]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (['ArrowDown', 'ArrowUp', 'Enter'].includes(e.key)) {
      e.preventDefault();
    }

    switch (e.key) {
      case 'ArrowDown':
        setActiveSuggestionIndex((prev) => Math.min(prev + 1, filteredSuggestions.length - 1));
        break;
      case 'ArrowUp':
        setActiveSuggestionIndex((prev) => Math.max(prev - 1, 0));
        break;
      case 'Enter':
        if (activeSuggestionIndex >= 0) {
          const selected = filteredSuggestions[activeSuggestionIndex];
          if (selected) {
            selectSuggestion(selected);
          }
        }
        break;
      default:
        break;
    }
  };

  const removeSelectedValue = useCallback(
    (id: number) => {
      onChange(selectedValue.filter((v) => v.id !== id));
    },
    [selectedValue, onChange]
  );

  useCloseOnEscapeTabAndClickOutside(suggestionsRef, resetSuggestions);

  return (
    <div className="suggestions">
      <input
        type="text"
        value={search}
        onChange={onSearch}
        onKeyDown={handleKeyDown}
        autoComplete="off"
        placeholder="Type to search..."
        aria-autocomplete="list"
        aria-controls="suggestions-list"
        aria-activedescendant={
          activeSuggestionIndex >= 0 ? `suggestion-${activeSuggestionIndex}` : undefined
        }
      />
      {filteredSuggestions.length > 0 && (
        <div ref={suggestionsRef} className="suggestions__wrapper">
          <ul className="suggestions__wrapper__matches">
            {filteredSuggestions.map((suggestion, index) => {
              const isActive = index === activeSuggestionIndex;
              return (
                <li
                  key={suggestion.id}
                  id={`suggestion-${index}`}
                  onClick={() => selectSuggestion(suggestion)}
                  className={isActive ? 'active' : ''}
                  role="option"
                  aria-selected={isActive}
                >
                  {suggestion[suggestionName]}
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {selectedValue.map((value) => (
        <p key={value.id} className="suggestions__selected">
          {value[suggestionName]}
          <button type="button" onClick={() => removeSelectedValue(value.id)} aria-label="Remove">
            X
          </button>
        </p>
      ))}
    </div>
  );
};

export default FormInputSearch;
