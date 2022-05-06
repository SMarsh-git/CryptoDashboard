import "./styles/selectButton.css";

const SelectButton = ({ children, onClick }) => {
  return (
    <span onClick={onClick} className="select-button">
      {children}
    </span>
  );
};

export default SelectButton;
