import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_COUNTRIES, ADD_COUNTRY } from "../graphql/client";
import styles from "./Countries.module.css";

export default function Home() {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [emoji, setEmoji] = useState("");

  const [addCountry] = useMutation(ADD_COUNTRY, {
    refetchQueries: [{ query: GET_COUNTRIES }],
  });

  const { data, loading, error } = useQuery(GET_COUNTRIES);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !code || !emoji) return alert("Tous les champs sont requis");

    await addCountry({ variables: { data: { name, code, emoji } } });
    alert("Pays ajouté avec succès !");
    setName("");
    setCode("");
    setEmoji("");
  };

  return (
    <div>
      {/* Formulaire pour ajouter un pays */}
      <div className={styles["form-container"]}>
        <input type="text" placeholder="Nom du pays" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="text" placeholder="Code du pays" value={code} onChange={(e) => setCode(e.target.value)} required />
        <input type="text" placeholder="Emoji du pays" value={emoji} onChange={(e) => setEmoji(e.target.value)} required />
        <button type="submit" onClick={handleSubmit}>
          Ajouter le pays
        </button>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        {data.countries.map((country: any) => (
          <div key={country.code} className={styles["country-card"]}>
            <div className={styles["country-emoji"]}>{country.emoji}</div>
            <div className={styles["country-name"]}>{country.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
