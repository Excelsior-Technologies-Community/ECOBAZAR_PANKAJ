const AdminContactTemplate = ({
    name,
    email,
    subject,
    message,
}) => {
    return `
    <div style="font-family:Arial,sans-serif;padding:30px">

      <h2 style="color:#00B207;">
        New Contact Request
      </h2>

      <hr>

      <p><strong>Name:</strong> ${name}</p>

      <p><strong>Email:</strong> ${email}</p>

      <p><strong>Subject:</strong> ${subject}</p>

      <p><strong>Message:</strong></p>

      <p>${message}</p>

    </div>
  `;
};

export default AdminContactTemplate;