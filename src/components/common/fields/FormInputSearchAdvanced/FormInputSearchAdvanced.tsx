import { useCallback, useEffect, useRef, useState, useMemo } from "react";
import { useDebounce } from "use-debounce";

import { ISelectableItem } from "@api/public";
import { useCloseOnEscapeTabAndClickOutside } from "@hooks/uiHooks";

import "../FormInputSearch/FormInputSearch.scss";

interface Props {
  suggestions: ISelectableItem[];
  value?: ISelectableItem[];
  onChange: (newValues: ISelectableItem[]) => void;
  placeholder: string;
  maxItems?: number;
}

const FormInputSearchAdvanced = ({
  suggestions,
  value,
  onChange,
  placeholder = "Type to search...",
  maxItems,
}: Props) => {
  const selectedValue = useMemo(() => value ?? [], [value]);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 200);
  const [filteredSuggestions, setFilteredSuggestions] = useState<
    ISelectableItem[]
  >([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] =
    useState<number>(-1);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const isAtLimit = maxItems !== undefined && selectedValue.length >= maxItems;

  // Reset suggestions
  const reset = useCallback(() => {
    setFilteredSuggestions([]);
    setSearch("");
    setActiveSuggestionIndex(-1);
  }, []);

  // Filter suggestions with debounce
  useEffect(() => {
    if (!debouncedSearch || isAtLimit) {
      setFilteredSuggestions([]);
      return;
    }

    const filtered = suggestions
      .filter((s) =>
        s.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
      )
      .filter((s) => !selectedValue.some((v) => v.id === s.id));

    setFilteredSuggestions(filtered);
    setActiveSuggestionIndex(-1);
  }, [debouncedSearch, suggestions, selectedValue, isAtLimit]);

  // Select a suggestion
  const selectSuggestion = useCallback(
    (item: ISelectableItem) => {
      if (selectedValue.some((selected) => selected.id === item.id)) return;
      onChange([...selectedValue, item]);
      reset();
    },
    [onChange, reset, selectedValue],
  );

  // Remove a selected value
  const removeSelected = useCallback(
    (id: number) => {
      onChange((value ?? []).filter((v) => v.id !== id));
      setActiveSuggestionIndex(-1);
    },
    [value, onChange],
  );

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && search === "" && selectedValue.length > 0) {
      removeSelected(selectedValue[selectedValue.length - 1].id);
    }

    if (["ArrowDown", "ArrowUp", "Enter"].includes(e.key)) {
      e.preventDefault();
    }

    switch (e.key) {
      case "ArrowDown":
        setActiveSuggestionIndex((prev) =>
          Math.min(prev + 1, filteredSuggestions.length - 1),
        );
        break;
      case "ArrowUp":
        setActiveSuggestionIndex((prev) => Math.max(prev - 1, 0));
        break;
      case "Enter":
        if (activeSuggestionIndex >= 0) {
          const selected = filteredSuggestions[activeSuggestionIndex];
          if (selected) selectSuggestion(selected);
        }
        break;
      default:
        break;
    }
  };

  // Close suggestions on escape/click outside
  useCloseOnEscapeTabAndClickOutside(suggestionsRef, reset);

  return (
    <div className="suggestions">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
        autoComplete="off"
        placeholder={
          isAtLimit ? "Remove current trail to replace it" : placeholder
        }
        aria-autocomplete="list"
        aria-controls="suggestions-list"
        aria-activedescendant={
          activeSuggestionIndex >= 0
            ? `suggestion-${activeSuggestionIndex}`
            : undefined
        }
      />

      {/* Suggestions dropdown */}
      {!isAtLimit && filteredSuggestions.length > 0 && (
        <div ref={suggestionsRef} className="suggestions__wrapper">
          <ul className="suggestions__wrapper__matches" id="suggestions-list">
            {filteredSuggestions.map((item, index) => {
              const isActive = index === activeSuggestionIndex;
              const matchIndex = item.name
                .toLowerCase()
                .indexOf(search.toLowerCase());

              return (
                <li
                  key={item.id}
                  id={`suggestion-${index}`}
                  onClick={() => selectSuggestion(item)}
                  className={isActive ? "active" : ""}
                  role="option"
                  aria-selected={isActive}
                >
                  {matchIndex >= 0 ? (
                    <>
                      {item.name.substring(0, matchIndex)}
                      <b>
                        {item.name.substring(
                          matchIndex,
                          matchIndex + search.length,
                        )}
                      </b>
                      {item.name.substring(matchIndex + search.length)}
                    </>
                  ) : (
                    item.name
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Selected items */}
      <div className="suggestions__selected-wrapper">
        {selectedValue.map((v) => (
          <p key={v.id} className="suggestions__selected">
            {v.name}
            <button
              type="button"
              onClick={() => removeSelected(v.id)}
              aria-label="Remove"
            >
              X
            </button>
          </p>
        ))}
      </div>
    </div>
  );
};

export default FormInputSearchAdvanced;
