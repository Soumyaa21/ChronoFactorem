const CourseStats = require("../models/CourseStats");
const Student = require("../models/Student");

const updateOnSaving = async (studentId, courses) => {
  try {
    let i;
    let studentObj = await Student.findOne({ _id: studentId });
    let toSearch = studentObj.interestedCourses;
    for (let chosen of courses) {
      let courseId = Object.keys(chosen.course)[0];
      for (i = 0; i < toSearch.length; i++) {
        if (courseId === Object.keys(toSearch[i])[0]) {
          break;
        }
      }
      let obj = {};
      if (i < toSearch.length) {
        obj[courseId] = studentObj.interestedCourses[i][courseId] + 1;
        studentObj.interestedCourses.set(i, obj);
      } else {
        obj[courseId] = 1;
        studentObj.interestedCourses.push(obj);
        let stats = await CourseStats.findOne({ courseId: courseId });
        if (!stats) {
          stats = new CourseStats({
            courseId: courseId,
            count: 1,
          });
        } else {
          stats.count++;
        }
        await stats.save();
      }
      await studentObj.save();
    }
  } catch (err) {
    throw err;
  }
};
const updateOnDeleting = async () => {};
module.exports = {
  updateOnSaving,
  updateOnDeleting,
};