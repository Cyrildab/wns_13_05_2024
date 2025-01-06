import { useMutation } from "@apollo/client";
import { useState } from "react";
import { ADD_COUNTRY, GET_COUNTRIES } from "../graphql/client";
import Link from "next/link";

export default function AddCountry() {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [emoji, setEmoji] = useState("");
  const [addCountry] = useMutation(ADD_COUNTRY, {
    refetchQueries: [{ query: GET_COUNTRIES }],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !code || !emoji) return alert("All fields are required");

    try {
      await addCountry({ variables: { data: { name, code, emoji } } });
      alert("Country added successfully!");
      setName("");
      setCode("");
      setEmoji("");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h1>Add a Country</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="text" placeholder="Code" value={code} onChange={(e) => setCode(e.target.value)} required />
        <input type="text" placeholder="Emoji" value={emoji} onChange={(e) => setEmoji(e.target.value)} required />
        <button type="submit">Add Country</button>
      </form>
      <Link href="/">Back to list</Link>
    </div>
  );
}
