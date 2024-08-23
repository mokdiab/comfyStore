import { generateRange } from "../../utils/index";
const SelectNumbers = ({ start, end, ...rest }) => {
  const options = generateRange(start, end);
  return (
    <label className="form-control w-full max-w-xs">
      <div className="label">
        <h4 className="text-md font-medium -tracking-wider capitalize">
          amount
        </h4>
      </div>
      <select className="select select-secondary  w-full max-w-xs" {...rest}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
};

export default SelectNumbers;
