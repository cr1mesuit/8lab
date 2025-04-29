
const Button = ({ text, onClick }) => {
    return (
        <button onClick={onClick} style={{ padding: "10px 20px" }}>
            {text}
        </button>
    );
};

export default Button;