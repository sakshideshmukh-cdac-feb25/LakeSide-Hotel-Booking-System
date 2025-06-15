import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:9192",
});

// Updated getHeader to handle FormData (no Content-Type) and token presence
export const getHeader = (isFormData = false) => {
  const token = localStorage.getItem("token");
  if (!token) return {}; // no auth header if no token

  if (isFormData) {
    // Let browser set Content-Type boundary for multipart/form-data
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

/* This function adds a new room to the database */
export async function addRoom(photo, roomType, roomPrice) {
  const formData = new FormData();
  formData.append("photo", photo);
  formData.append("roomType", roomType);
  formData.append("roomPrice", roomPrice);

  const response = await api.post("/rooms/add/new-room", formData, {
    headers: getHeader(true), // Pass true since this is FormData
  });

  return response.status === 201;
}

/* This function gets all room types from the database */
export async function getRoomTypes() {
  try {
    const response = await api.get("/rooms/room/types");
    return response.data;
  } catch (error) {
    throw new Error("Error fetching room types");
  }
}

/* This function gets all rooms from the database */
export async function getAllRooms() {
  try {
    const result = await api.get("/rooms/all-rooms");
    return result.data;
  } catch (error) {
    throw new Error("Error fetching rooms");
  }
}

/* This function deletes a room by the Id */
export async function deleteRoom(roomId) {
  try {
    const result = await api.delete(`/rooms/delete/room/${roomId}`, {
      headers: getHeader(),
    });
    return result.data;
  } catch (error) {
    throw new Error(`Error deleting room ${error.message}`);
  }
}

export async function updateRoom(roomId, roomData) {
  const formData = new FormData();
  formData.append("roomType", roomData.roomType);
  formData.append("roomPrice", roomData.roomPrice);
  formData.append("photo", roomData.photo); // Can be a File object

  const response = await api.put(`/rooms/update/${roomId}`, formData, {
    headers: getHeader(true), // FormData, so skip Content-Type
  });

  return response.data;
}

/* This function gets a room by the id */
export async function getRoomById(roomId) {
  try {
    const result = await api.get(`/rooms/room/${roomId}`);
    return result.data;
  } catch (error) {
    throw new Error(`Error fetching room ${error.message}`);
  }
}

/* This function saves a new booking to the database */
export async function bookRoom(roomId, booking) {
  try {
    const response = await api.post(`/bookings/room/${roomId}/booking`, booking);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error(`Error booking room : ${error.message}`);
    }
  }
}

/* This function gets all bookings from the database */
export async function getAllBookings() {
  try {
    const result = await api.get("/bookings/all-bookings", {
      headers: getHeader(),
    });
    return result.data;
  } catch (error) {
    throw new Error(`Error fetching bookings : ${error.message}`);
  }
}

/* This function gets booking by the confirmation code */
export async function getBookingByConfirmationCode(confirmationCode) {
  try {
    const result = await api.get(`/bookings/confirmation/${confirmationCode}`);
    return result.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error(`Error finding booking : ${error.message}`);
    }
  }
}

/* This function cancels user booking */
export async function cancelBooking(bookingId) {
  try {
    const result = await api.delete(`/bookings/booking/${bookingId}/delete`);
    return result.data;
  } catch (error) {
    throw new Error(`Error cancelling booking :${error.message}`);
  }
}

/* This function gets all available rooms with given dates and room type */
export async function getAvailableRooms(checkInDate, checkOutDate, roomType) {
  const result = await api.get(
    `rooms/available-rooms?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&roomType=${roomType}`
  );
  return result;
}

/* This function registers a new user */
export async function registerUser(registration) {
  try {
    const response = await api.post("/auth/register-user", registration);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error(`User registration error : ${error.message}`);
    }
  }
}

/* This function logs in a registered user and saves token to localStorage */
export async function loginUser(login) {
  try {
    const response = await api.post("/auth/login", login);
    if (response.status >= 200 && response.status < 300) {
      // Save token locally for future authenticated requests
      localStorage.setItem("token", response.data.token);
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

/* This function gets the user profile */
export async function getUserProfile(userId) {
  try {
    const response = await api.get(`users/profile/${userId}`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

/* This function deletes a user */
export async function deleteUser(userId) {
  try {
    const response = await api.delete(`/users/delete/${userId}`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
}

/* This function gets a single user */
export async function getUser(userId) {
  try {
    const response = await api.get(`/users/${userId}`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

/* This function gets user bookings by the user id */
export async function getBookingsByUserId(userId) {
  try {
    const response = await api.get(`/bookings/user/${userId}/bookings`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching bookings:", error.message);
    throw new Error("Failed to fetch bookings");
  }
}
