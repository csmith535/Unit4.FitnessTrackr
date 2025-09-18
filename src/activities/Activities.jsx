import useQuery from "../api/useQuery";
import useMutation from "../api/useMutation";
import { useApi } from "../api/ApiContext";
import { useAuth } from "../auth/AuthContext";
import { useState } from "react";

export default function Activities() {
  const {
    data: activities,
    loading,
    error,
  } = useQuery("/activities", "activities");
  const { token } = useAuth();
  const { invalidateTags } = useApi();
  const [deleteError, setDeleteError] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteID, setDeleteID] = useState(1);
  const { mutate: deleteReq } = useMutation(
    "DELETE",
    deleteID ? `/activities/${deleteID}` : "/activities/1",
    ["activities"]
  );

  const handleDelete = async (id) => {
    setDeleteError(null);
    setDeleting(true);
    setDeleteID(id);

    try {
      await deleteReq();
      invalidateTags(["activities"]);
    } catch (e) {
      setDeleteError(`Failed to delete activity: ${e.message}`);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return <div>Loading Activities</div>;
  } else if (error) {
    return <div>{error}</div>;
  } else if (activities) {
    return (
      <div>
        {activities.map((data) => (
          <div key={data.id} className="activity-card">
            <h3>{data.name}</h3>
            <p>{data.description}</p>
            {token ? (
              <button onClick={() => handleDelete(data.id)} disabled={deleting}>
                Remove Activity
              </button>
            ) : null}
          </div>
        ))}

        <div>{deleteError}</div>
      </div>
    );
  }
}
