import useQuery from "../api/useQuery";
import useMutation from "../api/useMutation";
import { useAuth } from "../auth/AuthContext";

export default function Activities() {
  const {
    data: activities,
    loading,
    error,
  } = useQuery("/activities", "activities");

  if (loading) {
    return <div>Loading Activities</div>;
  } else if (error) {
    return <div>{error}</div>;
  } else if (activities) {
    return (
      <ul>
        {activities.map((activity) => (
          <ActivityItem key={activity.id} activity={activity} />
        ))}
      </ul>
    );
  }
}

function ActivityItem({ activity }) {
  const { token } = useAuth();
  const {
    mutate: deleteReq,
    loading: mutateLoad,
    error: mutateError,
  } = useMutation("DELETE", `/activities/` + activity.id, ["activities"]);

  return (
    <li>
      <p>{activity.name}</p>
      {token && (
        <button onClick={() => deleteReq()}>
          {mutateLoad ? "Deleting..." : mutateError ? mutateError : "Delete"}
        </button>
      )}
    </li>
  );
}
