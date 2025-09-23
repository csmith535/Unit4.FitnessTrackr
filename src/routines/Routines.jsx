import useQuery from "../api/useQuery";
import { Link } from "react-router";

export default function Routines() {
  const { data: routines, loading, error } = useQuery("/routines", "routines");

  if (loading) {
    return <div>Loading Routines</div>;
  } else if (error) {
    return <div>{error}</div>;
  } else if (routines) {
    return (
      <ul>
        {routines.map((routine) => (
          <RoutineItem key={routine.id} routine={routine} />
        ))}
      </ul>
    );
  }
}

function RoutineItem({ routine }) {
  return (
    <li className="routine-item">
      <p>{routine.name}</p>
      <Link to={"/routines/" + routine.id}>Learn More</Link>
    </li>
  );
}
