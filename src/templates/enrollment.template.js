export const enrollmentTemplate = (data) => {
    const subjects = Array.isArray(data.subjects)
        ? `<ul>${data.subjects.map(s => `<li>${s}</li>`).join('')}</ul>`
        : `<p>${data.subjects || 'N/A'}</p>`;

    return `
    <h2>New Student Enrollment</h2>
    <p><strong>Student:</strong> ${data.student_name}</p>
    <p><strong>Date of Birth:</strong> ${data.dob}</p>
    <p><strong>Gender:</strong> ${data.gender}</p>
    <p><strong>Nationality:</strong> ${data.nationality}</p>
    <p><strong>Parent:</strong> ${data.parent_info}</p>
    <p><strong>Program:</strong> ${data.program}</p>
    <p><strong>Subjects:</strong> ${subjects}</p>
    <p><strong>Schedule:</strong> ${data.schedule}</p>
  `;
};