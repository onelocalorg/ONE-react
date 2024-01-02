import { Controller } from "react-hook-form";
import Select from "react-select";

const DropdownWithSubMenu = ({
  option,
  control,
  inputRef,
  value,
  isMulti = false,
  isDisabled = false,
}) => {
  return (
    <>
      <Controller
        defaultValue={value}
        name={inputRef}
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            isMulti={isMulti}
            options={option}
            isDisabled={isDisabled}
          />
        )}
      />
    </>
  );
};

export default DropdownWithSubMenu;
