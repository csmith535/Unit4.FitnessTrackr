import { useParams, useNavigate, Link } from "react-router";
import { useAuth } from "../auth/AuthContext";
import useQuery from "../api/useQuery";
import useMutation from "../api/useMutation";
import { useState, useEffect } from "react";

export default function Activity() {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [deleteRequested, setDeleteRequested] = useState(false);

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
    setDeleteRequested(true);
    await deleteReq();
  };

  useEffect(() => {
    if (deleteRequested && !mutateLoad && !mutateError) {
      navigate("/activities");
    }
    if (deleteRequested && !mutateLoad) {
      setDeleteRequested(false);
    }
  }, [deleteRequested, mutateLoad, mutateError, navigate]);

  if (loading) {
    return <div>Loading activity...</div>;
  }

  if (error) {
    return (
      <>
        <div>Error loading activity: {error}</div>
        <Link to="/">Return to Home</Link>
      </>
    );
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
