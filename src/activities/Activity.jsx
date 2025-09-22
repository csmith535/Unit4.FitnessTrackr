import { useParams, useNavigate, Link } from "react-router";
import { useAuth } from "../auth/AuthContext";
import useQuery from "../api/useQuery";
import useMutation from "../api/useMutation";

export default function Activity() {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const {
    data: activity,
    loading,
    error,
  } = useQuery(`/activities/${id}`, `activity-${id}`);

  const {
    mutate: deleteReq,
    loading: mutateLoad,
    error: mutateError,
  } = useMutation("DELETE", `/activities/${id}`, [
    "activities",
    `activity-${id}`,
  ]);

  const handleDelete = async () => {
    try {
      await deleteReq();
      navigate("/activities");
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return <div>Loading activity...</div>;
  }

  if (error) {
    return <div>Error loading activity: {error}</div>;
  }

  if (!activity) {
    return <div>Activity not found</div>;
  }

  return (
    <div className="activity">
      <h2>{activity.name}</h2>
      <p>
        <strong>Created By:</strong>{" "}
        {activity.creatorName || `User ${activity.creatorId}`}
      </p>
      <p>
        <strong>Description:</strong> {activity.description}
      </p>

      {token && (
        <>
          <button onClick={handleDelete}>
            {mutateLoad ? "Deleting..." : "Delete Activity"}
          </button>
          {mutateError && <div>Error: {mutateError}</div>}
        </>
      )}

      <div>
        <Link to="/">Back to all Activities</Link>
      </div>
    </div>
  );
}
