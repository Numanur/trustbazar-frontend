import TextField from "@mui/material/TextField";

const ProductForm = ({ newProduct, setNewProduct, type, name, label }) => {
  // handle change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="w-1/2 p-4 pt-1 mb-2">
      <TextField
        required
        type={type}
        label={label}
        name={name}
        // defaultValue={name ? name : ''}
        onChange={handleChange}
        InputLabelProps={{
          shrink: true,
        }}
        className="w-full"
      />
    </div>
  );
};

export default ProductForm;
