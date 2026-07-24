const AutoReplyTemplate = ({ name }) => {
    return `
  <div
    style="
      font-family:Arial,sans-serif;
      max-width:650px;
      margin:auto;
      border:1px solid #eee;
      border-radius:10px;
      overflow:hidden;
    "
  >

    <div
      style="
        background:#00B207;
        color:white;
        padding:25px;
        text-align:center;
      "
    >

      <h1>EcoBazar</h1>

    </div>

    <div style="padding:35px;">

      <h2>Hello ${name}, 👋</h2>

      <p>
        Thank you for contacting
        <strong>EcoBazar</strong>.
      </p>

      <p>
        We have successfully received your message.
      </p>

      <p>
        Our support team will contact you within
        <strong>24 hours.</strong>
      </p>

      <p>
        If your query is urgent,
        simply reply to this email.
      </p>

      <br>

      <a
        href="http://localhost:5173"
        style="
          display:inline-block;
          background:#00B207;
          color:white;
          padding:14px 28px;
          border-radius:6px;
          text-decoration:none;
        "
      >
        Visit EcoBazar
      </a>

    </div>

    <div
      style="
        background:#f8f8f8;
        padding:20px;
        text-align:center;
      "
    >

      © EcoBazar

    </div>

  </div>
  `;
};

export default AutoReplyTemplate;