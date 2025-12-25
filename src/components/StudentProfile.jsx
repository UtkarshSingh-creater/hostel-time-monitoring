export default function StudentProfile({ student }) {
  return (
    <div className="profile-card">
      <img
        src="https://ui-avatars.com/api/?name=Student&background=0D8ABC&color=fff"
        alt="student"
        className="avatar"
      />
      <h4>{student.name}</h4>
      <p>ID: {student.studentId}</p>
      <p>{student.hostel} • Room {student.room}</p>
    </div>
  );
}
