import useQuery from "../api/useQuery";
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
  const { request, invalidateTags } = useApi();
  const [deleteError, setDeleteError] = useState(null);
  const [errorActivityId, setErrorActivityId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async (id) => {
    setDeleteError(null);
    setErrorActivityId(null);
    setDeleting(true);
    try {
      await request(`/activities/${id}`, {
        method: "DELETE",
      });
      invalidateTags(["activities"]);
    } catch (e) {
      setDeleteError(`Failed to delete activity: ${e.message}`);
      setErrorActivityId(id);
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
              <>
                <button
                  onClick={() => handleDelete(data.id)}
                  disabled={deleting}
                >
                  Remove Activity
                </button>
                {deleteError && errorActivityId === data.id && (
                  <div style={{ color: "red" }}>{deleteError}</div>
                )}
              </>
            ) : null}
          </div>
        ))}
      </div>
    );
  }
}
