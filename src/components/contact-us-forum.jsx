import React, { useState } from "react";

const API_KEY = "geronimov1wso2";

function ContactUsForm() {
  const [formData, setFormData] = useState({
    name: "",
    leadEmail: "",
    responseEmail: "",
    phone: "",
    jobRole: "",
    company: "",
    country: "",
    areaOfInterest: "",
    helpDescription: "",
    howDidYouHear: "",
    agreeToEmails: false,
  });

  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);

    setLoading(true);
    setResponseData(null);

    try {
      const response = await fetch(
        "https://bd3b73b5-b360-4c52-b210-5519f6919d65-dev.e1-us-east-azure.choreoapis.dev/testgeronimo/geronimo-v1-1/v1.0/generate_data/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "GERONIMO-API-KEY": API_KEY,
          },
          body: JSON.stringify({
            name: formData.name,
            company: formData.company,
            country: formData.country,
            position: formData.jobRole,
            interest: formData.areaOfInterest,
            email: formData.responseEmail,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Response Data:", data);
        setResponseData(data);
      } else {
        const error = await response.json();
        alert("Error: " + error.detail);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error with the submission. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const countries = [
    "Algeria",
    "Argentina",
    "Australia",
    "Austria",
    "Bangladesh",
    "Belarus",
    "Belgium",
    "Brazil",
    "Canada",
    "Chile",
    "China",
    "Colombia",
    "Cuba",
    "Czech Republic",
    "Denmark",
    "Egypt",
    "Ethiopia",
    "Finland",
    "France",
    "Germany",
    "Greece",
    "Hungary",
    "India",
    "Indonesia",
    "Ireland",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Kazakhstan",
    "Kenya",
    "Malaysia",
    "Mexico",
    "Morocco",
    "Netherlands",
    "New Zealand",
    "Nigeria",
    "Norway",
    "Pakistan",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Russia",
    "Saudi Arabia",
    "Singapore",
    "South Africa",
    "South Korea",
    "Spain",
    "Sri Lanka",
    "Sweden",
    "Switzerland",
    "Thailand",
    "Turkey",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Venezuela",
    "Vietnam",
  ];

  return (
    <div>
      <h1 className="form-title">Contact Us</h1>
      <p className="form-subtitle">
        Please fill out the form, and we’ll get in touch shortly.
      </p>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Name *"
              value={formData.name}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          {/* Lead Mail and Response Mail */}
          <div className="form-group">
            <input
              type="email"
              name="leadEmail"
              placeholder="Lead Mail *"
              value={formData.leadEmail}
              onChange={handleChange}
              required
              className="form-input"
            />
            <input
              type="email"
              name="responseEmail"
              placeholder="Response Mail *"
              value={formData.responseEmail}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          {/* Phone */}
          <div className="form-group">
            <input
              type="tel"
              name="phone"
              placeholder="Phone *"
              value={formData.phone}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          {/* Job Role and Company */}
          <div className="form-group">
            <select
              name="jobRole"
              value={formData.jobRole}
              onChange={handleChange}
              required
              className="form-input"
            >
              <option value="">Job Role *</option>
              <option value="Developer">Developer/Engineer</option>
              <option value="IT Executive">IT Executive</option>
              <option value="C-Level">C-Level</option>
              <option value="Solution or Systems Architect">
                Solution or Systems Architect
              </option>
              <option value="Student">Student</option>
              <option value="Other">Other</option>
            </select>
            <input
              type="text"
              name="company"
              placeholder="Company *"
              value={formData.company}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          {/* Country and Area of Interest */}
          <div className="form-group">
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              className="form-input"
            >
              <option value="">Country *</option>
              {countries.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>
            <select
              name="areaOfInterest"
              value={formData.areaOfInterest}
              onChange={handleChange}
              required
              className="form-input"
            >
              <option value="">Area of Interest *</option>
              <option value="API Management">API Management</option>
              <option value="Integration">Integration</option>
              <option value="Identity & Access Management">
                Identity & Access Management
              </option>
              <option value="Career Opportunities">Career Opportunities</option>
            </select>
          </div>

          {/* Description */}
          <div className="form-group">
            <textarea
              name="helpDescription"
              placeholder="How Can We Help You?"
              value={formData.helpDescription}
              onChange={handleChange}
              required
              className="form-textarea"
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="form-submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>

        {/* Display Response */}
        {responseData && (
          <div style={{ marginTop: "20px" }}>
            <p>Response: {responseData.message}</p>
          </div>
        )}
      </div>
      <style jsx>{`
        .form-title {
          text-align: center;
          font-size: 32px;
          margin-bottom: 20px;
        }

        .form-subtitle {
          text-align: center;
          font-size: 18px;
          margin-bottom: 30px;
        }

        .form-container {
          max-width: 800px;
          margin: auto;
          margin-bottom: 40px;
          padding: 40px;
          background-color: #fff;
          border: 1px solid #ccc;
          border-radius: 12px;
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
        }

        .form-group {
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
          margin-bottom: 20px;
        }

        .form-input,
        .form-textarea {
          flex: 1;
          padding: 15px;
          font-size: 18px;
          border-radius: 8px;
          border: 1px solid #ccc;
          width: 100%;
        }

        .form-textarea {
          height: 100px;
        }

        .form-submit {
          background-color: #000;
          color: #fff;
          padding: 10px 20px;
          font-size: 20px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          width: 25%;
        }

        @media (max-width: 600px) {
          .form-group {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}

export default ContactUsForm;
