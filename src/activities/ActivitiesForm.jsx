import { useState } from "react";
import useMutation from "../api/useMutation.js";

export default function ActivitiesForm() {
  const [error, setError] = useState(null);

  const { mutate: postReq } = useMutation("POST", "/activities", [
    "activities",
  ]);

  const tryCreateActivity = async (formData) => {
    setError(null);

    const name = formData.get("name");
    const description = formData.get("description");

    try {
      await postReq({ name, description });
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      <h2>Add your own Activity!</h2>
      <form action={tryCreateActivity}>
        <label>
          Name
          <input type="text" name="name" />
        </label>
        <label>
          Description
          <input type="text" name="description" />
        </label>
        <button>Add activity</button>
      </form>
      {error && <p>{error}</p>}
    </>
  );
}
