import React, { useState } from "react";

function ContactUsForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    jobRole: "",
    company: "",
    country: "",
    areaOfInterest: "",
    helpDescription: "",
    howDidYouHear: "",
    agreeToEmails: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Send data to backend here
    // e.g., fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) })
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      <h1>Contact Us</h1>
      <p>Please fill out the form, and we’ll get in touch shortly.</p>
      <form onSubmit={handleSubmit}>
        {/* Name Fields */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
          <input
            type="text"
            name="firstName"
            placeholder="First Name *"
            value={formData.firstName}
            onChange={handleChange}
            required
            style={{ flex: 1, padding: "10px" }}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name *"
            value={formData.lastName}
            onChange={handleChange}
            required
            style={{ flex: 1, padding: "10px" }}
          />
        </div>

    
        <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
          <input
            type="email"
            name="email"
            placeholder="Email *"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ flex: 1, padding: "10px" }}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone *"
            value={formData.phone}
            onChange={handleChange}
            required
            style={{ flex: 1, padding: "10px" }}
          />
        </div>

      
        <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
          <select
            name="jobRole"
            value={formData.jobRole}
            onChange={handleChange}
            required
            style={{ flex: 1, padding: "10px" }}
          >
            <option value="">Job Role *</option>
            <option value="Developer">Developer</option>
            <option value="Manager">Manager</option>
            <option value="Designer">Designer</option>
            {/* Add more roles as needed */}
          </select>
          <input
            type="text"
            name="company"
            placeholder="Company *"
            value={formData.company}
            onChange={handleChange}
            required
            style={{ flex: 1, padding: "10px" }}
          />
        </div>

        {/* Country and Area of Interest */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
            style={{ flex: 1, padding: "10px" }}
          >
            <option value="">Country *</option>
            <option value="USA">USA</option>
            <option value="Canada">Canada</option>
            <option value="UK">UK</option>
           
          </select>
          <select
            name="areaOfInterest"
            value={formData.areaOfInterest}
            onChange={handleChange}
            required
            style={{ flex: 1, padding: "10px" }}
          >
            <option value="">Area of Interest *</option>
            <option value="Technology">Technology</option>
            <option value="Business">Business</option>
            <option value="Finance">Finance</option>
            {/* Add more areas */}
          </select>
        </div>

        {/* Description */}
        <div style={{ marginBottom: "10px" }}>
          <textarea
            name="helpDescription"
            placeholder="How Can We Help You? (Please provide a description of your requirement)"
            value={formData.helpDescription}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "10px", height: "80px" }}
          />
        </div>

        {/* How Did You Hear */}
        <div style={{ marginBottom: "10px" }}>
          <select
            name="howDidYouHear"
            value={formData.howDidYouHear}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "10px" }}
          >
            <option value="">How Did You Hear About Us?</option>
            <option value="Social Media">Social Media</option>
            <option value="Referral">Referral</option>
            <option value="Search Engine">Search Engine</option>
            {/* Add more options */}
          </select>
        </div>

        {/* Checkbox */}
        <div style={{ marginBottom: "10px" }}>
          <label>
            <input
              type="checkbox"
              name="agreeToEmails"
              checked={formData.agreeToEmails}
              onChange={handleChange}
            />
            Yes, I would like to receive emails to learn about new releases, security announcements, and other updates.
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          style={{
            backgroundColor: "#000",
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default ContactUsForm;
