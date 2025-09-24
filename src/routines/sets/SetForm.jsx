import { useState } from "react";
import useMutation from "../../api/useMutation.js";
import useQuery from "../../api/useQuery.js";

export default function SetForm({ routineId }) {
  const [error, setError] = useState(null);

  const { mutate: postReq } = useMutation("POST", "/sets", [
    "sets",
    "routines",
    `routine-${routineId}`,
  ]);
  const { data: activities } = useQuery("/activities", "activities");

  const tryCreateSet = async (formData) => {
    setError(null);

    const activityId = formData.get("activity");
    const count = formData.get("reps");

    try {
      await postReq({ activityId, routineId, count });
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      <h2>Add a set</h2>
      <form action={tryCreateSet}>
        <label>
          Activity
          <select name="activity">
            {activities ? (
              activities.map((activity) => (
                <option key={activity.id} value={activity.id}>
                  {activity.name}
                </option>
              ))
            ) : (
              <option disabled>Loading activities...</option>
            )}
          </select>
        </label>
        <label>
          Number of Reps
          <input type="number" name="reps" />
        </label>
        <button>Add set</button>
        {error && <div>Error: {error}</div>}
      </form>
    </>
  );
}
