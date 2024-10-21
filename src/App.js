import React, { useState } from 'react';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [currentStudent, setCurrentStudent] = useState({
    name: '',
    age: '',
    email: '',
    course: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentStudent({
      ...currentStudent,
      [name]: value,
    });
  };

  const handleAddStudent = () => {
    if (currentStudent.name && currentStudent.age && currentStudent.email && currentStudent.course) {
      if (isEditing) {
        const updatedStudents = [...students];
        updatedStudents[editIndex] = currentStudent;
        setStudents(updatedStudents);
        setIsEditing(false);
        setEditIndex(null);
      } else {
        setStudents([...students, currentStudent]);
      }
      setCurrentStudent({
        name: '',
        age: '',
        email: '',
        course: '',
      });
    }
  };

  const handleDeleteStudent = (index) => {
    const updatedStudents = students.filter((student, i) => i !== index);
    setStudents(updatedStudents);
  };

  const handleEditStudent = (index) => {
    setCurrentStudent(students[index]);
    setIsEditing(true);
    setEditIndex(index);
  };

  return (
    <div className="container">
      <h1>Student Registration</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddStudent();
        }}
      >
        <input
          type="text"
          name="name"
          value={currentStudent.name}
          onChange={handleInputChange}
          placeholder="Student Name"
        />
        <input
          type="number"
          name="age"
          value={currentStudent.age}
          onChange={handleInputChange}
          placeholder="Age"
        />
        <input
          type="email"
          name="email"
          value={currentStudent.email}
          onChange={handleInputChange}
          placeholder="Email"
        />
        <select
          name="course"
          value={currentStudent.course}
          onChange={handleInputChange}
        >
          <option value="">Select Course</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Information Technology">Information Technology</option>
          <option value="Electrical Engineering">Electrical Engineering</option>
        </select>
        <button type="submit" className="submit-btn">
          {isEditing ? 'Update Student' : 'Add Student'}
        </button>
      </form>

      <ul>
        {students.map((student, index) => (
          <li key={index}>
            <div>
              <strong>Name:</strong> {student.name} | <strong>Age:</strong> {student.age} | <strong>Email:</strong> {student.email} | <strong>Course:</strong> {student.course}
            </div>
            <div className="actions">
              <button className="edit-btn" onClick={() => handleEditStudent(index)}>
                Edit
              </button>
              <button className="delete-btn" onClick={() => handleDeleteStudent(index)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
