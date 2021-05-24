import React from "react";

const CategoryForm = ({
  handleSubmit,
  name,
  setName,
  categories,
  category,
  setCategory,
  operation,
}) => (
  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label>Name</label>
      <input
        type="text"
        className="form-control"
        onChange={(e) => setName(e.target.value)}
        value={name}
        autoFocus
        required
      />
    </div>
    <div className="form-group">
      <label>Parent category</label>
      <select
        name="category"
        className="custom-select custom-select-lg mb-3"
        onChange={(e) => setCategory(e.target.value)}
      >
        <option>Please select</option>
        {categories.length > 0 &&
          categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
      </select>
    </div>
    <br />
    <button className="btn btn-outline-primary">{operation}</button>
  </form>
);

export default CategoryForm;
