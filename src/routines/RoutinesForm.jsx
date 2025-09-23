import { useState } from "react";
import useMutation from "../api/useMutation.js";

export default function RoutinesForm() {
  const [error, setError] = useState(null);

  const { mutate: postReq } = useMutation("POST", "/routines", ["routines"]);

  const tryCreateRoutine = async (formData) => {
    setError(null);

    const name = formData.get("name");
    const goal = formData.get("goal");

    try {
      await postReq({ name, goal });
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      <h2>Add your own Routine!</h2>
      <form action={tryCreateRoutine}>
        <label>
          Name
          <input type="text" name="name" />
        </label>
        <label>
          Goal
          <input type="text" name="goal" />
        </label>
        <button>Add routine</button>
      </form>
      {error && <p>{error}</p>}
    </>
  );
}
