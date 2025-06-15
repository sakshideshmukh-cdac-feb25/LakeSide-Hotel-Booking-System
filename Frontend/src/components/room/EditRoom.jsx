import React, { useEffect, useState } from "react";
import { getRoomById, updateRoom } from "../utils/ApiFunctions";
import { Link, useParams } from "react-router-dom";


const EditRoom = () => {
  const { roomId } = useParams();

  const [room, setRoom] = useState({
    photo: null,
    roomType: "",
    roomPrice: "",
  });

  const [imagePreview, setImagePreview] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const roomData = await getRoomById(roomId);
        setRoom({
          photo: null,
          roomType: roomData.roomType || "",
          roomPrice: roomData.roomPrice || "",
        });
        setImagePreview(roomData.photo || "");
      } catch (error) {
        setErrorMessage("Error loading room data");
      }
    };
    fetchRoom();
  }, [roomId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRoom((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      setRoom((prev) => ({ ...prev, photo: selectedImage }));
      setImagePreview(URL.createObjectURL(selectedImage));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await updateRoom(roomId, {
        roomType: room.roomType,
        roomPrice: room.roomPrice,
        photo: room.photo,
      });

      setSuccessMessage("Room updated successfully!");
      const updatedRoom = await getRoomById(roomId);
      setRoom({
        photo: null,
        roomType: updatedRoom.roomType || "",
        roomPrice: updatedRoom.roomPrice || "",
      });
      setImagePreview(updatedRoom.photo || "");
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error.message || "Error updating room");
    }

    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 3000);
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-lg p-4">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Edit Room</h3>

              {successMessage && (
                <div className="alert alert-success">{successMessage}</div>
              )}
              {errorMessage && (
                <div className="alert alert-danger">{errorMessage}</div>
              )}

              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mb-3">
                  <label htmlFor="roomType" className="form-label fw-bold">
                    Room Type
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="roomType"
                    name="roomType"
                    value={room.roomType}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="roomPrice" className="form-label fw-bold">
                    Room Price
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="roomPrice"
                    name="roomPrice"
                    value={room.roomPrice}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="photo" className="form-label fw-bold">
                    Photo (optional)
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="photo"
                    name="photo"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Room preview"
                      className="img-fluid mt-3 rounded border"
                      style={{ maxHeight: "300px" }}
                    />
                  )}
                </div>

                <div className="d-flex justify-content-between mt-4">
                  <Link to="/existing-rooms" className="btn btn-outline-info">
                    Back
                  </Link>
                  <button type="submit" className="btn btn-outline-warning">
                    Edit Room
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRoom;
