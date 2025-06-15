
import { useEffect, useState } from "react";
import {
  FaConciergeBell,
  FaSwimmingPool,
  FaUtensils,
  FaSpa,
  FaWifi,
  FaParking,
  FaMapMarkerAlt,
  FaStar,
  FaCalendarAlt,
  FaLeaf,
  FaCheckCircle
} from "react-icons/fa";

const AboutUs = () => {
  // ... (keep all your existing state and functions the same) ...
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const groupMembers = [
    { name: "Sakshi", role: "PRN : 250240320102", img: "src/assets/images/sakshi.jfif" },
    { name: "Amar", role: "PRN : 250240320011", img: "src/assets/images/amar.jfif" },
    { name: "Shilpa", role: "PRN : 250240520079", img: "src/assets/images/shilpa.jfif" },
  ];

  const hotelServices = [
    { icon: <FaConciergeBell size={40} color="#7b1fa2" />, title: "24/7 Concierge Service", description: "Always ready to assist your needs." },
    { icon: <FaSwimmingPool size={40} color="#7b1fa2" />, title: "Heated Swimming Pool", description: "Relax in our luxurious indoor pool." },
    { icon: <FaUtensils size={40} color="#7b1fa2" />, title: "Gourmet Dining", description: "Exquisite meals from top chefs." },
    { icon: <FaSpa size={40} color="#7b1fa2" />, title: "Spa & Wellness", description: "Rejuvenate with world-class spa treatments." },
    { icon: <FaWifi size={40} color="#7b1fa2" />, title: "Free High-Speed WiFi", description: "Stay connected during your stay." },
    { icon: <FaParking size={40} color="#7b1fa2" />, title: "Complimentary Parking", description: "Safe and convenient parking facilities." },
  ];

  useEffect(() => {
    window.AOS?.init();
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    else if (form.name.length > 20)
      newErrors.name = "Name must not exceed 20 characters.";

    if (!form.email.includes("@gmail.com"))
      newErrors.email = "Only Gmail addresses are accepted.";

    if (form.message.length < 10)
      newErrors.message = "Message must be at least 10 characters.";
    else if (form.message.length > 200)
      newErrors.message = "Message must not exceed 200 characters.";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      setSuccess(false);
    } else {
      setErrors({});
      setSuccess(true);
      alert("Feedback submitted successfully!");
      setForm({ name: "", email: "", message: "" });
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#fff",
        minHeight: "100vh",
        color: "#4a2c3b",
        paddingTop: "3rem",
        paddingBottom: "3rem",
      }}
    >
      <div className="container">
        <h1
          className="text-center mb-4"
          data-aos="fade-down"
          style={{ color: "#7b1fa2" }}
        >
          About LakeSide Hotel
        </h1>
        <p
          className="text-center mb-5 fs-3 fw-semibold"
          style={{ color: "#4a148c" }}
        >
          Enjoy lakeside serenity and luxury. Our dedicated team delivers memorable hospitality, elegance, and care.
        </p>

        {/* ======= ADD THE ENHANCED DESCRIPTION HERE ======= */}
        <div className="about-hotel-section mb-5">
          {/* Lakeside Retreat Section */}
          <div className="mb-5 retreat-section" data-aos="fade-up">
            <h3 className="section-subtitle" style={{ color: "#880e4f", borderBottom: "2px solid #7b1fa2", paddingBottom: "0.5rem" }}>
              Your Lakeside Retreat
            </h3>
            <ul className="list-unstyled retreat-features">
              <li className="mb-3 d-flex align-items-start">
                <FaMapMarkerAlt className="me-3 mt-1" size={24} color="#7b1fa2" />
                <div>
                  <strong style={{ color: "#6a1b9a" }}>Serene Location:</strong> Wake up to panoramic lake views from our floor-to-ceiling windows, where mist dances on the water at dawn and sunsets paint the sky in hues of amber and violet.
                </div>
              </li>
              <li className="mb-3 d-flex align-items-start">
                <FaStar className="me-3 mt-1" size={24} color="#7b1fa2" />
                <div>
                  <strong style={{ color: "#6a1b9a" }}>Luxury Redefined:</strong> Our 50 elegantly appointed rooms and suites blend contemporary design with rustic charm, featuring handcrafted oak furnishings, Italian marble baths, and private balconies.
                </div>
              </li>
              <li className="d-flex align-items-start">
                <FaCalendarAlt className="me-3 mt-1" size={24} color="#7b1fa2" />
                <div>
                  <strong style={{ color: "#6a1b9a" }}>Curated Experiences:</strong> From sunrise yoga on our private dock to moonlit jazz evenings by the firepit, every moment is designed to delight.
                </div>
              </li>
            </ul>
          </div>

          {/* Hospitality Section */}
          <div className="mb-5 p-4 hospitality-section" style={{ backgroundColor: "rgba(123, 31, 162, 0.05)", borderLeft: "4px solid #7b1fa2" }} data-aos="fade-left">
            <h4 style={{ color: "#880e4f" }}>
              <FaConciergeBell className="me-2" size={28} color="#7b1fa2" />
              Exceptional Hospitality
            </h4>
            <p style={{ fontSize: "1.1rem", color: "#4a148c" }}>
              Our award-winning team anticipates your every need with discreet, personalized service. Whether arranging a champagne picnic by the water or securing reservations at Michelin-starred restaurants, we treat every request as an opportunity to exceed expectations.
            </p>
          </div>

          {/* Sustainability Section */}
          <div className="p-4 rounded sustainability-section" style={{ backgroundColor: "rgba(100, 221, 23, 0.1)", border: "1px dashed #4caf50" }} data-aos="fade-right">
            <h4 style={{ color: "#2e7d32" }}>
              <FaLeaf className="me-2" size={28} color="#4caf50" />
              Sustainable Luxury
            </h4>
            <p className="mb-3" style={{ fontSize: "1.1rem", color: "#1b5e20" }}>
              As stewards of our lakeside environment, we operate with eco-conscious practices:
            </p>
            <ul className="list-unstyled">
              <li className="mb-2">
                <FaCheckCircle className="me-2" color="#4caf50" />
                Solar-powered heating for our infinity pool
              </li>
              <li className="mb-2">
                <FaCheckCircle className="me-2" color="#4caf50" />
                Locally-sourced ingredients in our farm-to-table restaurant
              </li>
              <li>
                <FaCheckCircle className="me-2" color="#4caf50" />
                Carbon-neutral housekeeping
              </li>
            </ul>
          </div>
        </div>
        {/* ======= END OF ENHANCED DESCRIPTION ======= */}

        {/* Team Members */}
        <div className="row mb-5">
          {groupMembers.map((member, i) => (
            // ... (keep existing team members code) ...
            <div key={i} className="col-md-4 text-center mb-4" data-aos="zoom-in">
                 <div
                className="card border-0 shadow h-100 p-4"
                style={{ backgroundColor: "rgba(255, 192, 203, 0.3)" }}
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className="rounded-circle mx-auto mt-3"
                  style={{ width: "120px", height: "120px", objectFit: "cover", border: "4px solid #7b1fa2" }}
                />
                <div className="card-body">
                  <h4 className="card-title fw-bold" style={{ color: "#880e4f" }}>{member.name}</h4>
                  <p className="fs-5" style={{ color: "#6a1b9a" }}>{member.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ... (rest of your existing code remains the same) ... */}
        {/* Hotel Services */}
          <h2
          className="text-center mb-4"
          data-aos="fade-up"
          style={{ color: "#7b1fa2" }}
        >
          Our Services
        </h2>
        <div className="row mb-5">
          {hotelServices.map((service, idx) => (
            <div
              key={idx}
              className="col-md-4 mb-4 text-center"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              <div
                className="p-5 border rounded shadow-sm h-100"
                style={{ backgroundColor: "rgba(255, 192, 203, 0.3)" }}
              >
                <div className="mb-3">{service.icon}</div>
                <h5 className="fw-bold" style={{ color: "#880e4f" }}>{service.title}</h5>
                <p className="fs-6" style={{ color: "#6a1b9a" }}>
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Feedback Form */}
        <h2
          className="text-center mb-3"
          data-aos="fade-right"
          style={{ color: "#7b1fa2" }}
        >
          Send Us Feedback
        </h2>
        <form
          onSubmit={handleSubmit}
          className="p-4 rounded shadow mx-auto"
          style={{ maxWidth: "600px", backgroundColor: "#fff0f5" }}
          data-aos="fade-left"
        >
          {success && (
            <div className="alert alert-success" role="alert">
              Feedback submitted successfully!
            </div>
          )}
          <div className="mb-3">
            <label className="form-label" style={{ color: "#880e4f", fontWeight: "600" }}>Name</label>
            <input
              type="text"
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              style={{
                borderColor: errors.name ? "#d32f2f" : "#7b1fa2",
                boxShadow: errors.name ? "0 0 5px #d32f2f" : "none",
              }}
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ color: "#880e4f", fontWeight: "600" }}>Gmail</label>
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              style={{
                borderColor: errors.email ? "#d32f2f" : "#7b1fa2",
                boxShadow: errors.email ? "0 0 5px #d32f2f" : "none",
              }}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ color: "#880e4f", fontWeight: "600" }}>Message</label>
            <textarea
              rows="4"
              className={`form-control ${errors.message ? "is-invalid" : ""}`}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              style={{
                borderColor: errors.message ? "#d32f2f" : "#7b1fa2",
                boxShadow: errors.message ? "0 0 5px #d32f2f" : "none",
              }}
            />
            {errors.message && <div className="invalid-feedback">{errors.message}</div>}
          </div>
          <button
            type="submit"
            className="btn w-100"
            style={{
              backgroundColor: "#7b1fa2",
              color: "#fff",
              fontWeight: "600",
            }}
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
};

export default AboutUs;