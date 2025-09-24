import useQuery from "../../api/useQuery";
import useMutation from "../../api/useMutation";
import { useAuth } from "../../auth/AuthContext";
import { useState } from "react";

export default function SetList({ sets, routineId }) {
  const { data: routines, loading, error } = useQuery("/routines", "routine");

  if (loading) {
    return <div>Loading Sets</div>;
  } else if (error) {
    return <div>{error}</div>;
  } else if (routines) {
    return (
      <ul>
        {sets.length === 0 ? (
          <p>No sets yet, try adding some of your own! (Must be logged in)</p>
        ) : (
          sets.map((set) => (
            <SetItem key={set.id} set={set} routineId={routineId} />
          ))
        )}
      </ul>
    );
  }
}

function SetItem({ set, routineId }) {
  const { token } = useAuth();
  const [deleteError, setDeleteError] = useState(null);

  const {
    mutate: deleteReq,
    loading: mutateLoad,
    error: mutateError,
  } = useMutation("DELETE", `/routine_activities/${set.id}`, [
    "sets",
    "routines",
    `routine-${routineId}`,
  ]);

  const handleDelete = async () => {
    setDeleteError(null);
    try {
      await deleteReq();
    } catch (e) {
      setDeleteError(`Failed to delete set: ${e.message}`);
    }
  };

  return (
    <li className="set-item">
      <p>
        {set.name} - {set.count} reps
      </p>
      {token && (
        <>
          <button onClick={handleDelete} disabled={mutateLoad}>
            {mutateLoad ? "Deleting..." : "Delete"}
          </button>
          {(mutateError || deleteError) && (
            <div>Error: {mutateError || deleteError}</div>
          )}
        </>
      )}
    </li>
  );
}
