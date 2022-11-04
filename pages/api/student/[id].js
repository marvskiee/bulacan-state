import dbConnect from "../../../utils/dbConnect";
import Student from "../../../models/Student";

dbConnect();

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const student = await Student.findOne({ number: id });
        res.status(200).json({
          success: true,
          data: student,
        });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "PUT":
      try {
        const student = await Student.findOneAndUpdate(
          { number: id },
          req.body,
          {
            new: true,
            runValidators: true,
          }
        );
        if (student) {
          return res.status(200).json({
            success: true,
            data: student,
          });
        }
        return res
          .status(400)
          .json({ success: false, errors: ["Session expired"] });
      } catch (error) {
        res.status(400).json({
          success: false,
          error: error,
        });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
