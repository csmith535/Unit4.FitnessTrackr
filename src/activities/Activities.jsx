import useQuery from "../api/useQuery";

export default function Activities() {
  const { data: activities, loading, error } = useQuery("/activities");

  if (loading) {
    return <div>Loading Activities</div>;
  } else if (error) {
    return <div>{error}</div>;
  } else if (activities || loading) {
    return (
      <div>
        {activities.map((data) => (
          <div key={data.id}>
            <h3>{data.name}</h3>
            <p>{data.description}</p>
          </div>
        ))}
      </div>
    );
  }
}
