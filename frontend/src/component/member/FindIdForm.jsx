export default function FindIdForm({inputData, onSubmit, children}) {
    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
        onSubmit(data);
      }

    return (
        <form id="form" onSubmit={handleSubmit}>
        <p>
          <label htmlFor="email">이메일</label>
          <input
            type="text"
            id="email"
            name="email"
            defaultValue={inputData?.email}
          />
        </p>
        <p>
          <label htmlFor="student_Id">학번</label>
          <input
            type="text"
            id="student_Id"
            name="student_Id"
            defaultValue={inputData?.student_Id}
          />
        </p>
        {children}
      </form>
    );
  }
  