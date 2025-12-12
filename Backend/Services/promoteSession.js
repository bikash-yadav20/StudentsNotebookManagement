import mongoose from "mongoose";
import Student from "../models/Students.js";
import Archive from "../models/Archive.js";
import { promotionMap } from "../Config/promotionMap.js";

export const promoteSession = async (oldSession, newSession) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const oldStudents = await Student.find({ session: oldSession }).session(session);
    console.log("Found students to promote:", oldStudents.length);

    if (oldStudents.length === 0) {
      throw new Error("No students found for the old session");
    }

    // Archive old session
    await Archive.insertMany(
  oldStudents.map(stu => {
    const obj = stu.toObject();
    delete obj._id; // remove original _id
    return {
      ...obj,
      promotedTo: promotionMap[stu.class] || "Graduated"
    };
  }),
  { session }
);


    // Promote students up to Class IX
    for (const [fromClass, toClass] of Object.entries(promotionMap)) {
      await Student.updateMany(
        { class: fromClass, session: oldSession },
        {
          $set: { class: toClass, session: newSession },
          $push: {
            promotionHistory: {
              fromClass,
              toClass,
              fromSession: oldSession,
              toSession: newSession
            }
          }
        },
        { session }
      );
    }

    // Handle Class X → Graduated
    await Student.updateMany(
      { class: "X", session: oldSession },
      {
        $set: { status: "Graduated", session: newSession },
        $push: {
          promotionHistory: {
            fromClass: "X",
            toClass: "Graduated",
            fromSession: oldSession,
            toSession: newSession
          }
        }
      },
      { session }
    );

    await session.commitTransaction();
    session.endSession();
    return { ok: true };
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
};
