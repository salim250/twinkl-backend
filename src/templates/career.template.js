export const careerTemplate = (data) => `
  <h2>New Career Application</h2>
  <p><strong>Name:</strong> ${data.full_name}</p>
  <p><strong>Email:</strong> ${data.email}</p>
  <p><strong>Phone:</strong> ${data.phone}</p>
  <p><strong>Position:</strong> ${data.position}</p>
  <p><strong>Specialization:</strong> ${data.specialization}</p>
  <p><strong>Experience:</strong> ${data.experience} years</p>
`;