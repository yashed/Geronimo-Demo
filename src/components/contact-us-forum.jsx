import React, { useState } from "react";

// const API_KEY = "geronimov1wso2";
const API_KEY = process.env.REACT_APP_API_KEY;

function ContactUsForm() {
  const [formData, setFormData] = useState({
    name: "",
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
      const response = await fetch("http://localhost:8000/generate_data/", {
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
          email: formData.email,
        }),
      });

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

          {/* Email and Phone */}
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email *"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-input"
            />
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
              <option value="USA">USA</option>
              <option value="Sri Lanka">Sri Lanka</option>
              <option value="Canada">Canada</option>
              <option value="UK">UK</option>
            </select>
            <select
              name="areaOfInterest"
              value={formData.areaOfInterest}
              onChange={handleChange}
              required
              className="form-input"
            >
              <option value="">Area of Interest *</option>
              <option value="Technology">API Management</option>
              <option value="Business">Integration</option>
              <option value="Finance">Identity & Access Management</option>
              <option value="Finance">Career Opportunities</option>
              <option value="Finance">Finance</option>
              <option value="Finance">Finance</option>
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
            {/* Response Data */}
            {/* Loader */}
            {loading && (
              <div style={{ textAlign: "center", marginTop: "20px" }}>
                <p>Loading...</p>
              </div>
            )}

            {/* Display response data */}
            {responseData && (
              <div style={{ marginTop: "20px" }}>
                <h2>Generated Data</h2>

                {responseData.professional_summary && (
                  <p>
                    <strong>Professional Summary:</strong>{" "}
                    {responseData.professional_summary}
                  </p>
                )}

                {responseData.social_media_links &&
                responseData.social_media_links.length > 0 ? (
                  <div>
                    <strong>Social Media Links:</strong>
                    <ul>
                      {responseData.social_media_links.map((link, index) => (
                        <li key={index}>
                          <strong>{link.platform}:</strong>{" "}
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {link.url}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p>
                    <strong>Social Media Links:</strong> Not Found
                  </p>
                )}

                {responseData.company_summary && (
                  <p>
                    <strong>Company Summary:</strong>{" "}
                    {responseData.company_summary}
                  </p>
                )}

                {responseData.company_competitors && (
                  <p>
                    <strong>Company Competitors:</strong>{" "}
                    {responseData.company_competitors}
                  </p>
                )}

                {responseData.additional_insights &&
                responseData.additional_insights.length > 0 ? (
                  <div>
                    <strong>Additional Insights:</strong>
                    <ul>
                      {responseData.additional_insights.map(
                        (insight, index) => (
                          <li key={index}>
                            <p>
                              <strong>Title:</strong> {insight.title}
                            </p>
                            <p>
                              <strong>URL:</strong>{" "}
                              <a
                                href={insight.url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {insight.url}
                              </a>
                            </p>
                            <p>
                              <strong>Description:</strong>{" "}
                              {insight.description}
                            </p>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                ) : (
                  <p>
                    <strong>Additional Insights:</strong> Not Found
                  </p>
                )}
              </div>
            )}
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
