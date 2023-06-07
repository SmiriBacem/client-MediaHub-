import React, { KeyboardEvent } from "react";

interface MovieSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: Function;
}

const MovieSearchInput: React.FC<MovieSearchInputProps> = ({
  value,
  onChange,
  onSearch,
}) => {
  const handleKeyDown = (event?: KeyboardEvent<HTMLInputElement>) => {
    if (event && event?.code === "Enter" ) {
      onSearch();
    }
  };

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className="form-input border-gray-400 rounded-lg w-64"
        placeholder="Chercher votre film par nom"
      />
    </div>
  );
};

export default MovieSearchInput;
