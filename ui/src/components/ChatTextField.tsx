import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuthContext } from "../contexts/authContext";

interface ChatTextFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  helperText?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validate?: (value: string) => string | false;
  validateConfirm?: (value: string, compareValue: string) => string | false;
  compareValue?: string;
}

const ChatTextField: React.FC<ChatTextFieldProps> = ({
  label,
  name,
  type = "text",
  value,
  helperText,
  onChange,
  validate,
  validateConfirm,
  compareValue,
}) => {
  const { isSmallScreen } = useAuthContext();
  const [error, setError] = useState<string | false>(false);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (touched) {
      if (validate) {
        setError(validate(value));
      } else if (validateConfirm && compareValue !== undefined) {
        setError(validateConfirm(value, compareValue));
      }
    }
  }, [value, compareValue, validate, validateConfirm, touched]);

  return (
    <TextField
      label={label}
      name={name}
      type={type}
      variant="outlined"
      value={value}
      size={isSmallScreen ? "small" : "medium"}
      onChange={onChange}
      onBlur={() => setTouched(true)}
      helperText={touched && (error || helperText)}
      error={touched && !!error}
      sx={{
        ".MuiOutlinedInput-root": {
          borderRadius: "32px",
        },
        ".MuiInputLabel-root": {
          paddingLeft: "8px",
        },
        ".MuiInputBase-input": {
          paddingLeft: "24px",
        },
      }}
      fullWidth
    />
  );
};

export default ChatTextField;
