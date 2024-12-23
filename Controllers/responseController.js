import Response from "../Models/Response.js"; // Adjust the path

// Create a new response
export const createResponse = async (req, res) => {
  try {
    const { name, companyName, email, phnNo, details } = req.body;

    // Validate the required fields
    if (!name || !companyName || !email || !phnNo) {
      return res
        .status(400)
        .json({ error: "All required fields must be provided." });
    }

    // Create a new response document
    const newResponse = new Response({
      name,
      companyName,
      phoneNumber: phnNo, // Map `phnNo` to the `phoneNumber` field in the database
      email,
      details, // Optional field
    });

    // Save the response to the database
    const savedResponse = await newResponse.save();

    res.status(201).json({
      message: "Response created successfully!",
      response: savedResponse,
    });
  } catch (error) {
    if (error.code === 11000) {
      // Handle unique constraint error for email
      return res.status(400).json({ error: "Email must be unique." });
    }

    console.error("Error creating response:", error);
    res
      .status(500)
      .json({ error: "An error occurred while saving the response." });
  }
};

// Get all responses
export const getAllResponses = async (req, res) => {
  try {
    const responses = await Response.find();
    res.status(200).json({ responses });
  } catch (error) {
    console.error("Error fetching responses:", error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving responses." });
  }
};

// Delete a response by ID
export const deleteResponse = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedResponse = await Response.findByIdAndDelete(id);

    if (!deletedResponse) {
      return res.status(404).json({ error: "Response not found." });
    }

    res.status(200).json({
      message: "Response deleted successfully!",
      response: deletedResponse,
    });
  } catch (error) {
    console.error("Error deleting response:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the response." });
  }
};
