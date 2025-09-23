import Routines from "./Routines";
import RoutinesForm from "./RoutinesForm";
import { useAuth } from "../auth/AuthContext";

export default function RoutinesPage() {
  const { token } = useAuth();
  return (
    <>
      <h1>Routines</h1>
      <p>Imagine all the routines!</p>
      {token ? (
        <>
          <Routines />
          <RoutinesForm />
        </>
      ) : (
        <Routines />
      )}
    </>
  );
}
