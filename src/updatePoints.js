import dbConnect from "../../utils/dbConnect";
import Student from "../../models/Student";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    const { studentId } = req.body;

    try {
      const updatedStudent = await Student.findByIdAndUpdate(
        studentId,
        { $inc: { points: 1 } },   // Ensure proper object syntax here
        { new: true }              // Correct syntax for options object
      );

      if (!updatedStudent) {
        return res.status(404).json({ error: "Student not found" });
      }

      res.status(200).json({ points: updatedStudent.points });
    } catch (error) {
      console.error("Error updating points:", error);
      res.status(500).json({ error: "Error updating points" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(Method ${req.method} Not Allowed);
  }
}