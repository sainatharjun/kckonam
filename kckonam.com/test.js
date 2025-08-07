// Test the Google Forms endpoint
const testGoogleForms = async () => {
  const formData = new URLSearchParams();
  formData.append("entry.229188955", "Test Name");
  formData.append("entry.1335113882", "9876543210");
  formData.append("entry.1745545111", "test@example.com");
  formData.append("entry.685643051", "Test Company");
  formData.append("entry.1346148586", "10");
  formData.append("entry.1948684651", "2025-08-20");
  formData.append("entry.1864882518", "Test requirements");

  try {
    const response = await fetch(
      "https://docs.google.com/forms/u/0/d/e/1FAIpQLScWjILBPW_HtVouV8ZHb_kW_yoUYo0zvKYz75jST9g5ak3reg/formResponse",
      {
        method: "POST",
        body: formData,
        mode: "cors",
      }
    );
    console.log("Response status:", response.status);
    // console.log("Response:", await response.text());
  } catch (error) {
    console.error("Error:", error);
  }
};

testGoogleForms();
