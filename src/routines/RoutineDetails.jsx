import { useParams, useNavigate, Link } from "react-router";
import { useAuth } from "../auth/AuthContext";
import useQuery from "../api/useQuery";
import useMutation from "../api/useMutation";
import { useState, useEffect } from "react";
import SetList from "./sets/SetList";
import SetForm from "./sets/SetForm";

export default function RoutineDetails() {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [deleteRequested, setDeleteRequested] = useState(false);

  const {
    data: routine,
    loading,
    error,
  } = useQuery(`/routines/${id}`, `routine-${id}`);

  const {
    mutate: deleteReq,
    loading: mutateLoad,
    error: mutateError,
  } = useMutation("DELETE", `/routines/${id}`, ["routines", `routine-${id}`]);

  const handleDelete = async () => {
    setDeleteRequested(true);
    await deleteReq();
  };

  useEffect(() => {
    if (deleteRequested && !mutateLoad && !mutateError) {
      navigate("/routines");
    }
    if (deleteRequested && !mutateLoad) {
      setDeleteRequested(false);
    }
  }, [deleteRequested, mutateLoad, mutateError, navigate]);

  if (loading) {
    return <div>Loading routine...</div>;
  }

  if (error) {
    return (
      <>
        <div>Error loading routine: {error}</div>
        <Link to="/">Return to Home</Link>
      </>
    );
  }

  if (!routine) {
    return <div>Routine not found</div>;
  }

  return (
    <div className="routine">
      <h2>{routine.name}</h2>
      <p>
        <strong>Created By:</strong>{" "}
        {routine.creatorName || `User ${routine.creatorId}`}
      </p>
      <p>
        <strong>Goal:</strong> {routine.goal}
      </p>

      {token && (
        <>
          <button onClick={handleDelete}>
            {mutateLoad ? "Deleting..." : "Delete Routine"}
          </button>
          {mutateError && <div>Error: {mutateError}</div>}
        </>
      )}
      <SetList sets={routine.sets} />
      {token && <SetForm routineId={routine.id} />}
      <div>
        <Link to="/routines">Back to all Routines</Link>
      </div>
    </div>
  );
}
