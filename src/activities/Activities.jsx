import useQuery from "../api/useQuery";
import { Link } from "react-router";

// Working Block31 Assignment

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
  return (
    <li className="activity-item">
      <p>{activity.name}</p>
      <Link to={"/activities/" + activity.id}>Learn More</Link>
    </li>
  );
}
