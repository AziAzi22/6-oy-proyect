import { Group } from "./group.model.js";
import { Staff } from "./staff.model.js";
import { Student } from "./student.model.js";
import { Teacher } from "./teacher.model.js";

// teacher

Staff.hasMany(Teacher, { foreignKey: "added_by", as: "fk_added_by" });
Teacher.belongsTo(Staff, { foreignKey: "added_by", as: "fk_added_by_belongs" });

// group

Staff.hasMany(Group, { foreignKey: "added_by", as: "fk_added_by_group" });
Group.belongsTo(Staff, {
  foreignKey: "added_by",
  as: "fk_added_by_group_belongs",
});

Teacher.hasMany(Group, { foreignKey: "teacher_id", as: "fk_teacher_id" });
Group.belongsTo(Teacher, {
  foreignKey: "teacher_id",
  as: "fk_teacher_id_belongs",
});

// student

Staff.hasMany(Student, { foreignKey: "added_by", as: "fk_added_by_student" });
Student.belongsTo(Staff, {
  foreignKey: "added_by",
  as: "fk_added_by_student_belongs",
});

Group.hasMany(Student, { foreignKey: "group_id", as: "fk_group_id" });
Student.belongsTo(Group, {
  foreignKey: "group_id",
  as: "fk_group_id_belongs",
});

// export

export { Staff, Teacher, Group, Student };
