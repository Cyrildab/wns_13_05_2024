import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { GET_COUNTRY_DETAILS } from "../../graphql/client";
import Link from "next/link";

export default function CountryDetails() {
  const { query } = useRouter();
  const { data, loading, error } = useQuery(GET_COUNTRY_DETAILS, {
    variables: { code: query.code },
    skip: !query.code,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const country = data.country;

  return (
    <div>
      <h1>
        {country.emoji} {country.name}
      </h1>
      <p>Code: {country.code}</p>
      <p>Continent: {country.continent?.name || "Unknown"}</p>
      <Link href="/">Back to list</Link>
    </div>
  );
}
