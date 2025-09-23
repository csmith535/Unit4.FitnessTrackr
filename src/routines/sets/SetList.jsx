import useQuery from "../../api/useQuery";

export default function SetList({ sets }) {
  const { data: routines, loading, error } = useQuery("/routines", "routine");

  if (loading) {
    return <div>Loading Sets</div>;
  } else if (error) {
    return <div>{error}</div>;
  } else if (routines) {
    return (
      <ul>
        {sets.map((set) => (
          <SetItem key={set.id} set={set} />
        ))}
      </ul>
    );
  }
}

function SetItem({ set }) {
  return (
    <li>
      <p>
        {set.name} - {set.count}
      </p>
    </li>
  );
}
