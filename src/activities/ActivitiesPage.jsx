import Activities from "./Activities";
import { useAuth } from "../auth/AuthContext";

export default function ActivitiesPage() {
  const { token } = useAuth();
  return (
    <>
      <h1>Activities</h1>
      <p>Imagine all the activities!</p>
      {token ? (
        <>
          <Activities />
          <form>
            <label>Add Activity</label>
          </form>
        </>
      ) : (
        <Activities />
      )}
    </>
  );
}
