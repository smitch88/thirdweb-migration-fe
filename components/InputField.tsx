// External
import { ErrorMessage } from "formik";

const InputField = ({ field, form, label, required, ...props }) => {
  return (
    <div className="flex flex-row w-full">
      <label htmlFor={field.name} className="flex flex-col w-full">
        <strong className="uppercase font-bold text-gray text-xs">
          {label}
          {required && <span className="text-[#f03a17]">*</span>}
        </strong>
        <input
          {...field}
          {...props}
          className={clsx(
            "flex flex-row w-full px-4 py-2 border border-[2px] border-black",
            {
              "opacity-50 cursor-default": props.readOnly,
            }
          )}
        />
        <ErrorMessage
          name={field?.name}
          render={(msg) => (
            <span className="text-[#f03a17] font-bold">{msg}</span>
          )}
        />
      </label>
    </div>
  );
};

export default InputField;
