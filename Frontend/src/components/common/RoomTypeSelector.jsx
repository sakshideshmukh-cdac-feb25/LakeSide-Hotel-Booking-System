import React, { useState, useEffect } from "react"
import { getRoomTypes } from "../utils/ApiFunctions"

const RoomTypeSelector = ({ handleRoomInputChange, newRoom }) => {
  const [roomTypes, setRoomTypes] = useState([""])
  const [showNewRoomTypeInput, setShowNewRoomTypeInput] = useState(false)
  const [newRoomType, setNewRoomType] = useState("")

  useEffect(() => {
    getRoomTypes().then((data) => {
      setRoomTypes(data)
    })
  }, [])

  const handleNewRoomTypeInputChange = (e) => {
    setNewRoomType(e.target.value)
  }

  const handleAddNewRoomType = () => {
    if (newRoomType.trim() !== "") {
      setRoomTypes([...roomTypes, newRoomType])
      handleRoomInputChange({
        target: { name: "roomType", value: newRoomType },
      })
      setNewRoomType("")
      setShowNewRoomTypeInput(false)
    }
  }

  return (
    <>
      {roomTypes.length > 0 && (
        <div>
          <select
            required
            className="form-select"
            name="roomType"
            onChange={(e) => {
              console.log("Selected:", e.target.value)
              if (e.target.value === "Add New") {
                setShowNewRoomTypeInput(true)
              } else {
                setShowNewRoomTypeInput(false)
                handleRoomInputChange(e)
              }
            }}
            value={newRoom.roomType}
          >
            <option value="">Select a room type</option>
            <option value={"Add New"}>Add New</option>
            {roomTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>

          {showNewRoomTypeInput && (
            <div className="mt-2">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter New Room Type"
                  value={newRoomType}
                  onChange={handleNewRoomTypeInputChange}
                  autoFocus
                />
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={handleAddNewRoomType}
                >
                  Add
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default RoomTypeSelector
