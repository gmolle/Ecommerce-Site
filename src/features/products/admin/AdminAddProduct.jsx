import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewItem } from "../productSlice";

const AdminAddProduct = ({ handleOverlay }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState("");
  const [serial, setSerial] = useState("");
  const [category, setCategory] = useState("");
  const [updated, setUpdated] = useState(false);
  const [updateError, setUpdateError] = useState("");

  const addItem = () => {
    const emptyField =
      title.length < 1 ||
      serial.length < 1 ||
      price <= 0 ||
      !price ||
      desc.length < 1 ||
      quantity <= 0 ||
      !quantity ||
      !image;

    if (emptyField) {
      setUpdateError("Please fill in all fields before trying to add an item");
      setUpdated(false);
      return;
    }

    dispatch(
      addNewItem({
        title,
        price: Number(price),
        description: desc,
        image,
        serialNum: serial,
        quantity: Number(quantity),
        category,
      })
    );

    setUpdated(true);
    setUpdateError("");

    setTimeout(() => {
      handleOverlay();
    }, 1000);
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("admin-overlay")) {
      handleOverlay();
    }
  };

  return (
    <div
      className="admin-overlay"
      onClick={handleOverlayClick}
      style={overlayStyles}
    >
      <div
        className="overlay-content"
        style={contentStyles}
        onClick={(e) => e.stopPropagation()}
      >
        <h1>Add New Product</h1>
        <span
          className="close"
          onClick={handleOverlay}
          style={closeButtonStyles}
        >
          <i className="fa-solid fa-x"></i>
        </span>

        {/* FORM FIELDS */}
        <div className="admin-product-info">
          {/* Serial, Title, etc... */}
          {/* IMAGE PREVIEW */}
          <div className="image-wrapper">
            <label>Image</label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            {image ? (
              <img
                src={image}
                alt="Preview"
                style={{ maxWidth: "150px", marginTop: "10px" }}
              />
            ) : (
              <p>No Product Image</p>
            )}
          </div>

          <button className="update-item-btn" onClick={addItem}>
            Add Item
          </button>
          {updated && <p className="update-text">Item Added</p>}
          {updateError && (
            <p className="update-text error-text">{updateError}</p>
          )}
        </div>
      </div>
    </div>
  );
};

// Minimal inline styles for modal (you can move these to your CSS)
const overlayStyles = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0,0,0,0.7)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
};

const contentStyles = {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "8px",
  width: "90%",
  maxWidth: "600px",
  maxHeight: "90vh",
  overflowY: "auto",
  position: "relative",
};

const closeButtonStyles = {
  position: "absolute",
  top: "10px",
  right: "15px",
  cursor: "pointer",
  fontSize: "1.2rem",
};

export default AdminAddProduct;
