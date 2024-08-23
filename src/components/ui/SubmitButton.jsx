import { useNavigation } from "react-router-dom";

const SubmitButton = ({ text, className }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <button
      type="submit"
      className={`btn btn-primary btn-block ${className}`}
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <span className="loading loading-ring loading-xs"></span>
      ) : (
        text || "Submit"
      )}
    </button>
  );
};

export default SubmitButton;
